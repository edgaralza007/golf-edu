import { useCallback, type RefObject } from 'react';
import type { GlossaryTerm } from '../../data/glossary';
import { glossaryMap } from '../../data/glossary';
import { getCategoryBadgeColor } from './CategoryFilter';

interface TermCardProps {
  term: GlossaryTerm;
  highlighted?: boolean;
  cardRef?: RefObject<HTMLDivElement | null>;
  onTermClick: (id: string) => void;
}

export function TermCard({ term, highlighted, cardRef, onTermClick }: TermCardProps) {
  const copyLink = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}#${term.id}`;
    navigator.clipboard.writeText(url);
  }, [term.id]);

  return (
    <div
      ref={cardRef}
      id={`term-${term.id}`}
      className={`rounded-xl border bg-white dark:bg-gray-800 p-4 md:p-5 transition-all ${
        highlighted
          ? 'border-green-500 ring-2 ring-green-200 dark:ring-green-800 shadow-md'
          : 'border-gray-100 dark:border-gray-700 shadow-sm'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{term.term}</h3>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">{term.pronunciation}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeColor(
              term.category
            )}`}
          >
            {term.category}
          </span>
          <button
            onClick={copyLink}
            title="Copy link to this term"
            className="rounded p-1 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">{term.definition}</p>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Example: </span>
        <span className="italic">{term.example}</span>
      </p>

      {term.relatedTerms.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Related:</span>
          {term.relatedTerms.map((relId) => {
            const related = glossaryMap.get(relId);
            if (!related) return null;
            return (
              <button
                key={relId}
                onClick={() => onTermClick(relId)}
                className="text-xs text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 hover:underline font-medium"
              >
                {related.term}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
