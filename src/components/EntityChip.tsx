import React from 'react';
import { EntityCategory, MedicalEntity } from '../types';
import { Activity, Clock, AlertTriangle, Zap, Thermometer, Pill, Crosshair, HelpCircle } from 'lucide-react';

interface EntityChipProps {
  entity: MedicalEntity;
  showConfidence?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export const getCategoryStyles = (category: EntityCategory) => {
  switch (category) {
    case 'SYMPTOM':
      return {
        bg: 'bg-teal-50 dark:bg-teal-950/50',
        text: 'text-teal-800 dark:text-teal-200',
        border: 'border-teal-300 dark:border-teal-700/60',
        badgeBg: 'bg-teal-600 text-white',
        icon: Activity,
        label: 'Symptom',
      };
    case 'SEVERITY':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/50',
        text: 'text-amber-900 dark:text-amber-200',
        border: 'border-amber-300 dark:border-amber-700/60',
        badgeBg: 'bg-amber-600 text-white',
        icon: AlertTriangle,
        label: 'Severity',
      };
    case 'DURATION':
      return {
        bg: 'bg-indigo-50 dark:bg-indigo-950/50',
        text: 'text-indigo-900 dark:text-indigo-200',
        border: 'border-indigo-300 dark:border-indigo-700/60',
        badgeBg: 'bg-indigo-600 text-white',
        icon: Clock,
        label: 'Duration',
      };
    case 'TRIGGER':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/50',
        text: 'text-rose-900 dark:text-rose-200',
        border: 'border-rose-300 dark:border-rose-700/60',
        badgeBg: 'bg-rose-600 text-white',
        icon: Zap,
        label: 'Trigger',
      };
    case 'BODY_PART':
      return {
        bg: 'bg-sky-50 dark:bg-sky-950/50',
        text: 'text-sky-900 dark:text-sky-200',
        border: 'border-sky-300 dark:border-sky-700/60',
        badgeBg: 'bg-sky-600 text-white',
        icon: Crosshair,
        label: 'Body Part',
      };
    case 'TEMPERATURE':
      return {
        bg: 'bg-orange-50 dark:bg-orange-950/50',
        text: 'text-orange-900 dark:text-orange-200',
        border: 'border-orange-300 dark:border-orange-700/60',
        badgeBg: 'bg-orange-600 text-white',
        icon: Thermometer,
        label: 'Temperature',
      };
    case 'MEDICATION':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/50',
        text: 'text-emerald-900 dark:text-emerald-200',
        border: 'border-emerald-300 dark:border-emerald-700/60',
        badgeBg: 'bg-emerald-600 text-white',
        icon: Pill,
        label: 'Medication',
      };
    case 'FREQUENCY':
      return {
        bg: 'bg-purple-50 dark:bg-purple-950/50',
        text: 'text-purple-900 dark:text-purple-200',
        border: 'border-purple-300 dark:border-purple-700/60',
        badgeBg: 'bg-purple-600 text-white',
        icon: Clock,
        label: 'Frequency',
      };
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800',
        text: 'text-slate-800 dark:text-slate-200',
        border: 'border-slate-300 dark:border-slate-700',
        badgeBg: 'bg-slate-600 text-white',
        icon: HelpCircle,
        label: category,
      };
  }
};

export const EntityChip: React.FC<EntityChipProps> = ({
  entity,
  showConfidence = false,
  size = 'md',
  onClick,
  className = '',
}) => {
  const styles = getCategoryStyles(entity.type);
  const Icon = styles.icon;

  const isSmall = size === 'sm';

  return (
    <div
      id={`entity-chip-${entity.id}`}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 border rounded-lg transition-all shadow-2xs ${styles.bg} ${styles.border} ${
        isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
      } ${onClick ? 'cursor-pointer hover:shadow-xs' : ''} ${className}`}
      title={`${entity.type}: ${entity.description || entity.text} (Confidence: ${Math.round(entity.confidence * 100)}%)`}
    >
      <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold tracking-wider uppercase ${styles.badgeBg}`}>
        {entity.type}
      </span>
      <span className={`font-medium ${styles.text}`}>
        {entity.text}
      </span>
      {showConfidence && (
        <span className="text-[10px] opacity-75 font-mono text-slate-500 dark:text-slate-400 ml-0.5">
          {Math.round(entity.confidence * 100)}%
        </span>
      )}
    </div>
  );
};
