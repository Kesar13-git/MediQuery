# MediQuery 🩺

### AI-Assisted Medical Symptom Checker using Natural Language Processing

MediQuery is an NLP-based medical symptom analysis and health guidance system that allows users to describe their symptoms naturally instead of selecting predefined options.

The system processes the user's text using a modular NLP pipeline and extracts useful information such as symptoms, severity, duration, frequency, triggers, medications, and negated symptoms. It then generates follow-up questions, a basic rule-based risk assessment, related symptom patterns, and general educational guidance.

> ⚠️ **Disclaimer:** MediQuery is an educational and decision-support project. It is not a substitute for professional medical diagnosis, treatment, or emergency medical care.

---

## 🌐 Live Application

**Frontend:**  
https://mediquery-1-ykur.onrender.com/

**Backend API:**  
https://mediquery-ns5k.onrender.com/

**API Documentation:**  
https://mediquery-ns5k.onrender.com/docs

---

## 📌 Project Overview

Medical symptoms are often described using natural language, with different users using different expressions for the same symptom.

For example:

- "I have a headache"
- "I have head pain"
- "My head hurts"

A traditional form-based system may require users to select symptoms from predefined lists. MediQuery instead allows users to enter symptoms in natural language and processes the description using NLP techniques.

### Example

**Input:**

> "I have severe headache and fever since yesterday."

**MediQuery identifies:**

| Information | Extracted Value |
|---|---|
| Severity | Severe |
| Symptoms | Headache, Fever |
| Duration | Since yesterday |
| Frequency | Missing |
| Triggers | Missing |

The system can then generate follow-up questions to collect additional context.

---

## 🎯 Objectives

- Allow users to describe symptoms using natural language.
- Identify important medical entities from text.
- Detect explicitly negated symptoms.
- Normalize different expressions of the same symptom.
- Convert unstructured symptom descriptions into structured information.
- Identify missing contextual information.
- Generate relevant follow-up questions.
- Provide basic rule-based educational guidance.
- Demonstrate practical applications of Natural Language Processing.

---

## 🧠 NLP Techniques Used

### 1. Named Entity Recognition (NER)

NER identifies important entities from the user's symptom description.

MediQuery can identify categories such as:

- SYMPTOM
- SEVERITY
- DURATION
- FREQUENCY
- BODY_PART
- MEDICATION
- DISEASE
- TRIGGER

**Example:**

> "I have severe headache since yesterday."

- severe → SEVERITY
- headache → SYMPTOM
- since yesterday → DURATION

---

### 2. Negation Detection

The system determines whether a symptom is explicitly present or denied.

**Example:**

> "I have a headache but I do not have fever."

The system identifies:

- headache → present
- fever → negated

This prevents explicitly denied symptoms from being treated as active symptoms.

---

### 3. Symptom Normalization

Different expressions can refer to the same symptom.

MediQuery maps common variations to standardized concepts.

| User Expression | Normalized Symptom |
|---|---|
| head pain | headache |
| pain in my head | headache |
| throwing up | vomiting |
| stomach ache | abdominal pain |
| feeling dizzy | dizziness |

---

### 4. Information Extraction

The extracted entities are converted into structured information.

The system extracts information such as:

- Symptoms
- Severity
- Duration
- Frequency
- Triggers
- Body parts
- Medications
- Associated symptoms
- Conditions

---

### 5. Missing Information Detection

MediQuery checks which useful contextual information has not been provided.

For example, if a user enters:

> "I have severe headache and fever since yesterday."

The system may identify that **frequency** and **triggers** are still missing.

---

### 6. Follow-up Question Generation

Based on missing information, the system generates questions such as:

> "How frequently do the symptoms occur?"

and

> "Have you noticed anything that triggers or worsens the symptoms?"

---

### 7. Rule-Based Risk Assessment

The system uses predefined rules to provide a basic educational risk assessment.

It is **not a clinical prediction model or medical diagnosis system**.

---

## 🔄 NLP Processing Pipeline

```text
User Symptom Description
          ↓
      Preprocessing
          ↓
Named Entity Recognition
          ↓
   Negation Detection
          ↓
 Symptom Normalization
          ↓
 Information Extraction
          ↓
Missing Information Detection
          ↓
 Follow-up Questions
          ↓
Rule-Based Analysis
          ↓
Structured Results & Guidance
