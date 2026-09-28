import React from 'react';
import { HistoryCard } from '../components/HistoryCard';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import { HistoryRecord } from '../types';
import { History as HistoryIcon, Trash2, Stethoscope, PlusCircle } from 'lucide-react';

interface HistoryPageProps {
  history: HistoryRecord[];
  onViewRecord: (record: HistoryRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
  onStartNewCheck: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onViewRecord,
  onDeleteRecord,
  onClearHistory,
  onStartNewCheck,
}) => {
  return (
    <div id="history-page" className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Universal Mandatory Safety Banner */}
      <MedicalDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <HistoryIcon className="w-3.5 h-3.5" />
            <span>Local Session Storage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Symptom Check History
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Review your past symptom evaluations, clinical entity extractions, and guidance summaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="history-start-new-check-btn"
            onClick={onStartNewCheck}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Check</span>
          </button>

          {history.length > 0 && (
            <button
              type="button"
              id="clear-all-history-btn"
              onClick={() => {
                if (confirm('Are you sure you want to clear your local symptom check history?')) {
                  onClearHistory();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 dark:border-slate-700 hover:border-rose-500 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* History Items List */}
      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((record) => (
            <HistoryCard
              key={record.id}
              record={record}
              onView={onViewRecord}
              onDelete={onDeleteRecord}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <HistoryIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Previous Checks Found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Your symptom analyses will appear here when saved. Try running your first symptom evaluation.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartNewCheck}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Start Symptom Analysis
          </button>
        </div>
      )}
    </div>
  );
};
