import React, { useState } from 'react';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import { HealthTopicCard } from '../components/HealthTopicCard';
import { HEALTH_TOPICS } from '../data/medicalKnowledge';
import { HealthTopic } from '../types';
import { BookOpen, Search, Filter } from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Neurological',
  'General Wellness',
  'Respiratory',
  'Digestive',
  'Infectious',
];

export const HealthKnowledgePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = HEALTH_TOPICS.filter((topic) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || topic.category === selectedCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.commonSymptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="health-knowledge-page" className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Universal Mandatory Safety Banner */}
      <MedicalDisclaimer />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Verified Clinical Reference Repository</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Health Knowledge
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Explore evidence-based overviews of common symptoms, related clinical conditions, and professional care evaluation thresholds.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            id="knowledge-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, conditions, or health topics (e.g. Headache, Cough, Dehydration)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Categories:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Topics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredTopics.length} clinical topic overviews</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-teal-600 hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>

        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map((topic) => (
              <HealthTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
            <p className="text-sm font-semibold">No health topics matched your criteria</p>
            <p className="text-xs">Try searching for broader terms like "headache", "fever", or "cough".</p>
          </div>
        )}
      </div>
    </div>
  );
};
