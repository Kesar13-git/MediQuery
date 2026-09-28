from typing import Any, Dict, List


# -------------------------------------------------
# Symptom normalization dictionary
# -------------------------------------------------

SYMPTOM_NORMALIZATION = {

    # Headache
    "headache": "headache",
    "head pain": "headache",
    "pain in my head": "headache",
    "pain in the head": "headache",
    "head hurts": "headache",

    # Fever
    "fever": "fever",
    "high temperature": "fever",
    "temperature": "fever",
    "running a temperature": "fever",

    # Cough
    "cough": "cough",
    "coughing": "cough",

    # Cold
    "cold": "common cold",
    "common cold": "common cold",

    # Sore throat
    "sore throat": "sore throat",
    "throat pain": "sore throat",
    "pain in my throat": "sore throat",
    "painful throat": "sore throat",

    # Runny nose
    "runny nose": "runny nose",
    "nose is running": "runny nose",
    "running nose": "runny nose",

    # Blocked nose
    "blocked nose": "nasal congestion",
    "stuffy nose": "nasal congestion",
    "congested nose": "nasal congestion",
    "nose is blocked": "nasal congestion",

    # Sneezing
    "sneezing": "sneezing",
    "sneeze": "sneezing",

    # Nausea
    "nausea": "nausea",
    "feeling nauseous": "nausea",
    "feel nauseous": "nausea",
    "feeling sick": "nausea",

    # Vomiting
    "vomiting": "vomiting",
    "vomit": "vomiting",
    "throwing up": "vomiting",
    "threw up": "vomiting",

    # Dizziness
    "dizziness": "dizziness",
    "dizzy": "dizziness",
    "feeling dizzy": "dizziness",
    "feel dizzy": "dizziness",

    # Fatigue
    "fatigue": "fatigue",
    "tiredness": "fatigue",
    "feeling tired": "fatigue",
    "very tired": "fatigue",
    "exhaustion": "fatigue",
    "exhausted": "fatigue",

    # Weakness
    "weakness": "weakness",
    "feeling weak": "weakness",
    "feel weak": "weakness",

    # Abdominal / stomach pain
    "stomach pain": "abdominal pain",
    "stomach ache": "abdominal pain",
    "stomachache": "abdominal pain",
    "abdominal pain": "abdominal pain",
    "pain in my stomach": "abdominal pain",
    "pain in the stomach": "abdominal pain",

    # Chest pain
    "chest pain": "chest pain",
    "pain in my chest": "chest pain",
    "pain in the chest": "chest pain",

    # Back pain
    "back pain": "back pain",
    "pain in my back": "back pain",
    "pain in the back": "back pain",
    "lower back pain": "lower back pain",
    "pain in my lower back": "lower back pain",

    # Joint pain
    "joint pain": "joint pain",
    "pain in my joints": "joint pain",
    "painful joints": "joint pain",

    # Body pain
    "body pain": "body pain",
    "body ache": "body pain",
    "body aches": "body pain",
    "aches all over": "body pain",

    # Muscle pain
    "muscle pain": "muscle pain",
    "muscle ache": "muscle pain",
    "muscle aches": "muscle pain",

    # Breathing difficulty
    "shortness of breath": "shortness of breath",
    "breathing difficulty": "breathing difficulty",
    "difficulty breathing": "breathing difficulty",
    "trouble breathing": "breathing difficulty",

    # Itching
    "itching": "itching",
    "itchy": "itching",
    "feeling itchy": "itching",

    # Rash
    "rash": "rash",
    "skin rash": "rash",

    # Diarrhea
    "diarrhea": "diarrhea",
    "loose motions": "diarrhea",
    "loose stools": "diarrhea",
    "frequent loose stools": "diarrhea",

    # Constipation
    "constipation": "constipation",
    "difficulty passing stool": "constipation",
    "hard stools": "constipation",
}


def normalize_symptom(symptom: str) -> str:
    """
    Normalize a single symptom phrase into a standard
    symptom representation.
    """

    cleaned = symptom.strip().lower()

    # Direct dictionary match
    if cleaned in SYMPTOM_NORMALIZATION:
        return SYMPTOM_NORMALIZATION[cleaned]

    # If no mapping exists, return the cleaned text.
    return cleaned


def normalize_entities(
    entities: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Normalize symptom entities while preserving all
    other entity information.
    """

    normalized_entities = []

    for entity in entities:

        updated_entity = entity.copy()

        if entity.get("type", "").upper() == "SYMPTOM":

            original_text = entity.get("text", "")

            updated_entity["normalized"] = normalize_symptom(
                original_text
            )

        normalized_entities.append(updated_entity)

    return normalized_entities


def normalize_symptoms(
    symptoms: List[str]
) -> List[str]:
    """
    Normalize a list of extracted symptoms.

    Duplicate normalized symptoms are removed.
    """

    normalized = []

    for symptom in symptoms:

        standard_name = normalize_symptom(symptom)

        if standard_name not in normalized:
            normalized.append(standard_name)

    return normalized