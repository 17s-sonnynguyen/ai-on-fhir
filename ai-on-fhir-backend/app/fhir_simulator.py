# app/fhir_simulator.py

from app.mock_data import PATIENTS, CONDITIONS

def find_patients_by_condition_and_age(condition_keyword: str = None, min_age: int = None):
    # Step 1: Find matching condition patient IDs
    matching_patient_ids = set()

    if condition_keyword:
        for cond in CONDITIONS:
            if condition_keyword.lower() in cond["condition"].lower():
                matching_patient_ids.add(cond["patient_id"])
    else:
        # If no condition specified, include all patient IDs
        matching_patient_ids = {patient["id"] for patient in PATIENTS}

    # Step 2: Filter patients by age and patient ID
    results = []
    for patient in PATIENTS:
        if patient["id"] in matching_patient_ids:
            if min_age is None or patient["age"] >= min_age:
                results.append(patient)

    return results
