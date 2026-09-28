import React from 'react';
import { BookOpen, CheckCircle2, Cpu, HelpCircle, Sparkles, X, Terminal, ShieldAlert } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
  onSelectTestPrompt?: (prompt: string) => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose, onSelectTestPrompt }) => {
  const vivaTalkingPoints = [
    {
      concept: 'Named Entity Recognition (NER)',
      description: 'Demonstrates extraction of clinical entities across 11 classes (SYMPTOM, SEVERITY, DURATION, TRIGGER, BODY_PART, etc.) with exact character offsets and span highlighting.',
    },
    {
      concept: 'Information Extraction (Slot Filling)',
      description: 'Transforms unstructured free-form text into structured clinical attributes, isolating missing context slots (e.g., absence of fever or pain location).',
    },
    {
      concept: 'Contextual Question Answering (QA)',
      description: 'Generates targeted clinical follow-up questions when necessary attributes are missing, dynamically refining the triage evaluation.',
    },
    {
      concept: 'Rule-Based Risk & Safety Triage',
      description: 'Evaluates red-flag safety criteria (dyspnea, chest pain, stroke, syncope) to prioritize immediate clinical escalation over algorithmic condition matching.',
    },
    {
      concept: 'Explainability & Transparency',
      description: 'Provides complete diagnostic tracing (tokens, lemmas, removed stopwords, latency, and rule activations) in the collapsible technical console.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                MediQuery User &amp; System Guide
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Clinical Decision-Support &amp; Health Information Architecture
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Welcome to <strong>MediQuery</strong>. This application is structured to showcase intelligent symptom analysis, contextual follow-up clarification, and evidence-grounded health information.
        </p>

        {/* Viva Points Checklist */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            Core System Capabilities:
          </h4>
          <div className="space-y-2">
            {vivaTalkingPoints.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 space-y-1 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{item.concept}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo scenarios */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Recommended Test Prompts:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="font-bold block text-teal-900 dark:text-teal-200 mb-1">Standard Multi-Entity:</span>
              <p className="text-slate-700 dark:text-slate-300 italic mb-2">
                "I have severe stomach pain for three days and feel nauseous after eating."
              </p>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">Tests: SYMPTOM + SEVERITY + DURATION + TRIGGER</span>
            </div>

            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <span className="font-bold block text-rose-900 dark:text-rose-200 mb-1">Emergency Red-Flag Test:</span>
              <p className="text-slate-700 dark:text-slate-300 italic mb-2">
                "I suddenly have severe difficulty breathing."
              </p>
              <span className="text-[10px] text-rose-700 dark:text-rose-400 font-mono">Tests: Safety bypass & emergency triage alert</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Reminder */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-xs text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Safety &amp; Scope:</strong> MediQuery acts strictly as a decision-support and educational indexing tool, purposely phrasing outputs as "Possible Related Conditions" rather than autonomous diagnostic claims.
          </span>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Got it, return to app
          </button>
        </div>
      </div>
    </div>
  );
};
