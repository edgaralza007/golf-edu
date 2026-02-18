import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { DifficultyBadge } from './DifficultyBadge';
import {
  CATEGORY_LABELS,
  LOCATION_LABELS,
  LOCATION_ICONS,
  type Drill,
} from '../../data/drills';

interface DrillCardProps {
  drill: Drill;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  putting: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
  'distance-control': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  'grip-setup': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  chipping: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
  'full-swing': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
  alignment: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300',
};

export function DrillCard({ drill, isFavorite, onToggleFavorite }: DrillCardProps) {
  return (
    <Card className="relative group hover:shadow-md transition-shadow" padding="sm">
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(drill.id);
        }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg
          className={`w-5 h-5 transition-colors ${
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

      <Link to={`/drills/${drill.id}`} className="block">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              categoryColors[drill.category] ?? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {CATEGORY_LABELS[drill.category]}
          </span>
          <DifficultyBadge level={drill.difficulty} />
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 pr-8 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
          {drill.name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{drill.description}</p>

        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
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
          <span className="flex items-center gap-1">
            <span className="text-sm">{LOCATION_ICONS[drill.location]}</span>
            {LOCATION_LABELS[drill.location]}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            {drill.equipment.length} items
          </span>
        </div>
      </Link>
    </Card>
  );
}
