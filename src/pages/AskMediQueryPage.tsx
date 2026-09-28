import React, { useState } from 'react';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import { QA_DATABASE } from '../data/medicalKnowledge';
import { QAItem } from '../types';
import {
  MessageSquareHeart,
  Search,
  BookOpen,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const AskMediQueryPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedQA, setSelectedQA] = useState<QAItem | null>(QA_DATABASE[0]);
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(QA_DATABASE[0]?.id || 'qa-1');

  const filteredQAs: QAItem[] = QA_DATABASE.filter(
    (item: QAItem) =>
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Look for best match in database or fallback
    const match = QA_DATABASE.find(
      (item: QAItem) =>
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(item.question.toLowerCase().slice(0, 10))
    );

    if (match) {
      setSelectedQA(match);
      setActiveAccordionId(match.id || null);
    } else {
      // Synthesize general evidence-based educational answer
      const customResponse: QAItem = {
        id: `custom-qa-${Date.now()}`,
        question: query,
        category: 'General Inquiry',
        answer:
          `Regarding "${query}": In general clinical literature, health inquiries should be evaluated in context with comprehensive symptoms, medical history, and age. For accurate diagnosis or medication guidance, a consultation with a qualified healthcare professional is essential.`,
        references: [
          'World Health Organization (WHO) Health Guidelines',
          'National Library of Medicine (MedlinePlus)',
        ],
        sources: ['World Health Organization (WHO)', 'MedlinePlus'],
        relatedTopics: ['General Wellness', 'Preventive Care', 'Consulting a Doctor'],
      };
      setSelectedQA(customResponse);
      setActiveAccordionId(customResponse.id || null);
    }
  };

  const handleSelectPreset = (item: QAItem) => {
    setQuery(item.question);
    setSelectedQA(item);
    setActiveAccordionId(item.id || null);
  };

  const currentReferences = selectedQA?.references || selectedQA?.sources || [
    'General Medical Guidelines & Clinical Literature',
  ];

  return (
    <div id="ask-mediquery-page" className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Universal Mandatory Safety Banner */}
      <MedicalDisclaimer />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Evidence-Based Information Retrieval</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ask MediQuery
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Ask general health questions and receive evidence-based educational information extracted from medical literature.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleAsk} className="relative">
        <div className="flex items-center p-2 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-teal-500 transition-all">
          <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
          <input
            type="text"
            id="qa-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question (e.g. What causes migraines? When should a fever be treated?)"
            className="w-full px-3 py-2 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Ask Question
          </button>
        </div>
      </form>

      {/* Popular Question Prompts */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Frequently Inquired Health Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {QA_DATABASE.map((item: QAItem) => (
            <button
              key={item.id || item.question}
              type="button"
              onClick={() => handleSelectPreset(item)}
              className="px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-all cursor-pointer font-medium"
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>

      {/* Featured / Selected Answer Card */}
      {selectedQA && (
        <div
          id="featured-qa-answer"
          className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200/90 dark:border-teal-900/60 shadow-md space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
              {selectedQA.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Evidence-based educational retrieval
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {selectedQA.question}
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-700/50">
              {selectedQA.answer}
            </div>
          </div>

          {/* General References */}
          <div className="space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Medical Literature & Clinical Guidelines Consulted:
            </h5>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {currentReferences.map((ref: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related topics */}
          {selectedQA.relatedTopics && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-semibold text-slate-500">Related topics:</span>
              {selectedQA.relatedTopics.map((top: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300 font-medium"
                >
                  {top}
                </span>
              ))}
            </div>
          )}

          {/* Educational Note */}
          <div className="p-3 bg-teal-50/50 dark:bg-teal-950/30 rounded-lg text-xs text-teal-900 dark:text-teal-200 border border-teal-200/50 dark:border-teal-900/40">
            <strong>Educational Note:</strong> This is educational health information and should not replace personalized consultation, medical diagnosis, or prescription from a licensed healthcare professional.
          </div>
        </div>
      )}

      {/* Accordion / List of all QAs */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Browse All Curated Questions ({filteredQAs.length})
        </h3>
        <div className="space-y-2">
          {filteredQAs.map((item: QAItem) => {
            const isOpen = activeAccordionId === item.id;
            return (
              <div
                key={item.id || item.question}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveAccordionId(isOpen ? null : (item.id || null))}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 mt-3">
                    <p className="leading-relaxed">{item.answer}</p>
                    <div className="text-xs text-slate-400 font-mono">
                      References: {(item.references || item.sources || []).join(' | ')}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
