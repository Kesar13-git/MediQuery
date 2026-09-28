import React, { useState } from 'react';
import { SymptomAnalysisResult } from '../types';
import { CheckCircle2, ChevronDown, ChevronUp, Code2, Cpu, FileJson, Layers, Sparkles, Terminal } from 'lucide-react';

interface ExplainabilityPanelProps {
  analysis: SymptomAnalysisResult;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ analysis }) => {
  const [showTechnicalPipeline, setShowTechnicalPipeline] = useState(false);
  const [activeTab, setActiveTab] = useState<'tokens' | 'entities' | 'stages' | 'raw_json'>('stages');

  const { nlpTrace, extractedInformation, followUpAnswers } = analysis;

  return (
    <div id="explainability-section" className="space-y-4">
      {/* High Level Flowcard */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Why Did MediQuery Flag This? (Explainable Clinical Logic)
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          In clinical decision-support systems, transparency is critical. Below is the step-by-step reasoning trace from your unstructured description to structured educational guidance:
        </p>

        {/* Step-by-step reasoning chain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-lg bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40 space-y-2">
            <div className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
              1. Detected Symptoms
            </div>
            <div className="space-y-1">
              {extractedInformation.symptoms.length > 0 ? (
                extractedInformation.symptoms.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic">None isolated</div>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
            <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
              2. Extracted Context
            </div>
            <div className="space-y-1 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Severity: {extractedInformation.severity}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Duration: {extractedInformation.duration}</span>
              </div>
              {extractedInformation.triggers.length > 0 && (
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Triggers: {extractedInformation.triggers.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 space-y-2">
            <div className="text-[11px] font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
              3. Knowledge Matched
            </div>
            <div className="space-y-1 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>{analysis.relatedConditions.length} Candidate Conditions</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Emergency Rule: {analysis.riskAssessment.level.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
            <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              4. Guidance Synthesis
            </div>
            <div className="space-y-1 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Triage Protocol: {analysis.riskAssessment.title}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Monitoring Plan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-lg text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
          <span>These clinical findings and rule evaluations were used to retrieve relevant health information without subjective diagnosis.</span>
          <span className="font-mono text-[11px] text-teal-700 dark:text-teal-300 shrink-0 ml-2">Latency: {nlpTrace.totalLatencyMs}ms</span>
        </div>

        {/* Collapsible Button */}
        <button
          type="button"
          id="toggle-technical-nlp-trace-btn"
          onClick={() => setShowTechnicalPipeline(!showTechnicalPipeline)}
          className="w-full py-2.5 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>View Technical Processing &amp; Pipeline Inspection</span>
          </div>
          {showTechnicalPipeline ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Technical Pipeline Modal / Collapsible */}
      {showTechnicalPipeline && (
        <div id="technical-nlp-details" className="p-5 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-xl space-y-4 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal-400" />
              <h4 className="text-sm font-bold text-white tracking-wide">
                Technical Diagnostic Console &amp; Pipeline Inspector
              </h4>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('stages')}
                className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'stages' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                Pipeline Stages
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tokens')}
                className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'tokens' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                Tokens & Lemmas
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('entities')}
                className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'entities' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                NER Spans ({analysis.entities.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('raw_json')}
                className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'raw_json' ? 'bg-teal-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                FastAPI JSON
              </button>
            </div>
          </div>

          {/* Tab 1: Stages */}
          {activeTab === 'stages' && (
            <div className="space-y-2.5 text-xs">
              {nlpTrace.pipelineStages.map((stg, i) => (
                <div key={i} className="p-3 bg-slate-800/70 rounded-lg border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-teal-300 font-mono text-xs mb-0.5">
                      Stage {i + 1}: {stg.stage}
                    </div>
                    <div className="text-slate-400 text-[11px]">{stg.description}</div>
                  </div>
                  <span className="font-mono text-emerald-400 text-xs px-2 py-0.5 bg-slate-900 rounded border border-slate-800">
                    {stg.durationMs}ms
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Tokens */}
          {activeTab === 'tokens' && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-slate-400 mb-1 font-mono text-[11px] uppercase tracking-wider">Raw Input Text:</div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-slate-300 font-mono text-xs">
                  "{nlpTrace.rawInput}"
                </div>
              </div>

              <div>
                <div className="text-slate-400 mb-1 font-mono text-[11px] uppercase tracking-wider">Filtered Content Tokens:</div>
                <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-950 rounded border border-slate-800">
                  {nlpTrace.tokens.map((tok, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-800 text-teal-300 rounded font-mono text-xs">
                      {tok}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-slate-400 mb-1 font-mono text-[11px] uppercase tracking-wider">Lemmatized Roots:</div>
                <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-950 rounded border border-slate-800">
                  {nlpTrace.lemmas.map((lem, i) => (
                    <span key={i} className="px-2 py-0.5 bg-indigo-950/80 text-indigo-300 rounded font-mono text-xs border border-indigo-900">
                      {lem}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-slate-400 mb-1 font-mono text-[11px] uppercase tracking-wider">Identified Stopwords Removed:</div>
                <div className="flex flex-wrap gap-1 p-2 bg-slate-950/60 rounded text-[11px] text-slate-500 font-mono">
                  {nlpTrace.removedStopwords.map((sw, i) => (
                    <span key={i} className="px-1.5 py-0.2 bg-slate-900 rounded">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: NER Spans */}
          {activeTab === 'entities' && (
            <div className="space-y-2 text-xs">
              {analysis.entities.map((ent) => (
                <div key={ent.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between font-mono">
                  <div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-900 text-teal-300 mr-2 uppercase">
                      {ent.type}
                    </span>
                    <span className="text-white font-semibold">"{ent.text}"</span>
                    <span className="text-slate-400 ml-2 text-[11px]">→ {ent.normalized || ent.text}</span>
                  </div>
                  <div className="text-right text-slate-400 text-[11px]">
                    span: [{ent.startIndex}, {ent.endIndex}] &bull; conf: {(ent.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Raw JSON */}
          {activeTab === 'raw_json' && (
            <div className="relative">
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-teal-300 overflow-x-auto max-h-72 leading-relaxed">
                {JSON.stringify(
                  {
                    input_text: analysis.inputText,
                    entities: analysis.entities.map((e) => ({
                      text: e.text,
                      type: e.type,
                      startIndex: e.startIndex,
                      endIndex: e.endIndex,
                      confidence: e.confidence,
                      normalized: e.normalized,
                    })),
                    extracted_information: analysis.extractedInformation,
                    missing_information: analysis.missingInformation,
                    follow_up_answers: analysis.followUpAnswers,
                    risk_assessment: {
                      level: analysis.riskAssessment.level,
                      title: analysis.riskAssessment.title,
                      is_urgent: analysis.riskAssessment.isUrgentFlag,
                    },
                    related_conditions: analysis.relatedConditions.map((c) => ({
                      name: c.name,
                      overlap: c.overlap,
                      overlap_percentage: c.overlapPercentage,
                      matching_symptoms: c.matchingSymptoms,
                    })),
                    latency_ms: analysis.nlpTrace.totalLatencyMs,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
