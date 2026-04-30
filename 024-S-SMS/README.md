# S-SMS — Smart School Management System

> Pakistan ke schools ke liye ek offline-first Windows desktop application — attendance, results, aur parent communication ek jagah se.

---

## Features

- **Attendance Management** — Manual entry, class-wise tracking, Google Sheet sync
- **Student Management** — CRUD + bulk Excel import
- **Results & Grades** — Subject-wise marks entry, auto grade calculation, class rank
- **PDF Reports** — Individual result cards, class master sheets, bulk PDFs, School Leaving Certificates
- **WhatsApp Alerts** — Absent students ke parents ko wa.me links se message (single + bulk queue)
- **Settings** — School info, logo upload, WhatsApp message template, admin password
- **Backup & Restore** — SQLite database ka ZIP export/import
- **Dark/Light Mode** — CSS variables se full theme support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.11 + FastAPI |
| Database | SQLite + SQLAlchemy ORM |
| Frontend | Pure HTML5 + Vanilla JS + Custom CSS |
| PDF Engine | ReportLab |
| Google Sheets | gspread + google-auth |
| WhatsApp | wa.me URL scheme (free, no API key) |
| Backup | Python zipfile module |

---

## Project Structure

```
s-sms/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # SQLite connection + session
│   ├── models.py            # SQLAlchemy ORM models
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── utils.py             # Grade calculator, student ID generator, WA URL builder
│   ├── routers/
│   │   ├── students.py      # Student CRUD + Excel import
│   │   ├── attendance.py    # Attendance mark, history, absentees, Google Sheet sync
│   │   ├── results.py       # Marks entry, grade calc, class sheet
│   │   ├── reports.py       # PDF generation (result cards, certificates)
│   │   ├── whatsapp.py      # wa.me URL generation (single + bulk)
│   │   ├── settings.py      # School settings, logo upload, password
│   │   ├── backup.py        # DB backup/restore
│   │   ├── dashboard.py     # Dashboard stats
│   │   └── auth.py          # Admin password verify (bcrypt)
│   └── services/
│       ├── pdf_service.py   # ReportLab PDF templates
│       └── sheet_sync.py    # Google Sheet attendance import
├── frontend/
│   ├── index.html           # Login page
│   ├── dashboard.html       # Main dashboard
│   ├── students.html        # Students list + add/edit/import
│   ├── attendance.html      # Manual + Google Sheet sync
│   ├── results.html         # Marks entry + class sheet
│   ├── reports.html         # PDF download (result cards + certificates)
│   ├── whatsapp.html        # WA alerts (single + bulk send)
│   ├── subjects.html        # Subject management
│   ├── settings.html        # School settings + backup
│   ├── css/
│   │   └── theme.css        # CSS variables, components, dark/light mode
│   └── js/
│       ├── api.js           # Fetch wrapper for all API calls
│       ├── auth.js          # Auth helpers, toast, modal, format utils
│       ├── sidebar.js       # Shared sidebar component
│       └── theme.js         # Dark/Light theme toggle + localStorage
├── data/
│   └── sms.db               # SQLite database (auto-created on first run)
├── assets/
│   └── school_logo.png      # School logo (used in PDF reports)
├── requirements.txt
└── run.bat                  # One-click server start for Windows
```

---

## Installation & Setup

### Requirements
- Python 3.11+
- Windows OS (Linux/Mac bhi chal sakta hai manually)

### Pehli Baar (First Run)

```bash
# 1. Repository clone karo
git clone <repo-url>
cd s-sms

# 2. Virtual environment banao
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux

# 3. Dependencies install karo
pip install -r requirements.txt

# 4. Server start karo
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

### Windows Easy Start

Double-click `run.bat` — yeh automatically:
- Virtual environment setup karta hai (agar pehli baar hai)
- Dependencies install karta hai
- Server start karta hai
- Browser open karta hai `http://localhost:8000`

---

## Default Login

```
Password: admin123
```

> ⚠️ Pehle login ke baad Settings mein password zaroor change karo.

---

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Server health check |
| GET | `/api/dashboard/stats` | Dashboard summary |
| POST | `/api/students` | Student add karo |
| GET | `/api/students` | Students list (filter: class, year) |
| PUT | `/api/students/{id}` | Student update |
| DELETE | `/api/students/{id}` | Soft delete |
| POST | `/api/students/import-excel` | Bulk Excel import |
| GET | `/api/students/meta/classes` | Distinct classes list |
| POST | `/api/subjects` | Subject add karo |
| GET | `/api/subjects` | Subjects list |
| POST | `/api/attendance` | Attendance mark (bulk) |
| GET | `/api/attendance` | Attendance history |
| GET | `/api/attendance/absentees` | Aaj ke absent students |
| POST | `/api/attendance/sync-google-sheet` | Google Sheet se sync |
| POST | `/api/results` | Marks entry |
| GET | `/api/results/class-sheet` | Class consolidated result |
| GET | `/api/reports/result-card/{id}` | Individual result card PDF |
| GET | `/api/reports/class-sheet/{class}` | Class master sheet PDF |
| POST | `/api/reports/bulk-cards/{class}/start` | Bulk PDFs generate (background job) |
| GET | `/api/reports/leaving-certificate/{id}` | School Leaving Certificate PDF |
| GET | `/api/whatsapp/url/{id}` | Single student WA URL |
| GET | `/api/whatsapp/bulk-urls` | All absentees ke WA URLs |
| GET | `/api/backup/download` | DB backup ZIP download |
| POST | `/api/backup/restore` | ZIP se restore |
| GET | `/api/settings` | Sab settings fetch |
| PUT | `/api/settings/{key}` | Setting update |
| POST | `/api/auth/verify` | Admin password verify |

---

## Database Models

### students
`id`, `student_id` (SMS-YYYY-XXX), `name`, `father_name`, `b_form_number`, `date_of_birth`, `admission_date`, `class_name`, `roll_no`, `parent_phone`, `academic_year`, `is_active`, `created_at`

### attendance
`id`, `student_id` (FK), `date`, `status` (present/absent/leave), `source` (manual/google_sheet), `marked_at`

### subjects
`id`, `name`, `class_name`, `total_marks`, `academic_year`

### results
`id`, `student_id` (FK), `subject_id` (FK), `marks_obtained`, `grade` (auto-calc), `exam_type` (midterm/final/test), `academic_year`

### settings
`key`, `value` — school_name, school_address, admin_password_hash, whatsapp_template, logo_path, google_sheet_credentials

---

## Grading Scale

| Percentage | Grade |
|---|---|
| 90%+ | A+ |
| 80–89% | A |
| 70–79% | B |
| 60–69% | C |
| 50–59% | D |
| Below 50% | F |

---

## Google Sheet Sync Setup

Attendance Google Sheet se sync karne ke liye:

1. Google Cloud Console mein project banao
2. Service Account banao aur JSON key download karo
3. Settings → Google Sheets mein JSON paste karo
4. Sheet mein us Service Account ki email ko **Editor** access do
5. Sheet format:

| Column A | Column B | Column C |
|---|---|---|
| student_id | date (YYYY-MM-DD) | status (present/absent/leave) |

---

## WhatsApp Message Template

Default template (Settings mein customize kar sakte hain):

```
Assalam u Alaikum! Aap ka beta/beti {name} aaj {date} ko school nahi aaya.
Meherbani kar ke school se rabta karein. Shukriya.
```

Available placeholders: `{name}`, `{date}`, `{class_name}`, `{father_name}`

---

## Excel Import Format

Students bulk import ke liye Excel file mein yeh columns chahiye:

| Column | Required |
|---|---|
| `name` | ✅ Zaruri |
| `class_name` | ✅ Zaruri |
| `father_name` | Optional |
| `roll_no` | Optional |
| `date_of_birth` | Optional (YYYY-MM-DD ya DD/MM/YYYY) |
| `admission_date` | Optional |
| `b_form_number` | Optional |
| `parent_phone` | Optional |

> 💡 `class_name` mein section bhi likhein — e.g. `Class 5-A`

---

## PDF Reports

- **Individual Result Card** — Student + subjects + marks + grade + signatures
- **Class Master Sheet** — Landscape A4, poori class ka consolidated table with ranks
- **Bulk Result Cards** — Poori class ke sab cards ek PDF mein (har student ek page)
- **School Leaving Certificate** — Portrait A4, formal certificate with school logo/seal

---

## Security

- Admin password bcrypt hash se store hota hai (plain text nahi)
- Session-based auth (sessionStorage)
- Google credentials server-side encrypted storage mein

---

## Backup & Restore

- **Download**: Settings → Backup → `s-sms-backup-TIMESTAMP.zip`
- **Restore**: ZIP file select karo — existing data overwrite ho jayega
- Restore ke baad app restart karna hoga

---

## License

Private / Internal Use — Developed for school administration in Pakistan.
