from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify, send_from_directory
import os
import sys
import sqlite3
from datetime import datetime, timedelta
import uuid
import traceback
import webbrowser
import threading
from werkzeug.utils import secure_filename
from data.db import get_connection, initialize_database, fetch_all_products, count_low_stock, get_low_stock_products, fetch_sales_by_invoice
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


app = Flask(__name__)
app.secret_key = 'your-secrete-key-here'  # Change this to a secure secret key

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

def open_browser():
    webbrowser.open_new('http://127.0.0.1:5000/')

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

def log_error_to_file(error_message):
    error_file_path = resource_path(os.path.join("static", "text", "error.txt"))
    error_dir = os.path.dirname(error_file_path)
    os.makedirs(error_dir, exist_ok=True)

    with open(error_file_path, "w", encoding="utf-8") as f:
        f.write("=== ERROR LOG ===\n")
        f.write(error_message + "\n")
        f.write(traceback.format_exc())


font_path1 = resource_path(os.path.join('static', 'fonts', 'arial.ttf'))
font_path2 = resource_path(os.path.join('static', 'fonts', 'arialbd.ttf'))
pdfmetrics.registerFont(TTFont('Arial', font_path1))
pdfmetrics.registerFont(TTFont('Arial-bd', font_path2))

def login_required(f):
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

def ensure_discount_column():
    conn = get_connection()
    try:
        conn.execute('ALTER TABLE sales ADD COLUMN discount REAL DEFAULT 0')
    except Exception:
        pass  # Column already exists
    conn.close()


def get_slideshow_images():
    """Get list of available slideshow images"""
    slideshow_dir = resource_path(os.path.join('static', 'images', 'slideshow'))
    if os.path.exists(slideshow_dir):
        try:
            images = [f for f in os.listdir(slideshow_dir) 
                     if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
            return images if images else ['default-slide.jpg']
        except:
            return ['default-slide.jpg']
    return ['default-slide.jpg']

def remove_from_cart(product_id):
    if 'cart' in session:
        session['cart'] = [item for item in session['cart'] if item['product_id'] != product_id]
        session.modified = True
    return redirect(url_for('sales'))

initialize_database()
ensure_discount_column()

@app.route('/revinue')
@login_required
def revinue():
    query = request.args.get('q', '')
    selected_filter = request.args.get('filter', '')

    conn = get_connection()
    # Build WHERE clause for filtering
    where_conditions = []
    params = []
    import re
    date_match = re.match(r'^(\d{4}-\d{2}-\d{2})$', query)
    if date_match:
        date_str = date_match.group(1)
        if selected_filter == 'week':
            where_conditions.append("s.sale_date >= date(?) AND s.sale_date < date(?, '+7 days')")
            params.append(date_str)
            params.append(date_str)
        elif selected_filter == 'month':
            where_conditions.append("s.sale_date >= date(?) AND s.sale_date < date(?, '+30 days')")
            params.append(date_str)
            params.append(date_str)
        else:
            where_conditions.append("s.sale_date LIKE ?")
            params.append(f'{date_str}%')
    else:
        if query:
            where_conditions.append('(s.invoice_id LIKE ? OR s.buyer_phone LIKE ? OR p.name LIKE ? OR p.category LIKE ? OR p.brand LIKE ?)')
            params.extend([f'%{query}%']*5)
    if selected_filter:
        if selected_filter == 'today':
            where_conditions.append("s.sale_date >= date('now')")
        elif selected_filter == 'week':
            where_conditions.append("s.sale_date >= date('now', '-7 days')")
        elif selected_filter == 'month':
            where_conditions.append("s.sale_date >= date('now', '-30 days')")
    where_clause = ' AND '.join(where_conditions) if where_conditions else '1=1'

    # Query all invoices with joined product info
    sales_query = f'''
        SELECT 
            s.invoice_id,
            MAX(s.buyer_name) as buyer_name,
            MIN(s.sale_date) as sale_date,
            SUM(s.total) as total_price,
            SUM(s.quantity_sold * p.cost_price) as original_price
        FROM sales s
        JOIN products p ON s.product_id = p.id
        WHERE {where_clause}
        GROUP BY s.invoice_id
        ORDER BY sale_date DESC
    '''
    invoices = conn.execute(sales_query, params).fetchall()

    # Calculate revenue for each invoice and total revenue
    invoice_list = []
    total_revenue = 0
    for inv in invoices:
        revenue = (inv['total_price'] or 0) - (inv['original_price'] or 0)
        total_revenue += revenue
        invoice_list.append({
            'invoice_id': inv['invoice_id'],
            'buyer_name': inv['buyer_name'],
            'sale_date': inv['sale_date'],
            'total_price': inv['total_price'] or 0,
            'original_price': inv['original_price'] or 0,
            'revenue': revenue
        })
    conn.close()

    return render_template('revinue.html', 
        invoices=invoice_list, 
        total_revenue=total_revenue, 
        query=query, 
        selected_filter=selected_filter)

@app.route('/reports/pay/<invoice_id>', methods=['POST'])
@login_required
def pay_invoice(invoice_id):
    amount_paid = float(request.form.get('amount_paid', 0))
    conn = get_connection()
    # Get all sales rows for this invoice
    sales_rows = conn.execute('SELECT id, amount_due FROM sales WHERE invoice_id = ?', (invoice_id,)).fetchall()
    total_due = sum(row['amount_due'] for row in sales_rows)
    pay_amount = min(amount_paid, total_due)

    # Distribute payment proportionally to each row
    remaining_pay = pay_amount
    for row in sales_rows:
        row_due = row['amount_due']
        if total_due > 0:
            row_pay = round(pay_amount * (row_due / total_due), 2)
        else:
            row_pay = 0
        # Don't pay more than row_due or remaining_pay
        row_pay = min(row_pay, row_due, remaining_pay)
        new_paid = row_pay
        new_due = row_due - row_pay
        conn.execute('UPDATE sales SET amount_paid = amount_paid + ?, amount_due = ? WHERE id = ?', (new_paid, new_due, row['id']))
        remaining_pay -= row_pay
    conn.commit()
    conn.close()
    flash(f'Invoice {invoice_id} marked as paid (Rs. {pay_amount})', 'success')
    return redirect(url_for('reports'))

@app.route('/reports/delete/<invoice_id>', methods=['POST'])
@login_required
def delete_invoice(invoice_id):
    conn = get_connection()
    # Restore product quantities for all sales in this invoice
    sales_rows = conn.execute('SELECT product_id, quantity_sold FROM sales WHERE invoice_id = ?', (invoice_id,)).fetchall()
    for row in sales_rows:
        conn.execute('UPDATE products SET quantity = quantity + ? WHERE id = ?', (row['quantity_sold'], row['product_id']))
    # Delete all sales rows for this invoice
    conn.execute('DELETE FROM sales WHERE invoice_id = ?', (invoice_id,))
    conn.commit()
    conn.close()
    flash(f'Invoice {invoice_id} deleted and inventory restored.', 'success')
    return redirect(url_for('reports'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Two user types: admin and user
        if username == 'admin' and password == '881122':
            session['user_id'] = username
            session['user_type'] = 'admin'
            return redirect(url_for('dashboard'))
        elif username == 'user' and password == 'user123':
            session['user_id'] = username
            session['user_type'] = 'user'
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    try:
        conn = get_connection()
        
        # Get counts
        total_products = conn.execute('SELECT COUNT(*) FROM products').fetchone()[0]
        total_sales = conn.execute('SELECT COUNT(*) FROM sales').fetchone()[0]
        low_stock_count = count_low_stock()

        # Get today's sales count (number of invoices for today)
        today_str = datetime.now().strftime('%Y-%m-%d')
        today_sales_count = conn.execute('SELECT COUNT(DISTINCT invoice_id) FROM sales WHERE DATE(sale_date) = ?', (today_str,)).fetchone()[0]
        
        # Get recent sales
        recent_sales = conn.execute('''
            SELECT s.*, p.name as product_name 
            FROM sales s 
            JOIN products p ON s.product_id = p.id 
            ORDER BY s.sale_date DESC 
            LIMIT 5
        ''').fetchall()
        
        # Get low stock products
        low_stock_products = get_low_stock_products()
        
        # Get current date and time
        now = datetime.now()
        
        # Generate chart data for daily sales (last 7 days)
        chart_labels = []
        chart_values = []
        try:
            for i in range(6, -1, -1):
                date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
                chart_labels.append(date)
                
                # Get sales for this date
                daily_sales = conn.execute('''
                    SELECT SUM(total) FROM sales 
                    WHERE DATE(sale_date) = ?
                ''', (date,)).fetchone()[0] or 0
                chart_values.append(daily_sales)
        except Exception as e:
            # If chart data fails, use empty data
            chart_labels = ['No Data']
            chart_values = [0]
        
        # Get slideshow images dynamically
        slideshow_images = get_slideshow_images()
        
        conn.close()
        
        return render_template('dashboard.html', 
                             total_products=total_products,
                             total_sales=total_sales,
                             low_stock_count=low_stock_count,
                             recent_sales=recent_sales,
                             low_stock_products=low_stock_products,
                             now=now,
                             slideshow_images=slideshow_images,
                             labels=chart_labels,
                             values=chart_values,
                             today_sales_count=today_sales_count)
    except Exception as e:
        flash(f'Error loading dashboard: {str(e)}', 'danger')
        return render_template('dashboard.html', 
                             total_products=0,
                             total_sales=0,
                             low_stock_count=0,
                             recent_sales=[],
                             low_stock_products=[],
                             now=datetime.now(),
                             slideshow_images=get_slideshow_images(),
                             labels=[],
                             values=[])

@app.route('/product', methods=['GET', 'POST'])
@login_required
def product():
    if request.method == 'POST':
        name = request.form.get('name')
        category = request.form.get('category')
        brand = request.form.get('brand', '').strip()
        
        # Handle empty string values for numeric fields
        price_str = request.form.get('price', '0')
        cost_price_str = request.form.get('cost_price', '0')
        quantity_str = request.form.get('quantity', '0')
        
        # Convert to float/int with proper error handling
        try:
            price = float(price_str) if price_str.strip() else 0.0
            cost_price = float(cost_price_str) if cost_price_str.strip() else 0.0
            quantity = int(quantity_str) if quantity_str.strip() else 0
        except ValueError:
            flash('Please enter valid numeric values for price, cost price, and quantity.', 'danger')
            return redirect(url_for('product'))
        
        date_added = request.form.get('date_added') or datetime.now().strftime('%Y-%m-%d')
        
        # Validate required fields
        if not name or not category:
            flash('Name and Category are required fields!', 'danger')
            return redirect(url_for('product'))
        

        # Generate next 8-digit barcode starting from 51150001
        conn = get_connection()
        cur = conn.execute("SELECT MAX(CAST(barcode AS INTEGER)) FROM products WHERE barcode LIKE '5115%'")
        max_barcode = cur.fetchone()[0]
        if max_barcode and str(max_barcode).isdigit():
            barcode = str(int(max_barcode) + 1)
        else:
            barcode = '51150001'

        conn.execute('''
            INSERT INTO products (name, category, brand, price, cost_price, quantity, date_added, barcode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, category, brand, price, cost_price, quantity, date_added, barcode))
        conn.commit()
        conn.close()

        # Generate PDF barcode label as vector
        try:
            from reportlab.lib.pagesizes import mm
            from reportlab.pdfgen import canvas
            from reportlab.graphics.barcode import code128
            from reportlab.graphics.shapes import Drawing

            barcode_dir = resource_path(os.path.join('static', 'barcodes'))
            os.makedirs(barcode_dir, exist_ok=True)

            pdf_path = os.path.join(barcode_dir, f'{barcode}.pdf')
            c = canvas.Canvas(pdf_path, pagesize=(38*mm, 28*mm))
            c.setPageSize((38*mm, 28*mm))

            # Product name and price (top half, centered in 38mm)
            display_name = name if len(name) <= 18 else name[:15] + '...'
            c.setFont("Arial", 12)  
            c.drawCentredString(19*mm, 22*mm, display_name)  # Move up for less padding
            c.setFont("Arial", 10)  # Price larger and bold
            c.drawCentredString(19*mm, 18*mm, f"Price: {price}")

            # Draw barcode as wide vector (bottom half, centered in 38mm)
            # Calculate barWidth so barcode fills 35mm width (leaving 1.5mm margin each side)
            target_width = 36*mm  # Maximize barcode width, 1mm margin each side
            temp_barcode = code128.Code128(barcode, barHeight=10*mm, barWidth=1)  # Increase height
            scale = target_width / temp_barcode.width
            barWidth = 1.2 * scale
            barcode_obj = code128.Code128(barcode, barHeight=10*mm, barWidth=barWidth)
            barcode_width = barcode_obj.width
            # Center barcode horizontally in 38mm
            x_offset = (38*mm - barcode_width) / 2
            y_offset = 5*mm  # Reduce padding below barcode
            barcode_obj.drawOn(c, x_offset, y_offset)

            # Draw barcode value below barcode, centered in 38mm
            c.setFont("Arial", 9)  # Larger and bold
            c.drawCentredString(19*mm, 2*mm, barcode)  # Padding reduced to 1mm
            c.save()
            
        except Exception as e:
             log_error_to_file(str(e))


        flash('Product added successfully!', 'success')
        return redirect(url_for('product'))
    
    products = fetch_all_products()
    today_date = datetime.now().strftime('%Y-%m-%d')
    return render_template('product.html', products=products, today_date=today_date)

@app.route('/product/edit/<int:product_id>', methods=['GET', 'POST'])
@login_required
def edit_product(product_id):
    conn = get_connection()
    
    if request.method == 'POST':
        name = request.form.get('name')
        category = request.form.get('category')
        brand = request.form.get('brand', '').strip()
        
        # Handle empty string values for numeric fields
        price_str = request.form.get('price', '0')
        cost_price_str = request.form.get('cost_price', '0')
        quantity_str = request.form.get('quantity', '0')
        
        # Convert to float/int with proper error handling
        try:
            price = float(price_str) if price_str.strip() else 0.0
            cost_price = float(cost_price_str) if cost_price_str.strip() else 0.0
            quantity = int(quantity_str) if quantity_str.strip() else 0
        except ValueError:
            flash('Please enter valid numeric values for price, cost price, and quantity.', 'danger')
            return redirect(url_for('edit_product', product_id=product_id))
        
        date_added = request.form.get('date_added') or datetime.now().strftime('%Y-%m-%d')
        
        # Validate required fields
        if not name or not category:
            flash('Name and Category are required fields!', 'danger')
            return redirect(url_for('edit_product', product_id=product_id))
        
        conn.execute('''
            UPDATE products SET name=?, category=?, brand=?, price=?, 
                              cost_price=?, quantity=?, date_added=?
            WHERE id=?
        ''', (name, category, brand, price, cost_price, quantity, date_added, product_id))
        conn.commit()
        conn.close()
        
        flash('Product updated successfully!', 'success')
        return redirect(url_for('product'))
    
    product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
    conn.close()
    
    if not product:
        flash('Product not found!', 'danger')
        return redirect(url_for('product'))
    
    return render_template('edit_product.html', product=product)

@app.route('/product/delete/<int:product_id>')
@login_required
def delete_product(product_id):
    conn = get_connection()
    # Get barcode before deleting
    cur = conn.execute('SELECT barcode FROM products WHERE id = ?', (product_id,))
    row = cur.fetchone()
    barcode = row['barcode'] if row and 'barcode' in row.keys() else None
    conn.execute('DELETE FROM products WHERE id = ?', (product_id,))
    conn.commit()
    conn.close()

    # Delete PDF if exists
    if barcode:
        pdf_path = resource_path(os.path.join('static', 'barcodes', f'{barcode}.pdf'))
        try:
            if os.path.exists(pdf_path):
                os.remove(pdf_path)
        except Exception as e:
            print(f"Failed to delete barcode PDF: {e}")

    return redirect(url_for('product'))

@app.route('/sales', methods=['GET', 'POST'])
@login_required
def sales():
    # ...existing code...
    if request.method == 'POST':
        if 'buyer_name' in request.form:
            # Save buyer info
            buyer_name = request.form.get('buyer_name')
            buyer_phone = request.form.get('buyer_phone')
            session['current_buyer'] = {'name': buyer_name, 'phone': buyer_phone}
            return redirect(url_for('sales'))
        # Add to cart by product_id (from product card)
        if 'product_id' in request.form:
            product_id = int(request.form.get('product_id'))
            quantity_to_add = int(request.form.get('quantity', 1))
            conn = get_connection()
            product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
            conn.close()
            if product:
                if 'cart' not in session:
                    session['cart'] = []
                cart_item = next((item for item in session['cart'] if item['product_id'] == product_id), None)
                current_cart_quantity = cart_item['quantity'] if cart_item else 0
                total_quantity_after_add = current_cart_quantity + quantity_to_add
                if total_quantity_after_add > product['quantity']:
                    flash(f'Cannot add {quantity_to_add} more. Only {product["quantity"] - current_cart_quantity} available.', 'warning')
                    return redirect(url_for('sales'))
                if cart_item:
                    cart_item['quantity'] += quantity_to_add
                    cart_item['total'] = cart_item['price'] * cart_item['quantity']
                else:
                    session['cart'].append({
                        'product_id': product_id,
                        'name': product['name'],
                        'price': product['price'],
                        'quantity': quantity_to_add,
                        'total': product['price'] * quantity_to_add
                    })
                session.modified = True
                flash('Product added to cart!', 'success')
            return redirect(url_for('sales'))
        # Unified search bar logic
        search_input = request.form.get('search_input', '').strip()
        if search_input:
            conn = get_connection()
            # Try barcode match first
            product = conn.execute('SELECT * FROM products WHERE barcode = ?', (search_input,)).fetchone()
            if product:
                # Add to cart
                if 'cart' not in session:
                    session['cart'] = []
                cart_item = next((item for item in session['cart'] if item['product_id'] == product['id']), None)
                if cart_item:
                    if cart_item['quantity'] < product['quantity']:
                        cart_item['quantity'] += 1
                        cart_item['total'] = cart_item['price'] * cart_item['quantity']
                    else:
                        flash('No more stock available for this product.', 'warning')
                else:
                    session['cart'].append({
                        'product_id': product['id'],
                        'name': product['name'],
                        'price': product['price'],
                        'quantity': 1,
                        'total': product['price']
                    })
                session.modified = True
                conn.close()
                return redirect(url_for('sales'))
            else:
                # Not a barcode, treat as product search
                products = conn.execute('''
                    SELECT * FROM products WHERE quantity > 0 AND (
                        name LIKE ? OR category LIKE ? OR brand LIKE ?
                    )
                ''', (f'%{search_input}%', f'%{search_input}%', f'%{search_input}%')).fetchall()
                conn.close()
                subtotal = sum(item['total'] for item in session.get('cart', []))
                return render_template('sales.html', products=products, buyer=session.get('current_buyer') or {}, cart=session.get('cart', []), search_query=search_input, subtotal=subtotal)
        else:
            # No input, show all products
            conn = get_connection()
            products = conn.execute('SELECT * FROM products WHERE quantity > 0').fetchall()
            conn.close()
            subtotal = sum(item['total'] for item in session.get('cart', []))
            return render_template('sales.html', products=products, buyer=session.get('current_buyer') or {}, cart=session.get('cart', []), search_query='', subtotal=subtotal)
    # GET request: show all or filtered products
    search_query = request.args.get('search_query', '').strip()
    conn = get_connection()
    if search_query:
        products = conn.execute('''
            SELECT * FROM products WHERE quantity > 0 AND (
                name LIKE ? OR category LIKE ? OR brand LIKE ? OR barcode = ?
            )
        ''', (f'%{search_query}%', f'%{search_query}%', f'%{search_query}%', search_query)).fetchall()
    else:
        products = conn.execute('SELECT * FROM products WHERE quantity > 0').fetchall()
    conn.close()
    subtotal = sum(item['total'] for item in session.get('cart', []))
    return render_template('sales.html', products=products, buyer=session.get('current_buyer') or {}, cart=session.get('cart', []), search_query=search_query, subtotal=subtotal)

@app.route('/sales/remove/<int:index>')
@login_required
def remove_from_sales_cart(index):
    if 'cart' in session and 0 <= index < len(session['cart']):
        session['cart'].pop(index)
        session.modified = True
    return redirect(url_for('sales'))

@app.route('/sales/update_quantity/<int:index>', methods=['POST'])
@login_required
def update_cart_quantity(index):
    if 'cart' in session and 0 <= index < len(session['cart']):
        new_quantity_str = request.form.get('quantity', '1')
        try:
            new_quantity = int(new_quantity_str) if new_quantity_str.strip() else 1
        except ValueError:
            new_quantity = 1
        
        if new_quantity <= 0:
            flash('Quantity must be greater than 0', 'warning')
            return redirect(url_for('sales'))
        
        # Check if new quantity exceeds available stock
        conn = get_connection()
        product = conn.execute('SELECT * FROM products WHERE id = ?', (session['cart'][index]['product_id'],)).fetchone()
        conn.close()
        
        if product and new_quantity > product['quantity']:
            flash(f'Cannot set quantity to {new_quantity}. Only {product["quantity"]} available.', 'warning')
            return redirect(url_for('sales'))
        
        session['cart'][index]['quantity'] = new_quantity
        session['cart'][index]['total'] = session['cart'][index]['price'] * new_quantity
        session.modified = True
        
        flash('Quantity updated successfully!', 'success')
    return redirect(url_for('sales'))

@app.route('/sales/discount/<int:index>', methods=['POST'])
@login_required
def update_discount(index):
    if 'cart' in session and 0 <= index < len(session['cart']):
        discount_str = request.form.get('discount', '0')
        try:
            discount = float(discount_str) if discount_str.strip() else 0.0
        except ValueError:
            discount = 0.0
        
        session['cart'][index]['discount'] = discount
        session['cart'][index]['total'] = (session['cart'][index]['price'] - discount) * session['cart'][index]['quantity']
        session.modified = True
    return redirect(url_for('sales'))

@app.route('/finalize_sale', methods=['POST'])
@login_required
def finalize_sale():
    if 'cart' not in session or not session['cart']:
        return redirect(url_for('sales'))

    buyer = session.get('current_buyer')
    if not buyer:
        return redirect(url_for('sales'))

    # Get discount and payment info from form
    overall_discount = float(request.form.get('overall_discount', 0))
    payment_type = request.form.get('payment_type', 'full')
    amount_paid = float(request.form.get('amount_paid', 0)) if payment_type != 'full' else None

    conn = get_connection()
    invoice_id = f"INV-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    subtotal = sum(item['total'] for item in session['cart'])
    final_total = max(0, subtotal - overall_discount)

    # Calculate payment values for the invoice
    if payment_type == 'full':
        paid = final_total
        due = 0
    elif payment_type == 'partial':
        paid = amount_paid if amount_paid is not None else 0
        due = final_total - paid
    else:  # credit
        paid = 0
        due = final_total

    # Calculate per-item discount share
    cart = session['cart']
    subtotal = sum(item['total'] for item in cart)
    # Avoid division by zero
    discount_share = [0 for _ in cart]
    if subtotal > 0 and overall_discount > 0:
        discount_share = [item['total'] / subtotal * overall_discount for item in cart]

    # Distribute paid and due proportionally per item
    paid_total = 0
    due_total = 0
    for idx, item in enumerate(cart):
        product_id = item['product_id']
        quantity = item['quantity']
        price = item['price']
        item_discount = discount_share[idx] if subtotal > 0 else 0
        total = max(0, item['total'] - item_discount)
        # Proportional paid/due for this item
        if final_total > 0:
            item_paid = paid * (total / final_total)
            item_due = due * (total / final_total)
        else:
            item_paid = 0
            item_due = 0
        # Round to 2 decimals for currency
        item_paid = round(item_paid, 2)
        item_due = round(item_due, 2)
        paid_total += item_paid
        due_total += item_due
        conn.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?', (quantity, product_id))
        conn.execute('''
            INSERT INTO sales (invoice_id, buyer_name, buyer_phone, product_id, quantity_sold, price, total, sale_date, amount_paid, amount_due, discount)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (invoice_id, buyer['name'], buyer.get('phone'), product_id, quantity, price, total, datetime.now().strftime('%Y-%m-%d %H:%M:%S'), item_paid, item_due, overall_discount))

    conn.commit()
    conn.close()

    session['invoice_buyer'] = buyer
    session.pop('cart', None)
    session.pop('current_buyer', None)

    invoice_url = url_for('invoice', invoice_id=invoice_id)
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({'invoice_url': invoice_url})
    else:
        return redirect(invoice_url)

@app.route('/checkout', methods=['POST'])
@login_required
def checkout():
    if 'cart' not in session or not session['cart']:
        flash('Cart is empty!', 'warning')
        return redirect(url_for('sales'))
    
    buyer = session.get('current_buyer')
    if not buyer:
        flash('Please enter buyer information first!', 'warning')
        return redirect(url_for('sales'))
    
    # Generate invoice ID
    invoice_id = f"INV-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    conn = get_connection()
    
    # Process each item in cart
    for item in session['cart']:
        product_id = item['product_id']
        quantity = item['quantity']
        price = item['price']
        total = price * quantity
        
        # Update product quantity
        conn.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?', 
                    (quantity, product_id))
        
        # Add sale record
        conn.execute('''
            INSERT INTO sales (invoice_id, buyer_name, buyer_phone, product_id, 
                              quantity_sold, price, total, sale_date, amount_paid, amount_due)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (invoice_id, buyer['name'], buyer.get('phone'), product_id, 
              quantity, price, total, datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
              total, 0))  # Assuming full payment for now
    
    conn.commit()
    conn.close()
    
    # Store buyer info for invoice
    session['invoice_buyer'] = buyer
    
    # Clear cart
    session.pop('cart', None)
    session.pop('current_buyer', None)
    
    flash(f'Sale completed! Invoice ID: {invoice_id}', 'success')
    return redirect(url_for('invoice', invoice_id=invoice_id))

@app.route('/invoice/<invoice_id>')
@login_required
def invoice(invoice_id):
    try:
        items = fetch_sales_by_invoice(invoice_id)
        if not items:
            flash('Invoice not found!', 'danger')
            return redirect(url_for('dashboard'))
        
        return render_template('invoice.html', invoice_id=invoice_id, items=items)
    except Exception as e:
        # flash removed
        return redirect(url_for('dashboard'))

@app.route('/reports')
@login_required
def reports():
    try:
        query = request.args.get('q', '')
        selected_filter = request.args.get('filter', '')
        selected_status = request.args.get('status', '')

        conn = get_connection()

        # Build WHERE clause
        where_conditions = []
        params = []

        import re
        date_match = re.match(r'^(\d{4}-\d{2}-\d{2})$', query)
        if date_match:
            # If query is a date, filter by that date (and filter type)
            date_str = date_match.group(1)
            if selected_filter == 'week':
                where_conditions.append("s.sale_date >= date(?) AND s.sale_date < date(?, '+7 days')")
                params.append(date_str)
                params.append(date_str)
            elif selected_filter == 'month':
                where_conditions.append("s.sale_date >= date(?) AND s.sale_date < date(?, '+30 days')")
                params.append(date_str)
                params.append(date_str)
            else:
                where_conditions.append("s.sale_date LIKE ?")
                params.append(f'{date_str}%')
        else:
            if query:
                where_conditions.append("(s.invoice_id LIKE ? OR s.buyer_phone LIKE ?)")
                params.append(f'%{query}%')
                params.append(f'%{query}%')

        if selected_filter:
            if selected_filter == 'today':
                where_conditions.append("s.sale_date >= date('now')")
            elif selected_filter == 'week':
                where_conditions.append("s.sale_date >= date('now', '-7 days')")
            elif selected_filter == 'month':
                where_conditions.append("s.sale_date >= date('now', '-30 days')")

        if selected_status:
            if selected_status == 'paid':
                where_conditions.append("s.amount_due = 0")
            elif selected_status == 'partial':
                where_conditions.append("s.amount_due > 0 AND s.amount_paid > 0")
            elif selected_status == 'due':
                where_conditions.append("s.amount_due > 0")

        where_clause = " AND ".join(where_conditions) if where_conditions else "1=1"

        # Get invoice summary data (one row per invoice)
        sales_query = f'''
            SELECT 
                s.invoice_id,
                MAX(s.buyer_name) as buyer_name,
                MAX(s.buyer_phone) as buyer_phone,
                MIN(s.sale_date) as sale_date,
                SUM(s.total) as total,
                SUM(s.amount_paid) as amount_paid,
                SUM(s.amount_due) as amount_due
            FROM sales s
            WHERE {where_clause}
            GROUP BY s.invoice_id
            ORDER BY sale_date DESC
        '''
        sales = conn.execute(sales_query, params).fetchall()

        # Calculate dues only
        total_due = conn.execute('SELECT SUM(amount_due) FROM sales').fetchone()[0] or 0

        conn.close()

        return render_template('reports.html', 
                             sales=sales,
                             query=query,
                             selected_filter=selected_filter,
                             selected_status=selected_status,
                             total_due=total_due)
    except Exception as e:
        flash(f'Error loading reports: {str(e)}', 'danger')
        return render_template('reports.html', 
                             sales=[],
                             query='',
                             selected_filter='',
                             selected_status='',
                             total_stock_value=0,
                             total_sales=0,
total_due=0)

if __name__ == '__main__':
    threading.Timer(1.25, open_browser).start()
    app.run()
