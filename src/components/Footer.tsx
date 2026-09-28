import React from 'react';
import { NavTab } from './Navbar';
import { ShieldCheck, HeartPulse, GraduationCap } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenPrivacy: () => void;
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenPrivacy,
  onOpenDisclaimer,
}) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-600 text-white rounded-lg">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Medi<span className="text-teal-600 dark:text-teal-400">Query</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Intelligent Medical Symptom Checker &amp; Health Information Assistant. Designed to provide accessible health information, clinical entity extraction, and conversational guidance.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Educational Clinical Decision Support System</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Application
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('home')}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('checker')}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Symptom Checker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('qa')}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Ask MediQuery (QA)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('knowledge')}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Health Knowledge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('history')}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  History
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Legal */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Project & Ethics
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('about')}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  About & Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDisclaimer}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Medical Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Mandatory Disclaimer */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} MediQuery &bull; Academic Engineering Project &bull; All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 max-w-xl text-center md:text-right">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 hidden sm:inline" />
            <span>
              MediQuery provides educational information and does not provide medical diagnosis or replace professional healthcare advice.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
