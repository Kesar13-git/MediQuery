import React from 'react';
import { SymptomAnalysisResult } from '../types';
import { Download, Printer, X, ShieldAlert, CheckCircle2, HeartPulse, Activity } from 'lucide-react';

interface ReportModalProps {
  analysis: SymptomAnalysisResult;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ analysis, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `MediQuery-Report-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadText = () => {
    const textContent = `
=======================================================================
                      MEDIQUERY CLINICAL SUMMARY REPORT
              Medical Symptom Checker & Health Assistant
=======================================================================

Date of Analysis: ${new Date(analysis.timestamp).toLocaleString()}
Report Reference: ${analysis.id}

1. USER DESCRIPTION:
"${analysis.inputText}"

2. DETECTED MEDICAL ENTITIES (NER):
${analysis.entities.map((e) => ` - [${e.type}] ${e.text} (Confidence: ${(e.confidence * 100).toFixed(0)}%)`).join('\n')}

3. EXTRACTED CLINICAL ATTRIBUTES:
 - Main Symptoms: ${analysis.extractedInformation.symptoms.join(', ') || 'None'}
 - Severity: ${analysis.extractedInformation.severity}
 - Duration: ${analysis.extractedInformation.duration}
 - Frequency: ${analysis.extractedInformation.frequency}
 - Triggers: ${analysis.extractedInformation.triggers.join(', ') || 'None reported'}

4. CONTEXTUAL FOLLOW-UP RESPONSES:
${Object.entries(analysis.followUpAnswers).length > 0
  ? Object.entries(analysis.followUpAnswers).map(([k, v]) => ` - Question [${k}]: ${v}`).join('\n')
  : ' - None completed'}

5. TRIAGE & RISK ASSESSMENT:
 - Urgency Level: ${analysis.riskAssessment.level.toUpperCase()}
 - Assessment: ${analysis.riskAssessment.title}
 - Guidance: ${analysis.riskAssessment.recommendedAction}

6. POSSIBLE RELATED CONDITIONS (EDUCATIONAL OVERLAP):
${analysis.relatedConditions.map((c) => ` - ${c.name} [Overlap: ${c.overlap} (${c.overlapPercentage}%)]\n   Matching Symptoms: ${c.matchingSymptoms.join(', ')}`).join('\n\n')}

7. GENERAL GUIDANCE & RECOMMENDATIONS:
 - When to Seek Help:
${analysis.guidance.whenToSeekHelp.map((g) => `   * ${g}`).join('\n')}
 - What to Monitor:
${analysis.guidance.monitoring.map((m) => `   * ${m}`).join('\n')}

=======================================================================
IMPORTANT MEDICAL DISCLAIMER:
MediQuery is an educational Natural Language Processing decision-support
prototype. This report is NOT a clinical diagnosis and does NOT replace
a consultation with a qualified medical professional. If experiencing
severe pain or life-threatening symptoms, call emergency services immediately.
=======================================================================
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `MediQuery-Health-Summary-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-600 text-white rounded-lg">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                MediQuery Health Information Summary
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Educational report generated on {new Date(analysis.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="report-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <button
              type="button"
              id="report-download-btn"
              onClick={handleDownloadText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Scrollable Report Document */}
        <div id="printable-report" className="p-6 sm:p-8 space-y-6 overflow-y-auto text-slate-800 dark:text-slate-200 font-sans">
          {/* Institutional Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Medi<span className="text-teal-600">Query</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Health Assistant
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Clinical Entity Extraction &amp; Symptom Evaluation Summary
              </p>
            </div>

            <div className="text-xs text-right sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-4 space-y-0.5 text-slate-500">
              <div><strong>Report ID:</strong> {analysis.id}</div>
              <div><strong>Date:</strong> {new Date(analysis.timestamp).toLocaleString()}</div>
              <div><strong>Triage Level:</strong> {analysis.riskAssessment.level.toUpperCase()}</div>
            </div>
          </div>

          {/* Section 1: Input Statement */}
          <div className="space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              1. User-Provided Description
            </h5>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-sm italic border border-slate-200 dark:border-slate-700">
              "{analysis.inputText}"
            </div>
          </div>

          {/* Section 2: Extracted Information */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Extracted Clinical Attributes
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Symptoms</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {analysis.extractedInformation.symptoms.join(', ') || 'None'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Severity</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {analysis.extractedInformation.severity}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {analysis.extractedInformation.duration}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase">Triggers</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {analysis.extractedInformation.triggers.join(', ') || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Risk Assessment */}
          <div className={`p-4 rounded-xl border ${
            analysis.riskAssessment.level === 'urgent'
              ? 'bg-rose-50 border-rose-300 text-rose-950 dark:bg-rose-950/40 dark:text-rose-100'
              : analysis.riskAssessment.level === 'moderate'
              ? 'bg-amber-50 border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">
                3. Risk & Urgency Level: {analysis.riskAssessment.level.toUpperCase()}
              </h5>
            </div>
            <p className="text-sm font-semibold">{analysis.riskAssessment.title}</p>
            <p className="text-xs mt-1">{analysis.riskAssessment.recommendedAction}</p>
          </div>

          {/* Section 4: Related Conditions */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              4. Possible Related Conditions (Educational Symptom Overlap)
            </h5>
            <div className="space-y-2">
              {analysis.relatedConditions.map((cond, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{cond.name}</div>
                    <div className="text-slate-500 mt-0.5">{cond.description}</div>
                    <div className="text-[11px] text-teal-700 dark:text-teal-400 mt-1">
                      Matching symptoms: {cond.matchingSymptoms.join(', ')}
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 shrink-0">
                    {cond.overlap} Overlap
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Guidance */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              5. General Guidance & Self-Monitoring
            </h5>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-2 border border-slate-200 dark:border-slate-700">
              <div>
                <strong>When to seek professional care:</strong>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-1 space-y-0.5">
                  {analysis.guidance.whenToSeekHelp.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mandatory Safety Disclaimer Card */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-xl border border-slate-300 dark:border-slate-700 leading-relaxed">
            <strong>IMPORTANT MEDICAL DISCLAIMER:</strong> This report is generated by MediQuery, an academic Natural Language Processing engineering decision-support tool. It does NOT provide clinical diagnoses, prescriptions, or treatments. It is designed to assist educational understanding and communication with a licensed medical practitioner.
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90 rounded-b-2xl shrink-0">
          <button
            type="button"
            onClick={handleDownloadJSON}
            className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
          >
            Export Raw JSON Data
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
