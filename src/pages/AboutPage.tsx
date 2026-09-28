import React from 'react';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import {
  GraduationCap,
  Cpu,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Server,
  ArrowRight,
  Database,
  FileCheck,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div id="about-page" className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Universal Mandatory Safety Banner */}
      <MedicalDisclaimer />

      {/* Header */}
      <div className="space-y-3 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Clinical Decision-Support &amp; Health Information Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About MediQuery & System Architecture
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          An intelligent Medical Symptom Checker and Health Information Assistant designed for clinical information extraction, conversational slot filling, and rule-based risk triage.
        </p>
      </div>

      {/* Section 1: Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            Problem Statement
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            When patients research health concerns online, they frequently describe symptoms using conversational, ambiguous natural language rather than standardized clinical terminology (SNOMED-CT / ICD-10). Generic keyword search tools often generate unwarranted anxiety or present severe misdiagnoses. There is a need for transparent, explainable decision-support systems that extract structured entities, clarify missing clinical context, and communicate risk ethically.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Core System Objectives
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Implement Named Entity Recognition (NER) to isolate symptoms, severity, duration, and anatomical sites.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Perform clinical information extraction and slot-filling for missing diagnostic context.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Generate dynamic follow-up questions to refine educational retrieval.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Enforce rule-based safety triage for emergency red-flag symptoms.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Section 2: Visual Pipeline Architecture Diagram */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-teal-400 uppercase tracking-wider">
            Pipeline Architecture
          </span>
          <h3 className="text-xl font-bold">MediQuery Analysis Computational Sequence</h3>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="text-[10px] font-mono text-teal-400 font-bold">STAGE 1</div>
            <div className="text-xs font-bold">Text Preprocessing</div>
            <p className="text-[11px] text-slate-400">
              Noise stripping, punctuation filtering, lowercasing & stopword removal.
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="text-[10px] font-mono text-teal-400 font-bold">STAGE 2</div>
            <div className="text-xs font-bold">Clinical NER Spans</div>
            <p className="text-[11px] text-slate-400">
              Extraction of Symptoms, Duration, Severity, Triggers, & Anatomy tags.
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="text-[10px] font-mono text-teal-400 font-bold">STAGE 3</div>
            <div className="text-xs font-bold">Slot Filling & QA</div>
            <p className="text-[11px] text-slate-400">
              Identification of missing clinical fields and conversational follow-ups.
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="text-[10px] font-mono text-teal-400 font-bold">STAGE 4</div>
            <div className="text-xs font-bold">Safety Red Flags</div>
            <p className="text-[11px] text-slate-400">
              Evaluation against life-threatening red-flag indicators (triage triage).
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="text-[10px] font-mono text-teal-400 font-bold">STAGE 5</div>
            <div className="text-xs font-bold">Knowledge Retrieval</div>
            <p className="text-[11px] text-slate-400">
              Educational condition indexing, symptom overlap scoring & care guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Technology Stack */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-600" />
          <span>Technology Stack & Modular Architecture</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>Current Frontend Client (Web)</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <li>&bull; <strong>Framework:</strong> React 19 + TypeScript + Vite</li>
              <li>&bull; <strong>Styling:</strong> Tailwind CSS v4 & Lucide Icons</li>
              <li>&bull; <strong>Voice Input:</strong> Web Speech Recognition API</li>
              <li>&bull; <strong>State & Storage:</strong> Local-first client persistence</li>
              <li>&bull; <strong>Service Layer:</strong> Pluggable API abstraction (<code className="text-[11px]">nlpService.ts</code>)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Server className="w-4 h-4 text-blue-600" />
              <span>Target Python Backend Architecture</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <li>&bull; <strong>API Server:</strong> Python 3.11 + FastAPI + Pydantic</li>
              <li>&bull; <strong>Clinical AI Models:</strong> spaCy (en_core_med7_lg) / BioBERT</li>
              <li>&bull; <strong>Deep Learning:</strong> PyTorch & HuggingFace Transformers</li>
              <li>&bull; <strong>Entity Taxonomies:</strong> UMLS, SNOMED-CT, MedDRA</li>
              <li>&bull; <strong>Interoperability:</strong> Standardized REST endpoints (<code className="text-[11px]">/api/analyze</code>)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 4: Scope, Limitations & Ethical Considerations */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>Scope, Limitations & Ethical Considerations</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            <strong>Educational Scope:</strong> This prototype is engineered to demonstrate applied computational linguistics within healthcare informatics. It is designed to assist users in structuring their health thoughts before speaking with a doctor.
          </p>
          <p>
            <strong>Intentional Diagnostic Constraints:</strong> MediQuery strictly rejects making diagnostic assertions (such as "You have Appendicitis"). Instead, it presents "Possible Related Conditions" with transparent symptom overlap indicators, making it clear that symptoms overlap across diverse pathologies and require clinical tests (laboratory analysis, blood work, radiology, and physical examination) for diagnosis.
          </p>
          <p>
            <strong>Privacy-by-Design:</strong> In alignment with healthcare privacy ethics, personal names and identifiers are expunged during the tokenization stage, and all records remain strictly client-side unless explicitly exported.
          </p>
        </div>
      </div>
    </div>
  );
};
