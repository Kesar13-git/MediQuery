import React from 'react';
import { RiskAssessment, RiskLevel } from '../types';
import { ShieldCheck, AlertCircle, AlertOctagon, PhoneCall } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '' }) => {
  switch (level) {
    case 'urgent':
      return (
        <span
          id="risk-badge-urgent"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-300 dark:border-rose-800 ${className}`}
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>Urgent Attention Advised</span>
        </span>
      );
    case 'moderate':
      return (
        <span
          id="risk-badge-moderate"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-800 ${className}`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Moderate Concern / Monitor</span>
        </span>
      );
    case 'low':
    default:
      return (
        <span
          id="risk-badge-low"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 ${className}`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>General Guidance / Low Concern</span>
        </span>
      );
  }
};

interface RiskAssessmentCardProps {
  risk: RiskAssessment;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({ risk }) => {
  const isUrgent = risk.level === 'urgent';
  const isModerate = risk.level === 'moderate';

  return (
    <div
      id="risk-assessment-card"
      className={`p-5 rounded-xl border transition-all ${
        isUrgent
          ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          : isModerate
          ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60 text-slate-900 dark:text-slate-100'
          : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-slate-900 dark:text-slate-100'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {isUrgent ? (
            <div className="p-2 bg-rose-600 text-white rounded-lg">
              <AlertOctagon className="w-5 h-5 animate-pulse" />
            </div>
          ) : isModerate ? (
            <div className="p-2 bg-amber-600 text-white rounded-lg">
              <AlertCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 bg-emerald-600 text-white rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}

          <div>
            <h4 className="text-base font-bold">
              {risk.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Evaluated using clinical decision-support rules & safety flags
            </p>
          </div>
        </div>

        <RiskBadge level={risk.level} />
      </div>

      <p className="text-sm leading-relaxed mb-4">
        {risk.description}
      </p>

      {/* Urgent Warning Checklist */}
      {isUrgent && risk.urgentWarningSigns && (
        <div className="p-4 bg-white/90 dark:bg-slate-900/90 rounded-lg border border-rose-200 dark:border-rose-900 mb-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4" />
            <span>Emergency Red Flags Identified</span>
          </div>
          <ul className="space-y-1 text-xs sm:text-sm text-rose-900 dark:text-rose-200 list-disc list-inside">
            {risk.urgentWarningSigns.map((sign, idx) => (
              <li key={idx} className="font-medium">
                {sign}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Action Card */}
      <div className={`p-3.5 rounded-lg flex items-start gap-3 ${
        isUrgent
          ? 'bg-rose-600 text-white'
          : isModerate
          ? 'bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800'
          : 'bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800'
      }`}>
        <div className="shrink-0 mt-0.5">
          {isUrgent ? <PhoneCall className="w-4 h-4" /> : <AlertCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
        </div>
        <div className="text-xs sm:text-sm">
          <span className="font-bold mr-1">Recommended Safety Step:</span>
          <span>{risk.recommendedAction}</span>
        </div>
      </div>
    </div>
  );
};
