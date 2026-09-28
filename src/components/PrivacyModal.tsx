import React from 'react';
import { ShieldCheck, X, Lock, Database, UserCheck, EyeOff } from 'lucide-react';

interface PrivacyModalProps {
  onClose: () => void;
  onClearLocalData: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose, onClearLocalData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 max-h-[85vh] overflow-y-auto text-slate-800 dark:text-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold">MediQuery Privacy & Ethics Statement</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          <p className="text-slate-600 dark:text-slate-400">
            MediQuery adheres strictly to healthcare informatics privacy-by-design standards and educational ethics principles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white text-xs">
                <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Zero Commercial Data Monetization</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                We do not sell, rent, or commercialize health queries or symptoms to third parties or advertising networks.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white text-xs">
                <Database className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Local-First Control</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Search queries and session records are stored client-side in your browser's localStorage and can be wiped with one click.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white text-xs">
                <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Guest Mode Default</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You can explore and analyze symptoms completely anonymously without registering an email or password.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white text-xs">
                <EyeOff className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>PII Scrubbing</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Our preprocessing pipeline filters out identified personal names and contact tokens prior to clinical entity extraction.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClearLocalData();
              alert('All local symptom history and user data has been cleared from this browser.');
            }}
            className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium cursor-pointer"
          >
            Clear All Stored Local Data
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
