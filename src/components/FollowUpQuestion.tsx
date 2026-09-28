import React, { useState } from 'react';
import { FollowUpQuestion as FollowUpQuestionType } from '../types';
import { MessageSquare, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

interface FollowUpQAProps {
  questions: FollowUpQuestionType[];
  onFinishFollowUp: (answers: Record<string, string>) => void;
  onSkip?: () => void;
}

export const FollowUpQA: React.FC<FollowUpQAProps> = ({
  questions,
  onFinishFollowUp,
  onSkip,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [freeText, setFreeText] = useState('');

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const progress = Math.round(((currentIndex + 1) / total) * 100);

  const handleSelectOption = (option: string) => {
    const updated = { ...answers, [currentQ.id]: option };
    setAnswers(updated);
    setFreeText('');

    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinishFollowUp(updated);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeText.trim()) return;

    const updated = { ...answers, [currentQ.id]: freeText.trim() };
    setAnswers(updated);
    setFreeText('');

    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinishFollowUp(updated);
    }
  };

  return (
    <div
      id="followup-qa-card"
      className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200/80 dark:border-teal-900/60 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Let's understand this better
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              MediQuery identified key contextual slots that help provide more relevant health information.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Question {currentIndex + 1} of {total}
          </span>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
            >
              Skip follow-ups
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-teal-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Conversational Assistant Card */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl border border-teal-100 dark:border-teal-900/40">
          <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
            MQ
          </div>
          <div className="space-y-1">
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">
              {currentQ.question}
            </p>
            {currentQ.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentQ.description}
              </p>
            )}
          </div>
        </div>

        {/* Clickable Quick Options */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Select an answer:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                id={`followup-opt-${currentIndex}-${idx}`}
                onClick={() => handleSelectOption(option)}
                className="text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50/40 dark:hover:bg-teal-950/30 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>{option}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Free-Text Input */}
        <form onSubmit={handleCustomSubmit} className="pt-2">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
            Or type your response in your own words:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                id="followup-custom-input"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={!freeText.trim()}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Submit</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
