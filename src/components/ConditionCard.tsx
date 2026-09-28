import React from 'react';
import { RelatedCondition } from '../types';
import { Stethoscope, CheckCircle2, HelpCircle } from 'lucide-react';

interface ConditionCardProps {
  condition: RelatedCondition;
  onSelectTopic?: (topicName: string) => void;
}

export const ConditionCard: React.FC<ConditionCardProps> = ({ condition, onSelectTopic }) => {
  const getOverlapBadge = () => {
    switch (condition.overlap) {
      case 'High':
        return {
          barColor: 'bg-teal-600',
          textColor: 'text-teal-700 dark:text-teal-300',
          bgColor: 'bg-teal-50 dark:bg-teal-950/60',
          borderColor: 'border-teal-200 dark:border-teal-800',
        };
      case 'Moderate':
        return {
          barColor: 'bg-amber-500',
          textColor: 'text-amber-700 dark:text-amber-300',
          bgColor: 'bg-amber-50 dark:bg-amber-950/60',
          borderColor: 'border-amber-200 dark:border-amber-800',
        };
      case 'Low':
      default:
        return {
          barColor: 'bg-slate-400',
          textColor: 'text-slate-600 dark:text-slate-400',
          bgColor: 'bg-slate-50 dark:bg-slate-800',
          borderColor: 'border-slate-200 dark:border-slate-700',
        };
    }
  };

  const badgeStyle = getOverlapBadge();

  return (
    <div
      id={`condition-card-${condition.id}`}
      className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3.5"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {condition.name}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {condition.description}
          </p>
        </div>

        {/* Overlap Indicator Pill */}
        <div className={`px-3 py-1.5 rounded-lg border shrink-0 text-right ${badgeStyle.bgColor} ${badgeStyle.borderColor}`}>
          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Symptom Overlap
          </div>
          <div className={`text-sm font-bold ${badgeStyle.textColor}`}>
            {condition.overlap}
          </div>
        </div>
      </div>

      {/* Progress Bar with Educational Disclaimer */}
      <div className="space-y-1">
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${badgeStyle.barColor}`}
            style={{ width: `${condition.overlapPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            Symptom overlap indicator — for educational purposes only
          </span>
          <span className="font-mono text-xs">{condition.overlapPercentage}% match index</span>
        </div>
      </div>

      {/* Matching Symptoms */}
      <div className="pt-1">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Overlapping Symptoms Identified:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {condition.matchingSymptoms.map((symp, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
            >
              <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              {symp}
            </span>
          ))}
        </div>
      </div>

      {/* General guidance note */}
      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
        <span className="font-semibold text-slate-700 dark:text-slate-200 shrink-0">General Care Note:</span>
        <span>{condition.generalGuidance}</span>
      </div>
    </div>
  );
};
