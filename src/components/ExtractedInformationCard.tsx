import React from 'react';
import { ExtractedInformation } from '../types';
import { FileText, CheckCircle2, AlertCircle, Clock, Zap, Activity, HelpCircle } from 'lucide-react';

interface ExtractedInformationCardProps {
  info: ExtractedInformation;
}

export const ExtractedInformationCard: React.FC<ExtractedInformationCardProps> = ({ info }) => {
  return (
    <div
      id="extracted-information-card"
      className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Extracted Health Information
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">
          Extracted from your symptom description
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Symptoms */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Identified Symptoms</span>
          </div>
          {info.symptoms.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {info.symptoms.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs font-medium bg-teal-100/80 text-teal-900 dark:bg-teal-900/60 dark:text-teal-200 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">No specific symptoms identified</span>
          )}
        </div>

        {/* Severity */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Severity</span>
          </div>
          <p className={`text-xs sm:text-sm font-semibold ${
            info.severity.toLowerCase().includes('severe')
              ? 'text-rose-700 dark:text-rose-400'
              : info.severity.toLowerCase().includes('moderate')
              ? 'text-amber-700 dark:text-amber-400'
              : 'text-slate-700 dark:text-slate-300'
          }`}>
            {info.severity}
          </p>
        </div>

        {/* Duration */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Duration</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
            {info.duration}
          </p>
        </div>

        {/* Frequency */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Frequency</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {info.frequency}
          </p>
        </div>

        {/* Triggers */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Triggers / Aggravators</span>
          </div>
          {info.triggers.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {info.triggers.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs font-medium bg-rose-100/70 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">None specified</span>
          )}
        </div>

        {/* Associated Symptoms */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Associated Symptoms</span>
          </div>
          {info.associatedSymptoms.length > 0 ? (
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {info.associatedSymptoms.join(', ')}
            </p>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">None isolated</span>
          )}
        </div>
      </div>

      {/* Missing Information Context Box */}
      {info.missingInformation.length > 0 && (
        <div className="p-3.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 dark:text-amber-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Missing Clinical Context Flagged for Clarification</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {info.missingInformation.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded font-medium"
              >
                &bull; {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
