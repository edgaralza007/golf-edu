import { useState } from 'react';
import type { ChecklistItemData } from '../../data/checklist';

interface ChecklistItemProps {
  item: ChecklistItemData;
  checked: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistItem({ item, checked, onToggle }: ChecklistItemProps) {
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-3 py-3 px-2">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          onClick={() => onToggle(item.id)}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
            checked
              ? 'bg-green-600 border-green-600'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {checked && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={() => setTipOpen(!tipOpen)}
            className="w-full text-left flex items-center gap-2 group"
          >
            <span
              className={`text-sm leading-snug transition-colors ${
                checked ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}
            >
              {item.label}
            </span>
            <svg
              className={`w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-green-600 transition-transform ${
                tipOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {tipOpen && (
            <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-green-800 leading-relaxed">
                <span className="font-medium">Tip: </span>
                {item.tip}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
