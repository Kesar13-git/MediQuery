import React from 'react';
import { NavTab } from '../components/Navbar';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import { DEMO_PRESETS } from '../data/medicalKnowledge';
import {
  Sparkles,
  Stethoscope,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
  HelpCircle,
  FileSearch,
  CheckCircle2,
  GraduationCap,
  Activity,
  Layers,
} from 'lucide-react';

interface HomePageProps {
  onSelectTab: (tab: NavTab) => void;
  onQuickStartPrompt: (prompt: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab, onQuickStartPrompt }) => {
  return (
    <div id="home-page" className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* Universal Mandatory Safety Banner */}
      <MedicalDisclaimer />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-14 text-center space-y-6">
        {/* Health Assistant Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800/80 text-xs font-semibold text-teal-800 dark:text-teal-300 mx-auto">
          <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Clinical Decision-Support &amp; Health Information Assistant</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Medi<span className="text-teal-600 dark:text-teal-400">Query</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-700 dark:text-slate-200 font-bold mt-1">
              Intelligent Medical Symptom Checker
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Describe what you're experiencing in your own everyday words. MediQuery analyzes your symptoms to extract key health attributes and provide verified, structured guidance.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            id="hero-check-symptoms-btn"
            onClick={() => onSelectTab('checker')}
            className="px-6 py-3.5 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 hover:from-blue-950 hover:to-teal-800 text-white rounded-xl text-sm font-semibold shadow-lg shadow-teal-950/20 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Stethoscope className="w-4 h-4 text-teal-300" />
            <span>Check Symptoms Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="hero-explore-topics-btn"
            onClick={() => onSelectTab('knowledge')}
            className="px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Explore Health Topics</span>
          </button>
        </div>

        {/* Small Safety Note */}
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Educational decision-support project — not a substitute for professional medical care, clinical examination, or emergency diagnosis.
        </p>

        {/* Interactive Quick-Test Presets Bar */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 max-w-3xl mx-auto text-left space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Quick-Start Demonstration Scenarios (Click to test symptom analysis):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {DEMO_PRESETS.slice(0, 3).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onQuickStartPrompt(p.text);
                  onSelectTab('checker');
                }}
                className="p-2.5 text-left rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 flex items-center justify-between">
                  <span>{p.label}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  "{p.text}"
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights (Section 4) */}
      <section className="space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Core Analysis Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Engineered to process conversational health statements with high computational precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Intelligent Extraction */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-teal-500/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Intelligent Symptom Extraction
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Dissects unstructured narrative descriptions using clinical entity recognition to map symptoms, severity levels, duration, and triggers to normalized medical vocabulary.
            </p>
            <div className="text-[11px] text-teal-700 dark:text-teal-300 font-mono font-medium">
              Rule-Based Entity Matching &bull; Normalized Taxonomies
            </div>
          </div>

          {/* Card 2: Interactive Health QA */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Interactive Health QA & Follow-ups
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Detects missing clinical slots (e.g. fever presence, anatomical localization, duration) and dynamically initiates clarifying conversational follow-up questions.
            </p>
            <div className="text-[11px] text-blue-700 dark:text-blue-300 font-mono font-medium">
              Context-Aware Slot Filling &bull; Question Generation
            </div>
          </div>

          {/* Card 3: Explainable Results */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-500/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Explainable Clinical Reasoning
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides complete transparency through real-time entity spans, token inspection, and decision traces showing exactly why each condition topic was retrieved.
            </p>
            <div className="text-[11px] text-purple-700 dark:text-purple-300 font-mono font-medium">
              Transparent Entity Highlighting &bull; Structured JSON
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 Steps) */}
      <section className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How MediQuery Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            A step-by-step pipeline from natural language to educational health decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Describe Symptoms</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Type or dictate your symptoms naturally without needing formal medical terminology.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Extract Information</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The analysis engine identifies entities, standardizes synonyms, and extracts severity and duration.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Follow-Up QA</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Answer targeted multiple-choice or free-text questions to clarify missing diagnostic context.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              4
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Guidance & Triage</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Review symptom overlap indicators, self-care monitoring tips, and professional safety criteria.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Safety Assurance */}
      <section className="p-6 bg-teal-50/70 dark:bg-teal-950/30 rounded-2xl border border-teal-200/80 dark:border-teal-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Built on Ethical Clinical Decision-Support Principles</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
            MediQuery never makes definitive diagnostic claims or prescribes medication. Emergency red-flag symptoms immediately trigger prioritized safety alerts rather than speculative health matching.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectTab('about')}
          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-colors cursor-pointer"
        >
          View System Architecture
        </button>
      </section>
    </div>
  );
};
