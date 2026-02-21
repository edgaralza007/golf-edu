import type { CaddieAdvice, ShotOutcome } from '../../types';

interface CaddieBubbleProps {
  advice: CaddieAdvice;
  outcome: ShotOutcome;
  onOutcome: (outcome: ShotOutcome) => void;
}

export function CaddieBubble({ advice, outcome, onOutcome }: CaddieBubbleProps) {
  return (
    <div className="space-y-4">
      {/* Chat bubble */}
      <div className="flex gap-3 items-start">
        {/* Caddie avatar */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-green-700 flex items-center justify-center shadow-sm">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        {/* Bubble */}
        <div className="flex-1 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl rounded-tl-sm p-4 space-y-4">
          {/* 1. Club */}
          <div>
            <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
              Recommended Club
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {advice.recommendedClub || '—'}
            </div>
          </div>

          {/* 2. Aim */}
          <div>
            <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
              Where to Aim
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              {advice.aimAdvice || '—'}
            </p>
          </div>

          {/* 3. Risks */}
          <div>
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
              Risks to Avoid
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              {advice.risks || '—'}
            </p>
          </div>

          {/* 4. Confidence booster */}
          <div className="pt-3 border-t border-green-200 dark:border-green-800">
            <p className="text-sm italic text-green-700 dark:text-green-400 leading-relaxed">
              &ldquo;{advice.confidenceBooster || 'You got this.'}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Outcome prompt */}
      <div className="flex items-center justify-center gap-3 py-1">
        <span className="text-sm text-gray-500 dark:text-gray-400">Did the advice work?</span>

        <button
          onClick={() => onOutcome(outcome === 'thumbsUp' ? null : 'thumbsUp')}
          aria-label="Thumbs up"
          className={`p-2 rounded-full transition-colors ${
            outcome === 'thumbsUp'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
          }`}
        >
          <svg
            className="w-6 h-6"
            fill={outcome === 'thumbsUp' ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </button>

        <button
          onClick={() => onOutcome(outcome === 'thumbsDown' ? null : 'thumbsDown')}
          aria-label="Thumbs down"
          className={`p-2 rounded-full transition-colors ${
            outcome === 'thumbsDown'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          }`}
        >
          <svg
            className="w-6 h-6"
            fill={outcome === 'thumbsDown' ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
