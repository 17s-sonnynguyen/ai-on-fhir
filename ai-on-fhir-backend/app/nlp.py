# app/nlp.py

import spacy
from spacy.matcher import PhraseMatcher, Matcher

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

# Expand known medical conditions
KNOWN_CONDITIONS = [
    "diabetes", "hypertension", "asthma", "cancer", "obesity",
    "stroke", "heart disease", "depression", "arthritis", "covid"
]

# PhraseMatcher for condition detection
condition_matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
condition_matcher.add("CONDITION", [nlp.make_doc(cond) for cond in KNOWN_CONDITIONS])

# Matcher for various age expressions
age_matcher = Matcher(nlp.vocab)
age_matcher.add("AGE", [
    [{"LOWER": {"IN": ["over", "older", "above", "greater"]}}, {"LOWER": "than"}, {"LIKE_NUM": True}],
    [{"LIKE_NUM": True}, {"LOWER": "-"}, {"LOWER": "year"}, {"LOWER": "old"}],
    [{"LIKE_NUM": True}, {"LOWER": "year"}, {"LOWER": "old"}]
])

def extract_entities(text: str):
    doc = nlp(text)
    extracted = {"age": None, "condition": None}

    # Match medical conditions
    condition_matches = condition_matcher(doc)
    if condition_matches:
        match_id, start, end = condition_matches[0]
        extracted["condition"] = doc[start:end].text.lower()

    # Match age expressions
    matches = age_matcher(doc)
    for match_id, start, end in matches:
        span = doc[start:end]
        for token in span:
            if token.like_num:
                extracted["age"] = int(token.text)
                break
        if extracted["age"]:
            break

    # Fallback: detect "60-year-old" via NER
    for ent in doc.ents:
        if ent.label_ == "DATE" and "year old" in ent.text.lower():
            for token in ent:
                if token.like_num:
                    extracted["age"] = int(token.text)
                    break

    return extracted
