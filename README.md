# AI on FHIR – Full Stack Assessment

This is a full-stack AI-powered query tool that processes natural language inputs to simulate FHIR-based patient data filtering. It uses a **FastAPI backend** with enhanced **spaCy-based NLP** and a **Next.js frontend**, all containerized via Docker.

---

## Example Query

```
Find diabetic patients over 60
```

The app:
- Uses spaCy NLP to extract medical conditions and age.
- Simulates FHIR-like filtering logic.
- Returns mock patient records that match.

---

## Project Structure

```
ai-on-fhir/
├── ai-on-fhir-backend/       # FastAPI + spaCy backend
│   ├── app/
│   │   ├── main.py           # API and request handler
│   │   ├── nlp.py            # Advanced NLP processing with spaCy
│   │   └── fhir_simulator.py # Mock FHIR logic
│   ├── Dockerfile
│   └── requirements.txt
├── ai-on-fhir-frontend/      # Next.js React frontend
│   ├── pages/
│   ├── components/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml        # For running full-stack app
```

---

## How to Run (Dockerized)

1. **Build and run the containers**:

```bash
docker-compose down -v        # Optional: clean state
docker-compose build --no-cache
docker-compose up
```

2. **Visit**:  
   [http://localhost:3000](http://localhost:3000)

3. **Try queries** like:
   ```
   Show patients above 50 with hypertension
   List asthma patients older than 40
   ```

---

## Key Features

- **Natural Language Querying** via `spaCy`
- **Medical Concept Recognition** using `PhraseMatcher`
- **Flexible Age Parsing** with pattern rules and NER fallback
- **Full Docker Support** for both backend and frontend
- **React UI with Axios Integration**

---

## Developer Setup (without Docker)

### 1. Backend (FastAPI + spaCy)

```bash
cd ai-on-fhir-backend
python -m venv venv
venv\Scripts\activate     # or source venv/bin/activate
pip install fastapi uvicorn spacy
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload
```

### 2. Frontend (Next.js)

```bash
cd ai-on-fhir-frontend
npm install
npm run dev
```

Open browser at: [http://localhost:3000](http://localhost:3000)

---

## Notes

- No real FHIR API or patient data — all logic and data are simulated.
- The NLP component is purely local, using `spaCy` and no external API calls.
- Query extraction supports both **age ranges** and **known medical conditions**.

---

## Submission Checklist

- [x] Working full-stack application
- [x] Docker support
- [x] spaCy-powered NLP integration
- [x] README with setup + usage guide
- [ ] (Optional) Loom or video demo link

---

## Demo (Optional)

> Add a Loom or screen recording link here
