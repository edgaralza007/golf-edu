import { useState } from 'react';
import { Card, Badge } from '../ui';
import type { ClubType } from '../../data/equipment';
import { categoryColors, categoryLabels } from '../../data/equipment';

interface ClubTypeCardProps {
  club: ClubType;
}

const difficultyLabels: Record<string, string> = {
  easy: 'Beginner Friendly',
  moderate: 'Moderate',
  hard: 'Advanced',
};

const badgeVariants: Record<string, 'green' | 'amber' | 'navy'> = {
  easy: 'green',
  moderate: 'amber',
  hard: 'navy',
};

export function ClubTypeCard({ club }: ClubTypeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const color = categoryColors[club.category];

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{club.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{categoryLabels[club.category]}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={badgeVariants[club.difficulty]}>
            {difficultyLabels[club.difficulty]}
          </Badge>
          <svg
            className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{club.description}</p>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Typical Use</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5">{club.usage}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Beginner Distance</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5">{club.beginnerDistance}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Loft</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5">{club.loftDegrees}&deg;</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Difficulty</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5">{difficultyLabels[club.difficulty]}</p>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-lg p-3">
            <p className="text-xs font-medium text-green-800 dark:text-green-300 uppercase tracking-wide mb-1">Beginner Tip</p>
            <p className="text-sm text-green-900 dark:text-green-200">{club.tip}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
