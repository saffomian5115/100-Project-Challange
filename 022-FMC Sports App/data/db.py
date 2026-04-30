import os, sys, sqlite3

def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except AttributeError:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

db_path = resource_path('data/sports_shop.db')

def get_connection():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn



def initialize_database():
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
    )""")

    c.execute("""CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT DEFAULT None,
        category TEXT DEFAULT None,
        brand TEXT DEFAULT None,
        price REAL DEFAULT 0,
        cost_price REAL DEFAULT 0,
        quantity INTEGER DEFAULT 0,
        date_added TEXT DEFAULT None,
        barcode TEXT DEFAULT None
    )""")

    c.execute("""CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id TEXT,
    buyer_name TEXT,
    buyer_phone TEXT,
    product_id INTEGER,
    quantity_sold INTEGER,
    price REAL,
    discount REAL,
    total REAL,
    sale_date TEXT,
    amount_paid REAL DEFAULT 0,
    amount_due REAL DEFAULT 0,
    is_credit INTEGER DEFAULT 0
)""")

    # Add missing columns to existing products table if they don't exist
    try:
        c.execute("ALTER TABLE products ADD COLUMN date_added TEXT DEFAULT None")
    except sqlite3.OperationalError:
        # Column already exists, ignore error
        pass
    
    try:
        c.execute("ALTER TABLE products ADD COLUMN barcode TEXT DEFAULT None")
    except sqlite3.OperationalError:
        # Column already exists, ignore error
        pass
    
    # Remove old columns that are no longer needed (if they exist)
    # Note: SQLite doesn't support DROP COLUMN directly, so we'll handle this in the application code

    c.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)", ("admin", "881122", "admin"))
    c.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)", ("user", "12345", "user"))
    c.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)", ("sarfraz", "saffo5115", "coder"))

    conn.commit()
    conn.close()


# === Utility functions ===

def fetch_all_products():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM products ORDER BY id DESC").fetchall()
    conn.close()
    return rows

def count_low_stock():
    conn = get_connection()
    row = conn.execute("SELECT COUNT(*) FROM products WHERE quantity <= 5").fetchone()
    conn.close()
    return row[0]

def get_low_stock_products():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM products WHERE quantity <= 5").fetchall()
    conn.close()
    return rows

def fetch_sales_by_invoice(invoice_id):
    conn = get_connection()
    rows = conn.execute("""
        SELECT s.*, p.name
        FROM sales s
        JOIN products p ON s.product_id = p.id
        WHERE s.invoice_id = ?
    """, (invoice_id,)).fetchall()
    conn.close()
    return rows
