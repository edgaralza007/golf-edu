import { useState } from 'react';
import type { ChecklistSectionData } from '../../data/checklist';
import { ChecklistItem } from './ChecklistItem';

interface ChecklistSectionProps {
  section: ChecklistSectionData;
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function ChecklistSection({ section, checkedIds, onToggle }: ChecklistSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const completed = section.items.filter((i) => checkedIds.has(i.id)).length;
  const total = section.items.length;
  const allDone = completed === total;

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-2xl" role="img" aria-label={section.title}>
          {section.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
          <p className={`text-sm ${allDone ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            {completed}/{total} complete
          </p>
        </div>
        <div className="flex items-center gap-3">
          {allDone && (
            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
              Done
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-2 border-t border-gray-100 dark:border-gray-700">
          {/* Section progress bar */}
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-3 mb-1">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
            />
          </div>
          {section.items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              checked={checkedIds.has(item.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
