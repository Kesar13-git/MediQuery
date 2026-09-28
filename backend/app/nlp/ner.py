import re
import spacy

# -------------------------------------------------
# Load spaCy's general English model
# -------------------------------------------------

nlp = spacy.load("en_core_web_sm")


# -------------------------------------------------
# Medical vocabulary used by MediQuery
# -------------------------------------------------

MEDICAL_TERMS = {

    "SYMPTOM": [
        "headache",
        "head pain",
        "fever",
        "cough",
        "cold",
        "sore throat",
        "runny nose",
        "blocked nose",
        "stuffy nose",
        "sneezing",
        "vomiting",
        "throwing up",
        "nausea",
        "dizziness",
        "fatigue",
        "weakness",
        "stomach pain",
        "abdominal pain",
        "chest pain",
        "back pain",
        "lower back pain",
        "joint pain",
        "body pain",
        "muscle pain",
        "shortness of breath",
        "breathing difficulty",
        "difficulty breathing",
        "itching",
        "rash",
        "diarrhea",
        "constipation",
        "stomach ache",
        "stomachache",
        "pain"
    ],

    "SEVERITY": [
        "mild",
        "moderate",
        "severe",
        "slight",
        "extreme",
        "intense",
        "very painful",
        "very severe",
        "extremely painful"
    ],

    "BODY_PART": [
        "head",
        "throat",
        "chest",
        "stomach",
        "abdomen",
        "back",
        "lower back",
        "leg",
        "arm",
        "hand",
        "foot",
        "eye",
        "ear",
        "nose",
        "neck",
        "shoulder",
        "knee"
    ],

    "FREQUENCY": [
        "once",
        "twice",
        "daily",
        "every day",
        "every morning",
        "every night",
        "occasionally",
        "frequently",
        "sometimes",
        "often",
        "rarely",
        "constantly"
    ],

    "DURATION": [
        "today",
        "yesterday",
        "since today",
        "since yesterday",
        "for a day",
        "for one day",
        "for two days",
        "for three days",
        "for four days",
        "for five days",
        "for a week",
        "for two weeks",
        "for three weeks",
        "for a month",
        "for two months",
        "for several days",
        "for several weeks"
    ],

    "TRIGGER": [
        "after eating",
        "after exercise",
        "after walking",
        "after running",
        "in the morning",
        "at night",
        "during exercise",
        "in cold weather",
        "after sleeping",
        "after drinking",
        "after food"
    ],

    "MEDICATION": [
        "paracetamol",
        "acetaminophen",
        "ibuprofen",
        "aspirin",
        "antibiotic",
        "antibiotics",
        "medicine",
        "medication",
        "tablet",
        "tablets",
        "syrup"
    ],

    "DISEASE": [
        "diabetes",
        "asthma",
        "migraine",
        "flu",
        "influenza",
        "allergy",
        "allergies",
        "hypertension",
        "high blood pressure",
        "common cold"
    ]
}


# -------------------------------------------------
# Helper function
# -------------------------------------------------

def _find_medical_entities(text: str):
    """
    Find medical entities using the MediQuery medical
    vocabulary.
    """

    text_lower = text.lower()

    entities = []

    for entity_type, terms in MEDICAL_TERMS.items():

        for term in terms:

            # Word-boundary matching prevents partial matches.
            pattern = r"\b" + re.escape(term) + r"\b"

            for match in re.finditer(pattern, text_lower):

                start = match.start()
                end = match.end()

                # Check whether another medical entity already
                # covers this same text or overlaps it.
                overlapping_entity = None

                for existing in entities:

                    if (
                        start < existing["end"]
                        and end > existing["start"]
                    ):
                        overlapping_entity = existing
                        break

                if overlapping_entity:

                    # Prefer the longer phrase.
                    existing_length = (
                        overlapping_entity["end"]
                        - overlapping_entity["start"]
                    )

                    current_length = end - start

                    if current_length > existing_length:

                        entities.remove(overlapping_entity)

                        entities.append({
                            "text": text[start:end],
                            "type": entity_type,
                            "start": start,
                            "end": end
                        })

                else:

                    entities.append({
                        "text": text[start:end],
                        "type": entity_type,
                        "start": start,
                        "end": end
                    })

    return entities


# -------------------------------------------------
# Main NER function
# -------------------------------------------------

def extract_entities(text: str):
    """
    Extract medical entities from user symptom text.

    MediQuery combines:
    1. A general spaCy NLP model
    2. A medical vocabulary/rule-based NER layer

    Medical entities are prioritized when they overlap
    with general spaCy entities.
    """

    if not text or not text.strip():
        return []

    # Run spaCy
    doc = nlp(text)

    # ---------------------------------------------
    # Step 1: Extract MediQuery medical entities
    # ---------------------------------------------

    entities = _find_medical_entities(text)

    # ---------------------------------------------
    # Step 2: Add spaCy entities only when they
    # do not overlap with a medical entity
    # ---------------------------------------------

    for ent in doc.ents:

        overlaps_medical_entity = any(
            ent.start_char < entity["end"]
            and ent.end_char > entity["start"]
            for entity in entities
        )

        if not overlaps_medical_entity:

            entities.append({
                "text": ent.text,
                "type": ent.label_,
                "start": ent.start_char,
                "end": ent.end_char
            })

    # ---------------------------------------------
    # Step 3: Sort entities according to their
    # position in the user's sentence
    # ---------------------------------------------

    entities.sort(
        key=lambda entity: (
            entity["start"],
            -(entity["end"] - entity["start"])
        )
    )

    return entities