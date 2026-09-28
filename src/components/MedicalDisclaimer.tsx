import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface MedicalDisclaimerProps {
  compact?: boolean;
  className?: string;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({ compact = false, className = '' }) => {
  if (compact) {
    return (
      <div
        id="medical-disclaimer-compact"
        className={`flex items-center gap-2 px-3 py-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700/60 ${className}`}
      >
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          <strong>Medical Disclaimer:</strong> Educational information only. Does not replace a qualified healthcare professional or clinical diagnosis.
        </span>
      </div>
    );
  }

  return (
    <div
      id="medical-disclaimer-card"
      className={`p-4 sm:p-5 bg-gradient-to-r from-blue-50/80 to-teal-50/60 dark:from-slate-900/90 dark:to-slate-800/80 border border-blue-200/80 dark:border-slate-700 rounded-xl shadow-xs ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Important Medical Disclaimer
            </h4>
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 rounded-full">
              Educational Guidance
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>MediQuery</strong> provides educational health information and AI-assisted symptom analysis. It is an intelligent decision-support application and is <strong>not a substitute for professional clinical diagnosis, advice, or treatment</strong>. If you are experiencing a life-threatening medical emergency, call your local emergency services (e.g., 911 / 112) immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
