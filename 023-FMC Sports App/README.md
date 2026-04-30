# 🏆 FMC Sports - Sports Shop Management System

> **Your Sports, Your Style.**  
> FMC Sports ek complete Point-of-Sale aur inventory management system hai jo specifically sports shops ke liye banaya gaya hai.

---

## 📋 Features

- 🛒 **Sales & Billing** — Barcode scan ya product search se fast billing
- 📦 **Product Management** — Products add, edit, delete karo with auto barcode generation
- 🧾 **Invoice Generation** — Professional thermal receipt print karo
- 📋 **Reports** — Sales history, due/partial payments filter karo
- 💰 **Revenue Tracking** — Cost price vs selling price se net revenue dekhو
- 📊 **Dashboard** — Daily sales graph, low stock alerts, live clock
- 🏷️ **Barcode System** — Har product ka PDF barcode label automatically generate hota hai
- 🖼️ **Slideshow** — Dashboard par product images ka auto slideshow

---

## 🗂️ Project Structure

```
FMC-Sports-App/
├── run.py                  # Main Flask application
├── data/
│   ├── db.py               # Database connection & utility functions
│   └── sports_shop.db      # SQLite database (auto-created)
├── templates/
│   ├── login.html
│   ├── dashboard.html
│   ├── product.html
│   ├── edit_product.html
│   ├── sales.html
│   ├── invoice.html
│   ├── reports.html
│   └── revinue.html
└── static/
    ├── css/
    │   └── bootstrap.min.css
    ├── js/
    │   └── chart.umd.js
    ├── fonts/
    │   ├── arial.ttf
    │   └── arialbd.ttf
    ├── images/
    │   ├── dp/dp.png           # Shop logo
    │   └── slideshow/          # Dashboard slideshow images
    ├── barcodes/               # Auto-generated PDF barcodes
    ├── sounds/
    │   ├── click.mp3
    │   └── beep.mp3
    └── text/
        └── error.txt           # Error log
```

---

## ⚙️ Installation

### Requirements

- Python 3.8+
- pip

### Steps

```bash
# 1. Repository clone karo
git clone https://github.com/yourusername/FMC-Sports-App.git
cd FMC-Sports-App

# 2. Dependencies install karo
pip install flask reportlab

# 3. App run karo
python run.py
```

App automatically browser mein open ho jata hai: `http://127.0.0.1:5000`

---

## 🔐 Default Login Credentials

| Username | Password | Role  |
|----------|----------|-------|
| admin    | 881122   | Admin |
| user     | 12345    | User  |

> ⚠️ Production use se pehle passwords zaroor change karein.

---

## 🗄️ Database Schema

### `products`
| Column       | Type    | Description              |
|--------------|---------|--------------------------|
| id           | INTEGER | Primary key              |
| name         | TEXT    | Product name             |
| category     | TEXT    | Sport category           |
| brand        | TEXT    | Brand name               |
| price        | REAL    | Selling price (Rs.)      |
| cost_price   | REAL    | Purchase cost (Rs.)      |
| quantity     | INTEGER | Stock quantity           |
| date_added   | TEXT    | Date added               |
| barcode      | TEXT    | Auto-generated barcode   |

### `sales`
| Column        | Type    | Description                     |
|---------------|---------|---------------------------------|
| id            | INTEGER | Primary key                     |
| invoice_id    | TEXT    | Invoice reference (INV-...)     |
| buyer_name    | TEXT    | Customer name                   |
| buyer_phone   | TEXT    | Customer phone (optional)       |
| product_id    | INTEGER | FK → products                   |
| quantity_sold | INTEGER | Units sold                      |
| price         | REAL    | Sale price per unit             |
| discount      | REAL    | Discount applied                |
| total         | REAL    | Final amount                    |
| sale_date     | TEXT    | Date & time of sale             |
| amount_paid   | REAL    | Amount received                 |
| amount_due    | REAL    | Remaining due amount            |
| is_credit     | INTEGER | 1 = credit sale                 |

---

## 🛒 How to Use

### Sales Process
1. Dashboard ya `/sales` par jao
2. Buyer ka naam enter karo
3. Barcode scan karo ya product search karo
4. Cart mein quantity adjust karo
5. Discount add karo (optional)
6. Payment type select karo (Full / Partial / Credit)
7. **Finalize Sale** press karo — invoice auto print hoga

### Product Add Karna
1. `/product` page par jao
2. Form fill karo (Name, Category, Price, Cost Price, Quantity)
3. Submit karo — barcode PDF automatically generate hoga

### Barcode Print Karna
- Product list mein barcode image par click karo
- PDF open hoga, direct print ho jata hai

---

## 💡 Categories Supported

Cricket 🏏 | Football ⚽ | Basketball 🏀 | Tennis 🎾 | Badminton 🏸  
Table Tennis 🏓 | Volleyball 🏐 | Hockey 🏑 | Swimming 🏊 | Boxing 🥊  
Gym 💪 | Yoga 🧘 | Cycling 🚴 | Skating ⛸️ | Martial Arts 🥋  
Shoes 👟 | Clothing 👕 | Equipment 🛠️ | Accessories 🎽 | Athletics 🏃

---

## 📦 Dependencies

| Package      | Purpose                        |
|--------------|--------------------------------|
| Flask        | Web framework                  |
| ReportLab    | PDF barcode generation         |
| SQLite3      | Database (built-in Python)     |
| Bootstrap 5  | Frontend UI (included locally) |
| Chart.js     | Sales graph on dashboard       |

---

## 🖨️ Barcode System

- Barcodes **51150001** se start hote hain aur automatically increment hote hain
- Har product ka **38mm × 28mm** PDF label generate hota hai
- Label mein product name, price, aur Code128 barcode hota hai
- Sales page par barcode scan karne se product directly cart mein add ho jata hai

---

## 📌 Shop Info

**FMC Sports**  
Talamba Road, Mian Channu  

---

## 👨‍💻 Developer

Developed by **Sarfraz** — 📞 0326-0155115

---

## 📄 License

Is project ke rights FMC Sports ke pass mahfooz hain.
