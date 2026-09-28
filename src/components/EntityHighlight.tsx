import React, { useState } from 'react';
import { MedicalEntity } from '../types';
import { getCategoryStyles } from './EntityChip';
import { Eye, EyeOff, Tag, Info } from 'lucide-react';

interface EntityHighlightProps {
  originalText: string;
  entities: MedicalEntity[];
}

export const EntityHighlight: React.FC<EntityHighlightProps> = ({ originalText, entities }) => {
  const [showHighlighted, setShowHighlighted] = useState(true);
  const [activeEntityId, setActiveEntityId] = useState<string | null>(null);

  // Build segments with entities
  const renderAnnotatedText = () => {
    if (!entities || entities.length === 0) {
      return <span>{originalText}</span>;
    }

    const sorted = [...entities].sort((a, b) => a.startIndex - b.startIndex);
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    sorted.forEach((entity) => {
      // Un-highlighted text segment before the entity
      if (entity.startIndex > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>
            {originalText.substring(lastIndex, entity.startIndex)}
          </span>
        );
      }

      const styles = getCategoryStyles(entity.type);
      const isHovered = activeEntityId === entity.id;

      elements.push(
        <mark
          key={entity.id}
          id={`highlight-span-${entity.id}`}
          onMouseEnter={() => setActiveEntityId(entity.id)}
          onMouseLeave={() => setActiveEntityId(null)}
          className={`relative inline-block mx-0.5 px-1.5 py-0.5 rounded font-medium cursor-pointer transition-all border ${
            styles.bg
          } ${styles.border} ${styles.text} ${isHovered ? 'ring-2 ring-teal-500 scale-102 shadow-xs' : ''}`}
        >
          <span>{originalText.substring(entity.startIndex, entity.endIndex)}</span>
          <span
            className={`ml-1.5 px-1 py-0.2 text-[9px] font-bold uppercase rounded ${styles.badgeBg} align-baseline`}
          >
            {entity.type}
          </span>
        </mark>
      );

      lastIndex = entity.endIndex;
    });

    // Remainder after last entity
    if (lastIndex < originalText.length) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {originalText.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  const activeEntity = entities.find((e) => e.id === activeEntityId);

  return (
    <div id="ner-highlight-container" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Named Entity Recognition (NER) Span Annotation
          </h4>
        </div>

        <button
          type="button"
          id="toggle-ner-view-btn"
          onClick={() => setShowHighlighted(!showHighlighted)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800 transition-colors"
        >
          {showHighlighted ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Show Plain Text</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>View Original Text with NER Highlights</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
        {showHighlighted ? (
          <div className="leading-loose">
            {renderAnnotatedText()}
          </div>
        ) : (
          <p className="italic text-slate-700 dark:text-slate-300">"{originalText}"</p>
        )}
      </div>

      {activeEntity && (
        <div className="p-3 text-xs bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 transition-all">
          <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              Entity: <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">"{activeEntity.text}"</span> | Type: <span className="text-slate-900 dark:text-white font-bold">{activeEntity.type}</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              Character Span: [{activeEntity.startIndex}–{activeEntity.endIndex}] &bull; Confidence: {(activeEntity.confidence * 100).toFixed(1)}% &bull; Normalized: {activeEntity.normalized || activeEntity.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
