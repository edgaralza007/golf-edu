import { useState } from 'react';
import type { ShotSession } from '../../types';

interface RecentShotsProps {
  sessions: ShotSession[];
}

export function RecentShots({ sessions }: RecentShotsProps) {
  const [open, setOpen] = useState(false);

  if (sessions.length === 0) return null;

  const last5 = [...sessions].reverse().slice(0, 5);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Recent Shots ({Math.min(sessions.length, 5)})
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {last5.map((s) => (
            <div key={s.id} className="flex items-center gap-3 px-4 py-3">
              {s.imageThumbnail ? (
                <img
                  src={`data:image/jpeg;base64,${s.imageThumbnail}`}
                  alt="Shot thumbnail"
                  className="w-12 h-12 rounded-lg object-cover shrink-0 bg-gray-100 dark:bg-gray-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 shrink-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                  {s.clubRecommended || 'Unknown club'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {s.distance} yds · {new Date(s.date).toLocaleDateString()}
                </div>
              </div>

              {s.outcome === 'thumbsUp' && (
                <span className="text-green-600 dark:text-green-400" aria-label="Worked">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </span>
              )}
              {s.outcome === 'thumbsDown' && (
                <span className="text-red-500 dark:text-red-400" aria-label="Didn't work">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
