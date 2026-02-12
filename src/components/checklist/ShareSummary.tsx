import { useState } from 'react';
import type { ChecklistSectionData } from '../../data/checklist';

interface ShareSummaryProps {
  sections: ChecklistSectionData[];
  checkedIds: Set<string>;
}

function buildSummaryText(sections: ChecklistSectionData[], checkedIds: Set<string>): string {
  const lines = sections.map((section) => {
    const completed = section.items.filter((i) => checkedIds.has(i.id)).length;
    const total = section.items.length;
    const status = completed === total ? '\u2705' : '\u2B1C';
    return `${status} ${section.title}: ${completed}/${total}`;
  });

  const totalChecked = checkedIds.size;
  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);

  return [
    '\uD83C\uDFCC\uFE0F I\'m Ready for My First Round!',
    '',
    ...lines,
    '',
    `Overall: ${totalChecked}/${totalItems} items checked`,
  ].join('\n');
}

export function ShareSummary({ sections, checkedIds }: ShareSummaryProps) {
  const [copied, setCopied] = useState(false);

  const summaryText = buildSummaryText(sections, checkedIds);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Golf Course Prep Checklist',
          text: summaryText,
        });
      } catch {
        // User cancelled or error, fall through to clipboard
        await copyToClipboard();
      }
    } else {
      await copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {summaryText}
        </pre>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-green-700 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
