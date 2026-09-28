import React, { useState } from 'react';
import { HealthTopic } from '../types';
import { BookOpen, AlertCircle, ChevronRight, X, HeartPulse, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HealthTopicCardProps {
  topic: HealthTopic;
  onSelect?: (topic: HealthTopic) => void;
}

export const HealthTopicCard: React.FC<HealthTopicCardProps> = ({ topic, onSelect }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    if (onSelect) {
      onSelect(topic);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        id={`health-topic-card-${topic.id}`}
        onClick={handleOpen}
        className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-teal-500/60 dark:hover:border-teal-500/60 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
              {topic.category}
            </span>
            {topic.redFlags && topic.redFlags.length > 0 && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-3 h-3" />
                <span>Safety Criteria</span>
              </span>
            )}
          </div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {topic.title}
          </h4>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {topic.overview}
          </p>
        </div>

        {/* Bottom tags */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px] font-medium">{topic.commonSymptoms.length} typical indicators</span>
          <span className="inline-flex items-center gap-0.5 text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Read Details</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Topic Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {topic.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {topic.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Clinical Overview
              </h5>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {topic.overview}
              </p>
            </div>

            {/* Common & Associated Symptoms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-100 dark:border-slate-700/60">
                <h5 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Common Symptoms
                </h5>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {topic.commonSymptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-500 font-bold">&bull;</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-100 dark:border-slate-700/60">
                <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Associated Signs
                </h5>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {topic.associatedSymptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">&bull;</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* When to seek help */}
            <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/50 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                When to Seek Professional Medical Evaluation
              </h5>
              <ul className="space-y-1.5 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
                {topic.whenToSeekHelp.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">&bull;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* General self-care */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                General Supportive Information
              </h5>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {topic.generalInformation.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs sm:text-sm font-semibold hover:bg-slate-900 cursor-pointer"
              >
                Close Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
