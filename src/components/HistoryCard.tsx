import React from 'react';
import { HistoryRecord } from '../types';
import { RiskBadge } from './RiskBadge';
import { Calendar, Clock, Trash2, ArrowUpRight, Activity } from 'lucide-react';

interface HistoryCardProps {
  record: HistoryRecord;
  onView: (record: HistoryRecord) => void;
  onDelete: (id: string) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ record, onView, onDelete }) => {
  return (
    <div
      id={`history-card-${record.id}`}
      className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            {record.date}
          </span>
          <RiskBadge level={record.riskLevel} />
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            {record.status}
          </span>
        </div>

        {/* Symptoms */}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
          <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
            {record.mainSymptoms.join(', ')}
          </h4>
        </div>

        {/* Duration & severity tags */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Duration: <strong>{record.duration}</strong>
          </span>
          <span>&bull;</span>
          <span>
            Severity: <strong>{record.severity}</strong>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <button
          type="button"
          id={`view-history-btn-${record.id}`}
          onClick={() => onView(record)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <span>View Analysis</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          id={`delete-history-btn-${record.id}`}
          onClick={() => onDelete(record.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Delete from history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
