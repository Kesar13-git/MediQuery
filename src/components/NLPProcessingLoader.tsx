import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Cpu, Loader2 } from 'lucide-react';

interface NLPProcessingLoaderProps {
  onComplete: () => void;
}

const STAGES = [
  { label: 'Reading your description...', detail: 'Tokenizing input sentence and stripping noise' },
  { label: 'Preprocessing text...', detail: 'Lowercasing, stopword removal, and morphological lemmatization' },
  { label: 'Identifying medical entities...', detail: 'Named Entity Recognition across clinical taxonomies' },
  { label: 'Extracting symptom information...', detail: 'Slot-filling severity, duration, triggers, and anatomical tags' },
  { label: 'Checking for missing context...', detail: 'Analyzing completeness and synthesizing follow-up questions' },
  { label: 'Preparing guidance...', detail: 'Retrieving educational rules and calculating overlap indicators' },
];

export const NLPProcessingLoader: React.FC<NLPProcessingLoaderProps> = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const stageDuration = 320; // swift and smooth ~1.9s total
    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 250);
          return prev;
        }
      });
    }, stageDuration);

    return () => clearInterval(timer);
  }, [onComplete]);

  const progressPercent = Math.round(((currentStage + 1) / STAGES.length) * 100);

  return (
    <div id="nlp-processing-loader" className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 text-left my-8">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600 dark:text-teal-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              MediQuery Analysis Pipeline Active
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Analyzing clinical symptom sequence
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Stage list */}
      <div className="space-y-3">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                isCurrent
                  ? 'bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800/60'
                  : 'opacity-85'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                <div
                  className={`text-xs sm:text-sm font-medium ${
                    isCurrent
                      ? 'text-teal-900 dark:text-teal-100 font-semibold'
                      : isDone
                      ? 'text-slate-800 dark:text-slate-200'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {stage.label}
                </div>
                {isCurrent && (
                  <p className="text-[11px] text-teal-700/80 dark:text-teal-300/80">
                    {stage.detail}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
