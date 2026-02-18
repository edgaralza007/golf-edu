import type { Round } from '../../types';
import { Button } from '../ui';

interface RoundHistoryProps {
  rounds: Round[];
  onView: (round: Round) => void;
  onDelete: (roundId: string) => void;
}

export function RoundHistory({ rounds, onView, onDelete }: RoundHistoryProps) {
  const sorted = [...rounds].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 dark:text-gray-500">
        <p className="text-sm">No rounds logged yet</p>
        <p className="text-xs mt-1">Start a new round to track your progress</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sorted.map((round) => {
        const diff = round.totalScore - round.coursePar;
        const diffStr = diff > 0 ? `+${diff}` : diff === 0 ? 'E' : `${diff}`;
        return (
          <div
            key={round.id}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                {round.courseName}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(round.date).toLocaleDateString()} &middot; {round.holes} holes
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{round.totalScore}</p>
              <p className={`text-xs font-medium ${diff > 0 ? 'text-red-500 dark:text-red-400' : diff < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {diffStr}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button size="sm" variant="ghost" onClick={() => onView(round)}>
                View
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                onClick={() => onDelete(round.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
