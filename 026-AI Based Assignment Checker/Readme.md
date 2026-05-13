# AI Assignment Checker

Automated assignment grading system using grammar analysis, plagiarism detection, and AI content evaluation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI + MongoDB (Motor) |
| Frontend | React 19 + Vite + Recharts |
| Grammar | LanguageTool (self-hosted Docker) |
| Content AI | Llama 2 via Ollama (local) |
| Plagiarism | Custom TF-IDF (scikit-learn) |
| Auth | JWT (python-jose + bcrypt) |

---

## Prerequisites

- Python 3.10+
- Node.js 20+
- MongoDB running on `localhost:27017`
- Docker (for LanguageTool)
- [Ollama](https://ollama.com) installed with Llama 2 pulled

---

## Setup

### 1. Clone & Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` in `/backend`:

```env
MONGO_URI=mongodb://localhost:27017/ai_assignment_checker
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
LLAMA_URL=http://localhost:11434
LANGUAGETOOL_URL=http://localhost:8010
```

### 2. Start External Services

```bash
# LanguageTool (grammar)
docker run -d -p 8010:8010 silviof/docker-languagetool

# Llama 2 (content AI)
ollama pull llama2
ollama serve
```

### 3. Run Backend

```bash
uvicorn main:app --reload --port 8000
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## How It Works

1. Student uploads an assignment (PDF, DOCX, or TXT)
2. Three checks run in parallel:
   - **Grammar** — LanguageTool API, scored 0–10
   - **Plagiarism** — TF-IDF cosine similarity against all existing submissions
   - **Content** — Llama 2 evaluates relevance, structure, depth, clarity
3. Final score = `Grammar × 30% + Content × 50% + Plagiarism × 20%`
4. If plagiarism detected → final score forced to 0
5. Teacher can override grade and add comments

---

## Roles

**Student**
- Submit assignments, view results with detailed feedback, track progress over time

**Teacher**
- View all submissions, override grades, analytics dashboard with per-student insights

---

## Scoring

| Grade | Score |
|---|---|
| A | 9 – 10 |
| B | 7 – 8.9 |
| C | 5 – 6.9 |
| D | 3 – 4.9 |
| F | Below 3 |

---

## Project Structure

```
/
├── backend/
│   ├── api/          
│   ├── models/       
│   ├── services/     
│   ├── utils/        
│   ├── database.py
│   └── main.py
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        └── pages/
            ├── student/
            └── teacher/
```

---

## Notes

- LanguageTool and Ollama are optional — the app falls back gracefully if they're not running (neutral scores returned)
- Max file size: 5 MB
- Supported formats: `.pdf`, `.docx`, `.txt`
- Text is truncated to 2000 words before sending to Llama 2