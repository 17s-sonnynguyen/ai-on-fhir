# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.nlp import extract_entities
from app.fhir_simulator import find_patients_by_condition_and_age

app = FastAPI()

# Allow requests from frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/query")
def process_query(request: QueryRequest):
    query_text = request.query

    # Step 1: Extract entities using spaCy
    extracted = extract_entities(query_text)

    # Step 2: Simulate FHIR filtering
    results = find_patients_by_condition_and_age(
        condition_keyword=extracted["condition"],
        min_age=extracted["age"]
    )

    return {
        "query": query_text,
        "extracted": extracted,
        "results": results
    }
