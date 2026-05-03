# 📖 Smart EduBot

A RAG-based study assistant — upload a PDF book, ask questions, get AI-powered answers.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** FastAPI (Python)
- **LLMs:** LLaMA 2 (local via Ollama) · Gemini (Google AI)
- **Embeddings:** `all-MiniLM-L6-v2` via Sentence Transformers
- **Vector DB:** ChromaDB

## Prerequisites

- Python 3.10+
- Node.js 20+
- [Ollama](https://ollama.com) (for local LLaMA 2)

## Setup

### 1. Clone & install backend
```bash
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r backend/requirements.txt
```

### 2. Install frontend
```bash
cd frontend
npm install
```

### 3. Pull LLaMA 2 model
```bash
ollama pull llama2
```

## Running

**Windows (one command):**
```bash
start.bat
```

**Manual:**
```bash
# Terminal 1 — Ollama
ollama serve

# Terminal 2 — Backend
cd backend && uvicorn main:app --reload --port 8000

# Terminal 3 — Frontend
cd frontend && npm run dev
```

App runs at → `http://localhost:5173`

## Usage

1. Click **New Book Upload** → drag & drop a PDF
2. Select the uploaded book from the sidebar
3. Ask questions in the chat
4. Switch between **LLaMA 2** (offline) and **Gemini** (online) via the model selector

> For Gemini: go to **Key Management** and add a Google AI Studio API key.

## Project Structure

```
├── backend/
│   ├── main.py          # FastAPI routes
│   ├── chunker.py       # PDF text chunking
│   ├── embedder.py      # Sentence embeddings
│   ├── vector_store.py  # ChromaDB operations
│   ├── prompt_builder.py
│   ├── llm.py           # Ollama/LLaMA 2
│   └── gemini.py        # Google Gemini
├── frontend/
│   └── src/
│       ├── pages/       # ChatPage, KeyManagementPage
│       └── components/  # Sidebar, ChatWindow, MessageInput, ...
└── start.bat
```

## Notes

- API keys are stored locally in `backend/storage/settings.json` — never sent to any server
- Scanned/image PDFs won't work — text-based PDFs only