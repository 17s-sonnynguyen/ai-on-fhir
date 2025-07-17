# app/mock_data.py

# Sample mock patients
PATIENTS = [
    {"id": "1", "name": "Alice Smith", "age": 60, "gender": "female"},
    {"id": "2", "name": "Bob Johnson", "age": 45, "gender": "male"},
    {"id": "3", "name": "Carol Lee", "age": 52, "gender": "female"},
    {"id": "4", "name": "David Kim", "age": 30, "gender": "male"},
    {"id": "5", "name": "Emma Garcia", "age": 67, "gender": "female"},
]

# Sample mock conditions tied to patient IDs
CONDITIONS = [
    {"id": "c1", "patient_id": "1", "condition": "diabetes"},
    {"id": "c2", "patient_id": "2", "condition": "hypertension"},
    {"id": "c3", "patient_id": "3", "condition": "diabetes"},
    {"id": "c4", "patient_id": "4", "condition": "asthma"},
    {"id": "c5", "patient_id": "5", "condition": "diabetes"},
]
