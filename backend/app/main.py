from datetime import datetime
from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.nlp.ner import extract_entities
from app.nlp.negation import detect_negations
from app.nlp.normalization import normalize_entities
from app.nlp.information_extraction import extract_information


# -------------------------------------------------
# FastAPI Application
# -------------------------------------------------

app = FastAPI(
    title="MediQuery NLP API",
    description="NLP backend for the MediQuery Medical Symptom Checker",
    version="1.0.0",
)


# -------------------------------------------------
# CORS Configuration
# -------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://10.86.228.237:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------------------------
# Request Model
# -------------------------------------------------

class AnalyzeRequest(BaseModel):
    text: str


# -------------------------------------------------
# Helper Functions
# -------------------------------------------------

def convert_entities(entities: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Convert Python NLP entities into the format expected
    by the MediQuery React frontend.
    """

    converted = []

    for index, entity in enumerate(entities):

        entity_type = entity.get("type", "OTHER")

        # Map spaCy DATE to the project's DURATION concept
        # only when our medical NER did not already identify it.
        if entity_type == "DATE":
            entity_type = "DURATION"

        converted.append({
            "id": f"entity-{index + 1}",
            "text": entity.get("text", ""),
            "type": entity_type,
            "startIndex": entity.get("start", 0),
            "endIndex": entity.get("end", 0),
            "confidence": 0.95 if entity_type in {
                "SYMPTOM",
                "SEVERITY",
                "DURATION",
                "FREQUENCY",
                "TRIGGER",
                "BODY_PART",
                "MEDICATION",
                "DISEASE",
            } else 0.80,
            "normalized": entity.get("normalized"),
            "description": (
                f"MediQuery identified this phrase as "
                f"{entity_type.lower().replace('_', ' ')}."
            ),
            "negated": entity.get("negated", False),
        })

    return converted


def calculate_missing_information(
    extracted_information: Dict[str, Any]
) -> List[str]:
    """
    Identify useful information that was not provided
    in the user's symptom description.
    """

    missing = []

    if not extracted_information.get("severity"):
        missing.append("severity")

    if not extracted_information.get("duration"):
        missing.append("duration")

    if not extracted_information.get("frequency"):
        missing.append("frequency")

    if not extracted_information.get("triggers"):
        missing.append("triggers")

    return missing


def calculate_risk(
    extracted_information: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Basic rule-based educational risk assessment.

    This is NOT a medical diagnosis or clinical prediction.
    """

    symptoms = [
        symptom.lower()
        for symptom in extracted_information.get("symptoms", [])
    ]

    severity = (
        extracted_information.get("severity") or ""
    ).lower()

    # ---------------------------------------------
    # Urgent warning symptoms
    # ---------------------------------------------

    urgent_symptoms = {
        "chest pain",
        "shortness of breath",
        "breathing difficulty",
    }

    detected_urgent = [
        symptom
        for symptom in symptoms
        if symptom in urgent_symptoms
    ]

    if detected_urgent:

        return {
            "level": "urgent",
            "title": "Prompt medical attention may be needed",
            "description": (
                "The described symptoms can sometimes require "
                "prompt professional assessment."
            ),
            "isUrgentFlag": True,
            "urgentWarningSigns": detected_urgent,
            "recommendedAction": (
                "Seek prompt medical evaluation, especially if "
                "symptoms are severe, worsening, or accompanied "
                "by additional warning signs."
            ),
        }

    # ---------------------------------------------
    # Severe symptoms
    # ---------------------------------------------

    if severity in {"severe", "extreme", "intense"}:

        return {
            "level": "moderate",
            "title": "Further assessment recommended",
            "description": (
                "The reported severity suggests that additional "
                "symptom information and professional assessment "
                "may be appropriate."
            ),
            "isUrgentFlag": False,
            "urgentWarningSigns": [],
            "recommendedAction": (
                "Monitor your symptoms and consider consulting "
                "a healthcare professional, particularly if "
                "symptoms persist or worsen."
            ),
        }

    # ---------------------------------------------
    # Default
    # ---------------------------------------------

    return {
        "level": "low",
        "title": "General monitoring",
        "description": (
            "The available information does not contain the "
            "specific warning patterns checked by this basic "
            "rule-based system."
        ),
        "isUrgentFlag": False,
        "urgentWarningSigns": [],
        "recommendedAction": (
            "Continue monitoring your symptoms and seek "
            "professional advice if they persist, worsen, "
            "or cause concern."
        ),
    }


def generate_follow_up_questions(
    missing_information: List[str]
) -> List[Dict[str, Any]]:
    """
    Generate follow-up questions based on information
    missing from the initial symptom description.
    """

    questions = []

    question_map = {
        "severity": {
            "question": "How severe are your symptoms?",
            "description": "This helps describe the intensity of the reported symptoms.",
            "category": "Severity",
            "options": [
                "Mild",
                "Moderate",
                "Severe",
            ],
        },

        "duration": {
            "question": "How long have you had these symptoms?",
            "description": "Provide the approximate duration.",
            "category": "Duration",
            "options": [
                "Less than a day",
                "1–3 days",
                "4–7 days",
                "More than a week",
            ],
        },

        "frequency": {
            "question": "How frequently do the symptoms occur?",
            "description": "Describe how often the symptoms appear.",
            "category": "Frequency",
            "options": [
                "Occasionally",
                "Sometimes",
                "Frequently",
                "Constantly",
            ],
        },

        "triggers": {
            "question": "Have you noticed anything that triggers or worsens the symptoms?",
            "description": "For example, eating, exercise, weather, or time of day.",
            "category": "Triggers",
            "options": [
                "Eating",
                "Exercise",
                "Time of day",
                "No known trigger",
            ],
        },
    }

    for index, category in enumerate(missing_information):

        if category not in question_map:
            continue

        item = question_map[category]

        questions.append({
            "id": f"followup-{index + 1}",
            "question": item["question"],
            "description": item["description"],
            "category": item["category"],
            "options": item["options"],
        })

    return questions


def generate_guidance(
    risk_assessment: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Generate general educational guidance.

    This does not provide diagnosis or medication
    recommendations.
    """

    return {
        "monitoring": [
            "Keep track of changes in symptom severity.",
            "Note any new or worsening symptoms.",
            "Record the duration and frequency of symptoms.",
        ],

        "whenToSeekHelp": [
            "Seek professional medical advice if symptoms persist or worsen.",
            "Seek prompt care if severe or concerning symptoms develop.",
        ],

        "questionsForDoctor": [
            "When did the symptoms begin?",
            "What makes the symptoms better or worse?",
            "Have similar symptoms occurred previously?",
        ],

        "generalSelfCare": [
            "Maintain adequate hydration.",
            "Get sufficient rest.",
            "Monitor your symptoms carefully.",
        ],
    }


def generate_related_conditions(
    symptoms: List[str]
) -> List[Dict[str, Any]]:
    """
    Generate educational symptom-overlap indicators.

    These are NOT diagnoses or clinical probabilities.
    """

    conditions = []

    symptom_set = set(
        symptom.lower()
        for symptom in symptoms
    )

    # ---------------------------------------------
    # Headache-related educational information
    # ---------------------------------------------

    if "headache" in symptom_set:

        matching = ["headache"]

        if "nausea" in symptom_set:
            matching.append("nausea")

        if "dizziness" in symptom_set:
            matching.append("dizziness")

        conditions.append({
            "id": "condition-headache-pattern",
            "name": "Headache-related conditions",
            "overlap": "Moderate",
            "overlapPercentage": min(
                100,
                len(matching) * 25
            ),
            "matchingSymptoms": matching,
            "description": (
                "Headache can occur with several different "
                "conditions and everyday factors. Additional "
                "context is required to understand the cause."
            ),
            "generalGuidance": (
                "Monitor the pattern, duration, severity, "
                "and associated symptoms."
            ),
            "consultationUrgency": "routine",
        })

    # ---------------------------------------------
    # Common respiratory symptom pattern
    # ---------------------------------------------

    respiratory_symptoms = {
        "cough",
        "sore throat",
        "runny nose",
        "nasal congestion",
        "sneezing",
    }

    respiratory_matches = sorted(
        symptom_set.intersection(respiratory_symptoms)
    )

    if respiratory_matches:

        conditions.append({
            "id": "condition-respiratory-pattern",
            "name": "Respiratory symptom pattern",
            "overlap": (
                "High"
                if len(respiratory_matches) >= 3
                else "Moderate"
            ),
            "overlapPercentage": min(
                100,
                len(respiratory_matches) * 25
            ),
            "matchingSymptoms": respiratory_matches,
            "description": (
                "The reported symptoms form a respiratory "
                "symptom pattern that can have several possible "
                "causes."
            ),
            "generalGuidance": (
                "Monitor symptom progression and associated "
                "symptoms."
            ),
            "consultationUrgency": "routine",
        })

    return conditions


# -------------------------------------------------
# Root Endpoint
# -------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "MediQuery NLP API is running",
        "status": "success",
    }


# -------------------------------------------------
# Health Check
# -------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "MediQuery NLP Backend",
    }


# -------------------------------------------------
# Main NLP Analysis Endpoint
# -------------------------------------------------

@app.post("/api/analyze")
def analyze_symptoms(
    request: AnalyzeRequest
) -> Dict[str, Any]:

    start_time = datetime.now()

    text = request.text.strip()

    if not text:
        return {
            "success": False,
            "message": "Please provide a symptom description.",
        }

    # ---------------------------------------------
    # Stage 1 — NER
    # ---------------------------------------------

    entities = extract_entities(text)

    # ---------------------------------------------
    # Stage 2 — Negation Detection
    # ---------------------------------------------

    entities = detect_negations(
        text,
        entities
    )

    # ---------------------------------------------
    # Stage 3 — Normalization
    # ---------------------------------------------

    entities = normalize_entities(entities)

    # ---------------------------------------------
    # Stage 4 — Information Extraction
    # ---------------------------------------------

    extracted_information = extract_information(
        entities
    )

    # ---------------------------------------------
    # Confirmed and negated symptoms
    # ---------------------------------------------

    confirmed_symptoms = []
    negated_symptoms = []

    for entity in entities:

        if entity.get("type") != "SYMPTOM":
            continue

        normalized = entity.get(
            "normalized",
            entity.get("text", "")
        )

        if entity.get("negated", False):

            if normalized not in negated_symptoms:
                negated_symptoms.append(normalized)

        else:

            if normalized not in confirmed_symptoms:
                confirmed_symptoms.append(normalized)

    # ---------------------------------------------
    # Replace symptoms with normalized symptoms
    # ---------------------------------------------

    extracted_information["symptoms"] = confirmed_symptoms
    extracted_information["negated_symptoms"] = negated_symptoms

    # ---------------------------------------------
    # Missing information
    # ---------------------------------------------

    missing_information = calculate_missing_information(
        extracted_information
    )

    # ---------------------------------------------
    # Follow-up questions
    # ---------------------------------------------

    follow_up_questions = generate_follow_up_questions(
        missing_information
    )

    # ---------------------------------------------
    # Risk assessment
    # ---------------------------------------------

    risk_assessment = calculate_risk(
        extracted_information
    )

    # ---------------------------------------------
    # Related conditions / symptom overlap
    # ---------------------------------------------

    related_conditions = generate_related_conditions(
        confirmed_symptoms
    )

    # ---------------------------------------------
    # General guidance
    # ---------------------------------------------

    guidance = generate_guidance(
        risk_assessment
    )

    # ---------------------------------------------
    # Convert entities to React format
    # ---------------------------------------------

    frontend_entities = convert_entities(
        entities
    )

    # ---------------------------------------------
    # NLP processing trace
    # ---------------------------------------------

    end_time = datetime.now()

    total_latency_ms = int(
        (end_time - start_time).total_seconds() * 1000
    )

    nlp_trace = {
        "rawInput": text,
        "preprocessedText": text.lower().strip(),
        "tokens": text.split(),
        "lemmas": [],
        "removedStopwords": [],
        "entitiesDetected": frontend_entities,
        "extractedAttributes": extracted_information,
        "followUpResponses": {},
        "retrievedRules": [
            "medical_vocabulary_ner",
            "negation_detection",
            "symptom_normalization",
            "rule_based_information_extraction",
        ],
        "pipelineStages": [
            {
                "stage": "Named Entity Recognition",
                "description": "Identified medical entities from the symptom description.",
                "durationMs": 0,
            },
            {
                "stage": "Negation Detection",
                "description": "Checked whether extracted entities were explicitly negated.",
                "durationMs": 0,
            },
            {
                "stage": "Symptom Normalization",
                "description": "Mapped symptom phrases to standardized symptom concepts.",
                "durationMs": 0,
            },
            {
                "stage": "Information Extraction",
                "description": "Converted extracted entities into structured medical information.",
                "durationMs": 0,
            },
        ],
        "totalLatencyMs": total_latency_ms,
    }

    # ---------------------------------------------
    # Final SymptomAnalysisResult-compatible object
    # ---------------------------------------------

    return {
        "id": f"analysis-{int(datetime.now().timestamp() * 1000)}",
        "timestamp": datetime.now().isoformat(),
        "inputText": text,

        "entities": frontend_entities,

        "extractedInformation": {
            "symptoms": confirmed_symptoms,
            "severity": extracted_information.get(
                "severity"
            ) or "",
            "duration": extracted_information.get(
                "duration"
            ) or "",
            "frequency": ", ".join(
                extracted_information.get(
                    "frequency", []
                )
            ),
            "triggers": extracted_information.get(
                "triggers", []
            ),
            "bodyParts": extracted_information.get(
                "body_parts", []
            ),
            "medications": extracted_information.get(
                "medications", []
            ),
            "associatedSymptoms": [],
            "missingInformation": missing_information,
        },

        "missingInformation": missing_information,

        "followUpQuestions": follow_up_questions,

        "followUpAnswers": {},

        "riskAssessment": risk_assessment,

        "relatedConditions": related_conditions,

        "guidance": guidance,

        "nlpTrace": nlp_trace,
    }