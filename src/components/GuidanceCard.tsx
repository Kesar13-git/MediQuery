import React from 'react';
import { GuidanceData } from '../types';
import { Eye, HelpCircle, HeartHandshake, Stethoscope } from 'lucide-react';

interface GuidanceCardProps {
  guidance: GuidanceData;
}

export const GuidanceCard: React.FC<GuidanceCardProps> = ({ guidance }) => {
  return (
    <div id="general-guidance-section" className="space-y-4">
      <div className="flex items-center gap-2">
        <HeartHandshake className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
          General Guidance & Recommendations
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What to Monitor */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-sm">
            <div className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-md">
              <Eye className="w-4 h-4" />
            </div>
            <span>What You Can Monitor</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {guidance.monitoring.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When to Seek Help */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-sm">
            <div className="p-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded-md">
              <Stethoscope className="w-4 h-4" />
            </div>
            <span>When to Seek Professional Care</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {guidance.whenToSeekHelp.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions for Doctor */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-sm">
            <div className="p-1.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-md">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span>Questions to Discuss with a Healthcare Professional</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {guidance.questionsForDoctor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* General Self-Care */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-sm">
            <div className="p-1.5 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded-md">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span>General Supportive Care</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {guidance.generalSelfCare.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
