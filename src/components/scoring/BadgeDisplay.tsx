import { badges } from '../../data/badges';
import type { Round, RangeSession } from '../../types';

interface BadgeDisplayProps {
  rounds: Round[];
  rangeSessions: RangeSession[];
  earnedBadges: { badgeId: string; earnedAt: string }[];
}

export function BadgeDisplay({ rounds, rangeSessions, earnedBadges }: BadgeDisplayProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {badges.map((badge) => {
          const earned = earnedBadges.find((eb) => eb.badgeId === badge.id);
          const isEarned = !!earned;
          const meetsNow = badge.criteria(rounds, rangeSessions);

          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                isEarned
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 shadow-sm'
                  : meetsNow
                    ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-50 grayscale'
              }`}
            >
              <span className="text-3xl mb-1">{badge.icon}</span>
              <p className={`text-xs font-semibold ${isEarned ? 'text-green-800 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
                {badge.name}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-tight">
                {badge.description}
              </p>
              {earned && (
                <p className="text-[10px] text-green-600 dark:text-green-400 mt-1 font-medium">
                  {new Date(earned.earnedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
