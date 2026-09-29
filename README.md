# MediQuery 🩺

## AI-Assisted Medical Symptom Checker using Natural Language Processing

MediQuery is an NLP-based medical symptom analysis and health guidance system that allows users to describe their symptoms naturally instead of selecting symptoms from predefined lists.

The system processes natural-language symptom descriptions through a modular Natural Language Processing (NLP) pipeline. It identifies medical entities, detects negated symptoms, normalizes different symptom expressions, extracts structured information, identifies missing context, generates follow-up questions, and provides basic rule-based educational guidance.

> ⚠️ **Medical Disclaimer:** MediQuery is an academic and educational decision-support project. It is not a medical diagnostic system and does not replace a qualified healthcare professional, medical examination, diagnosis, treatment, or emergency medical care.

---

## 🌐 Live Demo

### Frontend
**MediQuery Web Application:**  
https://mediquery-1-ykur.onrender.com/

### Backend API
**MediQuery FastAPI Backend:**  
https://mediquery-ns5k.onrender.com/

### Interactive API Documentation
**Swagger UI:**  
https://mediquery-ns5k.onrender.com/docs

### GitHub Repository
https://github.com/Kesar13-git/MediQuery

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Objectives](#-objectives)
- [Key Features](#-key-features)
- [NLP Techniques](#-nlp-techniques-used)
- [NLP Processing Pipeline](#-nlp-processing-pipeline)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [How the System Works](#-how-the-system-works)
- [Example](#-example)
- [API](#-api)
- [Installation and Local Setup](#-installation-and-local-setup)
- [Testing](#-testing)
- [Why No Training Dataset Is Required](#-why-no-training-dataset-is-required)
- [Results](#-results)
- [Limitations](#-limitations)
- [Future Scope](#-future-scope)
- [Project Information](#-project-information)
- [References](#-references)
- [Links](#-links)

---

# 🔎 Project Overview

Medical symptoms are commonly described using natural language, and different users may use different expressions for the same symptom.

For example:

- "I have a headache."
- "I have head pain."
- "The pain is in my head."
- "My head hurts."

A traditional symptom checker may require users to select symptoms manually from predefined options. MediQuery instead allows users to describe their symptoms using natural language.

The system processes the input and converts the unstructured text into structured medical information.

### Example

**User Input:**

> I have severe headache and fever since yesterday.

**MediQuery identifies:**

| Information | Extracted Value |
|---|---|
| Severity | Severe |
| Symptoms | Headache, Fever |
| Duration | Since yesterday |
| Frequency | Missing |
| Triggers | Missing |

The system can then ask follow-up questions to obtain additional context.

---

# ❗ Problem Statement

People often describe health symptoms in free-form natural language rather than using standardized medical terminology.

This creates several challenges:

- Different expressions can represent the same symptom.
- Important contextual information may be missing.
- Symptoms may be explicitly negated.
- Important information such as severity and duration may appear in different parts of a sentence.
- A simple keyword-matching system may misunderstand the user's actual statement.

Therefore, the project aims to develop an NLP-based system capable of processing natural-language symptom descriptions and converting them into structured information for educational health guidance.

---

# 🎯 Objectives

The main objectives of MediQuery are:

- Allow users to describe symptoms using natural language.
- Identify important medical entities from user input.
- Detect explicitly negated symptoms.
- Normalize different expressions of the same symptom.
- Extract structured medical information from unstructured text.
- Identify missing contextual information.
- Generate relevant follow-up questions.
- Provide basic rule-based educational guidance.
- Demonstrate practical applications of Natural Language Processing.
- Provide an explainable NLP processing pipeline.

---

# ✨ Key Features

### 🩺 Natural-Language Symptom Input

Users can describe their symptoms in their own words instead of selecting predefined symptoms.

### 🔍 Named Entity Recognition

Identifies important entities such as symptoms, severity, duration, triggers, medications, and body parts.

### 🚫 Negation Detection

Determines whether a symptom is present or explicitly denied.

### 🔄 Symptom Normalization

Maps different expressions to a standardized symptom representation.

### 📋 Information Extraction

Converts unstructured symptom descriptions into structured information.

### ❓ Follow-up Questions

Identifies missing information and generates contextual follow-up questions.

### ⚠️ Rule-Based Risk Assessment

Provides a basic educational risk assessment based on extracted information.

### 📚 General Guidance

Provides general self-care, monitoring information, questions to discuss with a doctor, and situations where professional medical advice may be appropriate.

### 🔬 Explainable NLP Trace

Displays the processing stages used by the NLP pipeline, making the system easier to understand and demonstrate academically.

### 🌐 Full-Stack Deployment

The React frontend and Python FastAPI backend are deployed separately and communicate through a REST API.

---

# 🧠 NLP Techniques Used

## 1. Named Entity Recognition (NER)

Named Entity Recognition identifies important entities from the user's symptom description.

MediQuery identifies categories including:

- `SYMPTOM`
- `SEVERITY`
- `DURATION`
- `FREQUENCY`
- `BODY_PART`
- `MEDICATION`
- `DISEASE`
- `TRIGGER`

### Example

Input:

> I have severe headache since yesterday.

Output:

```text
severe → SEVERITY
headache → SYMPTOM
since yesterday → DURATION
````

---

## 2. Negation Detection

Negation detection determines whether an extracted symptom is explicitly denied.

### Example

Input:

> I have a headache but I do not have fever.

The system identifies:

```text
headache → present
fever → negated
```

This prevents an explicitly denied symptom from being incorrectly treated as an active symptom.

---

## 3. Symptom Normalization

Users may describe the same symptom using different expressions.

MediQuery maps common variations to standardized concepts.

| User Expression | Normalized Symptom |
| --------------- | ------------------ |
| head pain       | headache           |
| pain in my head | headache           |
| throwing up     | vomiting           |
| stomach ache    | abdominal pain     |
| feeling dizzy   | dizziness          |

### Example

```text
"I have head pain and I am throwing up."

        ↓

head pain → headache
throwing up → vomiting
```

---

## 4. Information Extraction

The identified entities are converted into structured medical information.

The system extracts information such as:

* Symptoms
* Severity
* Duration
* Frequency
* Triggers
* Body parts
* Medications
* Associated symptoms
* Conditions

### Example

```text
Input:
"I have severe headache and fever since yesterday."

Output:

Symptoms:
- headache
- fever

Severity:
- severe

Duration:
- since yesterday
```

---

## 5. Missing Information Detection

The system checks whether useful contextual information is missing.

For example:

```text
Input:
"I have severe headache and fever since yesterday."

Detected:
- Symptoms
- Severity
- Duration

Missing:
- Frequency
- Triggers
```

---

## 6. Follow-up Question Generation

When important information is missing, MediQuery generates follow-up questions.

Example:

```text
How frequently do the symptoms occur?

Have you noticed anything that triggers or worsens
the symptoms?
```

The follow-up questions can include predefined options to make it easier for users to provide additional information.

---

## 7. Rule-Based Risk Assessment

MediQuery uses predefined rules to generate a basic educational risk assessment based on extracted information.

The assessment is intended to help organize the user's reported information and provide general guidance.

It is **not a clinical prediction model, medical diagnosis, or emergency triage system**.

---

# 🔄 NLP Processing Pipeline

The main processing pipeline is:

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
Structured Results
          ↓
General Educational Guidance
```

---

# 🏗️ System Architecture

```text
┌──────────────────┐
│       User       │
│ Symptom Text     │
└────────┬─────────┘
         │
         ↓
┌─────────────────────────┐
│    React Frontend       │
│      MediQuery          │
└──────────┬──────────────┘
           │ REST API
           ↓
┌─────────────────────────┐
│    FastAPI Backend      │
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│      NLP Pipeline       │
│                         │
│ • NER                   │
│ • Negation Detection    │
│ • Normalization         │
│ • Information Extraction│
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│    Structured Results   │
│                         │
│ • Symptoms              │
│ • Context               │
│ • Follow-up Questions   │
│ • Risk Assessment       │
│ • General Guidance      │
└─────────────────────────┘
```

---

# 🔁 Complete System Flow

```text
User enters symptom description
             ↓
React frontend receives input
             ↓
Frontend sends POST request
             ↓
FastAPI backend receives text
             ↓
NLP processing begins
             ↓
NER identifies entities
             ↓
Negation detection checks presence/absence
             ↓
Normalization standardizes symptom expressions
             ↓
Information extraction creates structured data
             ↓
Missing information is identified
             ↓
Follow-up questions are generated
             ↓
Rule-based analysis is performed
             ↓
Structured response returned through API
             ↓
React frontend displays results
```

---

# 💻 Technology Stack

## Frontend

* **React** — User interface
* **TypeScript** — Type-safe frontend development
* **HTML** — Application structure
* **CSS / Tailwind CSS** — Styling and responsive interface
* **Vite** — Frontend development and build tool

## Backend

* **Python** — Backend and NLP implementation
* **FastAPI** — REST API framework
* **Uvicorn** — ASGI server
* **Pydantic** — Request and response validation

## NLP

* **spaCy** — Natural Language Processing framework
* Custom medical vocabulary
* Custom NLP rules
* Named Entity Recognition
* Negation Detection
* Symptom Normalization
* Information Extraction
* Rule-Based Processing

## Version Control

* **Git**
* **GitHub**

## Deployment

* **Render**

  * React frontend → Render Static Site
  * FastAPI backend → Render Web Service

---

# 📂 Project Structure

```text
MediQuery/
│
├── backend/
│   │
│   ├── app/
│   │   ├── nlp/
│   │   │   ├── __init__.py
│   │   │   ├── ner.py
│   │   │   ├── negation.py
│   │   │   ├── normalization.py
│   │   │   └── information_extraction.py
│   │   │
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── data/
│   └── types.ts
│
├── public/
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# ⚙️ How the System Works

## Step 1 — User Input

The user enters a free-form symptom description.

Example:

```text
I have severe headache and fever since yesterday.
```

---

## Step 2 — Backend Request

The React frontend sends the input to:

```text
POST /api/analyze
```

with:

```json
{
  "text": "I have severe headache and fever since yesterday."
}
```

---

## Step 3 — Named Entity Recognition

The backend identifies important phrases.

```text
severe → SEVERITY
headache → SYMPTOM
fever → SYMPTOM
since yesterday → DURATION
```

---

## Step 4 — Negation Detection

The system checks whether identified symptoms are explicitly negated.

Example:

```text
"I do not have fever but I have severe headache."

fever → negated
headache → present
```

---

## Step 5 — Normalization

Different expressions are mapped to common representations.

```text
head pain → headache
throwing up → vomiting
stomach ache → abdominal pain
feeling dizzy → dizziness
```

---

## Step 6 — Information Extraction

The entities are organized into structured information.

```json
{
  "symptoms": [
    "headache",
    "fever"
  ],
  "severity": "severe",
  "duration": "since yesterday"
}
```

---

## Step 7 — Missing Information

The backend identifies information that could improve the analysis.

Example:

```text
Missing:
- frequency
- triggers
```

---

## Step 8 — Follow-up Questions

The system generates questions based on missing information.

Example:

```text
How frequently do the symptoms occur?

Have you noticed anything that triggers or worsens
the symptoms?
```

---

## Step 9 — Rule-Based Analysis

The extracted information is processed using predefined rules to produce an educational assessment and general guidance.

---

## Step 10 — Results

The structured response is sent back to the React frontend and displayed to the user.

---

# 🧪 Example

## Example 1 — Basic Symptom Analysis

### Input

```text
I have severe headache and fever since yesterday.
```

### Detected Entities

```text
severe → SEVERITY
headache → SYMPTOM
fever → SYMPTOM
since yesterday → DURATION
```

### Extracted Information

```text
Symptoms:
- headache
- fever

Severity:
- severe

Duration:
- since yesterday
```

### Missing Information

```text
- frequency
- triggers
```

### Follow-up Questions

```text
How frequently do the symptoms occur?

Have you noticed anything that triggers or worsens
the symptoms?
```

---

# 🧪 Example 2 — Symptom Normalization

### Input

```text
I have head pain and I am throwing up.
```

### NLP Processing

```text
head pain
     ↓
headache

throwing up
     ↓
vomiting
```

### Normalized Output

```text
Symptoms:
- headache
- vomiting
```

---

# 🧪 Example 3 — Negation Detection

### Input

```text
I have a severe headache, but I do not have fever or cough.
```

### Expected Interpretation

```text
severe → SEVERITY
headache → SYMPTOM → present
fever → SYMPTOM → negated
cough → SYMPTOM → negated
```

Negation detection prevents fever and cough from being incorrectly treated as active symptoms.

---

# 🔌 API

## Analyze Symptoms

### Endpoint

```text
POST /api/analyze
```

### Request Body

```json
{
  "text": "I have severe headache and fever since yesterday"
}
```

### Response

The API returns information including:

* Analysis ID
* Input text
* Detected entities
* Entity types
* Confidence values
* Normalized symptoms
* Negation status
* Extracted information
* Missing information
* Follow-up questions
* Follow-up answers
* Risk assessment
* Related symptom patterns
* General guidance
* NLP processing trace

---

## Available Endpoints

### Root

```text
GET /
```

Returns the API status.

### Health Check

```text
GET /api/health
```

Used to check whether the backend service is running.

### Analyze Symptoms

```text
POST /api/analyze
```

Processes a natural-language symptom description.

---

# 📖 API Documentation

Interactive Swagger documentation is available at:

[https://mediquery-ns5k.onrender.com/docs](https://mediquery-ns5k.onrender.com/docs)

The Swagger interface can be used to test the API without requiring the frontend.

---

# 🛠️ Installation and Local Setup

## Prerequisites

Install the following:

* Node.js
* Python 3.12
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Kesar13-git/MediQuery.git
```

Navigate into the project:

```bash
cd MediQuery
```

---

## 2. Install Frontend Dependencies

```bash
npm install
```

---

## 3. Configure Frontend Environment

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

For deployment, the environment variable points to the deployed backend.

---

## 4. Set Up the Backend

Navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
py -3.12 -m venv venv
```

### Windows PowerShell

Activate the environment:

```powershell
.\venv\Scripts\Activate.ps1
```

---

## 5. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

Install the spaCy English model:

```bash
python -m spacy download en_core_web_sm
```

---

## 6. Start the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## 7. Start the Frontend

Open a new terminal and return to the project root:

```bash
cd ..
```

Start the Vite development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 🧪 Testing

MediQuery was tested using different types of symptom descriptions.

## NER Testing

### Test Input

```text
I have severe headache and fever since yesterday
```

### Expected Entities

```text
severe → SEVERITY
headache → SYMPTOM
fever → SYMPTOM
since yesterday → DURATION
```

---

## Normalization Testing

Examples tested include:

```text
head pain → headache
pain in my head → headache
throwing up → vomiting
stomach ache → abdominal pain
feeling dizzy → dizziness
```

---

## Negation Testing

### Test Input

```text
I do not have fever but I have severe headache
```

### Result

```text
fever → negated
severe → SEVERITY
headache → SYMPTOM
```

---

## Deployment Testing

The deployed backend was tested through the FastAPI Swagger interface.

The `/api/analyze` endpoint successfully returned a successful response for:

```text
I have severe headache and fever since yesterday
```

The response included:

* NER results
* Extracted symptoms
* Severity
* Duration
* Missing information
* Follow-up questions
* Risk assessment
* Related conditions
* General guidance
* NLP processing trace

---

# 📊 Results

The implemented system successfully demonstrates a complete NLP-based symptom analysis workflow.

The current implementation is capable of:

* Processing natural-language symptom descriptions.
* Identifying important medical entities.
* Detecting explicitly negated symptoms.
* Normalizing common symptom expressions.
* Extracting structured information.
* Identifying missing contextual information.
* Generating follow-up questions.
* Producing rule-based educational guidance.
* Returning an explainable NLP processing trace.
* Providing the analysis through a REST API.
* Running as a deployed full-stack application.

The deployed backend was successfully tested through Swagger, and the deployed frontend communicates with the backend through the configured API URL.

---

# 📚 Why No Training Dataset Is Required

The current MediQuery implementation is a **modular NLP and rule-based system**, rather than a supervised machine-learning disease-classification model.

The system uses:

* spaCy NLP functionality
* Custom medical vocabulary
* Entity identification rules
* Negation rules
* Symptom normalization mappings
* Information extraction rules
* Missing-information rules
* Follow-up question rules
* Rule-based risk assessment

Because the current implementation does not train a supervised model on a labeled dataset, a conventional training and testing dataset is not required.

However, future versions can introduce a manually labeled evaluation dataset to quantitatively measure the performance of:

* NER
* Negation Detection
* Symptom Normalization
* Information Extraction

Metrics such as **Precision, Recall, and F1-score** can then be calculated.

---

# 🔐 Privacy and Security Considerations

MediQuery is an academic project and should not be used to store or process sensitive medical records in a production healthcare environment without appropriate security and compliance measures.

Future production versions should consider:

* Secure authentication
* Encryption
* Access control
* Secure database storage
* Data minimization
* Audit logging
* Privacy policies
* Appropriate healthcare data regulations

---

# ⚠️ Limitations

The current version has several limitations:

1. The system is not a medical diagnostic tool.
2. The system does not replace professional medical advice.
3. Rule-based NLP has limited coverage compared with large biomedical language models.
4. The implemented medical vocabulary does not cover every possible medical expression.
5. Risk assessment is educational and not clinical triage.
6. The current implementation does not use a supervised disease-classification model.
7. The system may not correctly interpret every complex or ambiguous medical statement.
8. The current system is primarily designed for English-language input.
9. A large manually labeled medical evaluation dataset has not yet been created.
10. Quantitative Precision, Recall, and F1-score evaluation has not yet been performed.

---

# 🔮 Future Scope

Future improvements can include:

### 1. Biomedical Transformer Models

Integration of models such as:

* BioBERT
* ClinicalBERT
* Other biomedical transformer models

could improve medical entity recognition and contextual understanding.

### 2. Medical Question Answering

A larger verified medical knowledge base could be integrated to improve question-answering capabilities.

### 3. Evaluation Dataset

A manually labeled dataset can be created to evaluate:

* NER
* Negation Detection
* Information Extraction
* Normalization

using Precision, Recall, and F1-score.

### 4. Multilingual Support

The system could be extended to support languages such as:

* Marathi
* Hindi
* Other Indian languages

### 5. Voice Input

Speech-to-text could allow users to describe symptoms verbally.

### 6. Improved Medical Knowledge Retrieval

Verified medical sources could be integrated to provide more comprehensive educational information.

### 7. Secure User Accounts

Authentication and secure storage could allow users to maintain their symptom history.

### 8. Improved NLP Models

Future versions could combine rule-based processing with machine-learning or transformer-based NLP models.

---

# 👥 Project Information

## Project Title

**MediQuery – AI-Assisted Medical Symptom Checker using Natural Language Processing**

## Degree

**Bachelor of Engineering – Computer Engineering**

## University

**University of Mumbai**

## College

**Universal College of Engineering, Kaman, Vasai – 401208**

## Academic Year

**2026–2027**

## Project Domain

**Natural Language Processing / Artificial Intelligence**

---

# 📚 References

1. Lee, J., Yoon, W., Kim, S., Kim, D., Kim, S., So, C. H., & Kang, J.
   **"BioBERT: a pre-trained biomedical language representation model for biomedical text mining."**
   *Bioinformatics*, Volume 36, Issue 4, 2020.

2. Huang, K., Altosaar, J., & Ranganath, R.
   **"ClinicalBERT: Modeling Clinical Notes and Predicting Hospital Readmission."**
   arXiv, 2019.
   [https://arxiv.org/abs/1904.05342](https://arxiv.org/abs/1904.05342)

3. Zhang, X., Wu, J., He, Z., Liu, X., & Su, Y.
   **"Medical Exam Question Answering with Large-Scale Reading Comprehension."**
   arXiv, 2018.
   [https://arxiv.org/abs/1802.10279](https://arxiv.org/abs/1802.10279)

4. Jin, D., Pan, E., Oufattole, N., Weng, W.-H., Fang, H., & Szolovits, P.
   **"What Disease Does This Patient Have? A Large-Scale Open Domain Question Answering Dataset from Medical Exams."**
   arXiv, 2020.
   [https://arxiv.org/abs/2009.13081](https://arxiv.org/abs/2009.13081)

5. Clinical Natural Language Processing: A Systematic Review of the Literature.
   2023.
   [https://pubmed.ncbi.nlm.nih.gov/37295138/](https://pubmed.ncbi.nlm.nih.gov/37295138/)

6. Deep Learning in Clinical Natural Language Processing: A Review.
   2020.
   [https://pubmed.ncbi.nlm.nih.gov/31794016/](https://pubmed.ncbi.nlm.nih.gov/31794016/)

7. Advancing the State of the Art in Clinical Natural Language Processing through Shared Tasks.
   2018.
   [https://pubmed.ncbi.nlm.nih.gov/30157522/](https://pubmed.ncbi.nlm.nih.gov/30157522/)

---

# 🔗 Important Links

| Resource             | Link                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------ |
| 🌐 Live MediQuery    | [https://mediquery-1-ykur.onrender.com/](https://mediquery-1-ykur.onrender.com/)     |
| ⚙️ Backend API       | [https://mediquery-ns5k.onrender.com/](https://mediquery-ns5k.onrender.com/)         |
| 📖 Swagger API Docs  | [https://mediquery-ns5k.onrender.com/docs](https://mediquery-ns5k.onrender.com/docs) |
| 💻 GitHub Repository | [https://github.com/Kesar13-git/MediQuery](https://github.com/Kesar13-git/MediQuery) |

---

# 👨‍💻 Development

MediQuery was developed as an academic NLP project demonstrating the integration of:

```text
React
   +
TypeScript
   +
FastAPI
   +
Python
   +
spaCy
   +
Custom NLP Rules
   +
REST API
   +
Render Deployment
```
