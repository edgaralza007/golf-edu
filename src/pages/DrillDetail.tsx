import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  drills,
  CATEGORY_LABELS,
  LOCATION_LABELS,
  LOCATION_ICONS,
} from '../data/drills';
import { DifficultyBadge } from '../components/drills/DifficultyBadge';
import { Card } from '../components/ui/Card';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { useUser } from '../context/UserContext';

const FAVORITES_KEY = 'golf-edu-drill-favorites';

const categoryColors: Record<string, string> = {
  putting: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
  'distance-control': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  'grip-setup': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  chipping: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
  'full-swing': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-rose-300',
  alignment: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300',
};

export function DrillDetail() {
  const { drillId } = useParams<{ drillId: string }>();
  const { updateDrillProgress } = useUser();
  const drill = drills.find((d) => d.id === drillId);

  const [favorites, setFavorites] = useState<string[]>(() =>
    loadFromStorage<string[]>(FAVORITES_KEY, [])
  );
  const [completed, setCompleted] = useState(false);

  const isFavorite = drill ? favorites.includes(drill.id) : false;

  const toggleFavorite = useCallback(() => {
    if (!drill) return;
    setFavorites((prev) => {
      const next = prev.includes(drill.id)
        ? prev.filter((f) => f !== drill.id)
        : [...prev, drill.id];
      saveToStorage(FAVORITES_KEY, next);
      return next;
    });
  }, [drill]);

  const markComplete = useCallback(() => {
    if (!drill) return;
    updateDrillProgress(drill.id);
    setCompleted(true);
  }, [drill, updateDrillProgress]);

  if (!drill) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Drill Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The drill you are looking for does not exist.</p>
        <Link
          to="/drills"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-medium hover:bg-green-800 transition-colors"
        >
          Back to Drill Library
        </Link>
      </div>
    );
  }

  const related = drills.filter((d) => d.category === drill.category && d.id !== drill.id);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link to="/drills" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">
          Practice Drills
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{drill.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{drill.name}</h1>
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-6 h-6 transition-colors ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'
              }`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              categoryColors[drill.category] ?? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {CATEGORY_LABELS[drill.category]}
          </span>
          <DifficultyBadge level={drill.difficulty} />
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {drill.estimatedMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{LOCATION_ICONS[drill.location]}</span>
            {LOCATION_LABELS[drill.location]}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{drill.description}</p>
      </div>

      {/* Equipment */}
      <Card className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-3">
          Equipment Needed
        </h2>
        <ul className="space-y-2">
          {drill.equipment.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {/* Steps */}
      <Card className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-4">
          Step-by-Step Instructions
        </h2>
        <ol className="space-y-4">
          {drill.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </Card>

      {/* Success Criteria */}
      <Card className="mb-4 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-green-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h2 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-1">Success Criteria</h2>
            <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">{drill.successCriteria}</p>
          </div>
        </div>
      </Card>

      {/* Mark as complete */}
      <div className="mb-6">
        {completed ? (
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Practice session logged! Great work.
          </div>
        ) : (
          <button
            onClick={markComplete}
            className="w-full py-3 rounded-lg bg-green-700 text-white font-medium text-sm hover:bg-green-800 transition-colors"
          >
            Mark as Practiced
          </button>
        )}
      </div>

      {/* Related Swing Lesson */}
      {drill.relatedSwingType && (
        <Card className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Related Swing Lesson</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Learn the fundamentals behind this drill
              </p>
            </div>
            <Link
              to="/swing-fundamentals"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
            >
              View Lesson
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Card>
      )}

      {/* Related drills */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            More {CATEGORY_LABELS[drill.category]} Drills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((d) => (
              <Link
                key={d.id}
                to={`/drills/${d.id}`}
                className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 hover:shadow-sm transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{d.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <DifficultyBadge level={d.difficulty} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{d.estimatedMinutes} min</span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
