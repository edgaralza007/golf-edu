import type { HoleScore } from '../../types';
import { HoleScoreInput } from './HoleScoreInput';

interface ScorecardProps {
  scores: HoleScore[];
  onChange: (scores: HoleScore[]) => void;
  coursePar: number;
}

export function Scorecard({ scores, onChange, coursePar }: ScorecardProps) {
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const totalPutts = scores.reduce((sum, s) => sum + s.putts, 0);
  const fairways = scores.filter((s) => s.fairwayHit !== null);
  const fairwaysHit = fairways.filter((s) => s.fairwayHit === true).length;
  const scoredHoles = scores.filter((s) => s.score > 0).length;

  const handleHoleChange = (index: number, updated: HoleScore) => {
    const next = [...scores];
    next[index] = updated;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {/* Header row */}
      <div className="grid grid-cols-5 gap-2 px-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        <div className="text-center">Hole</div>
        <div className="text-center">Par</div>
        <div className="text-center">Score</div>
        <div className="text-center">Putts</div>
        <div className="text-center">FW</div>
      </div>

      {/* Hole inputs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-50 dark:divide-gray-700 px-2">
        {scores.map((hole, i) => (
          <HoleScoreInput
            key={hole.hole}
            holeScore={hole}
            onChange={(updated) => handleHoleChange(i, updated)}
          />
        ))}
      </div>

      {/* Totals bar */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800 p-3">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Score</p>
            <p className={`text-xl font-bold ${totalScore > coursePar ? 'text-red-600 dark:text-red-400' : totalScore < coursePar ? 'text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
              {totalScore || '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">vs Par</p>
            <p className={`text-xl font-bold ${totalScore - coursePar > 0 ? 'text-red-600 dark:text-red-400' : totalScore - coursePar < 0 ? 'text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
              {scoredHoles > 0 ? (totalScore - coursePar > 0 ? '+' : '') + (totalScore - coursePar) : '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Putts</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{totalPutts || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">FW Hit</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {fairways.length > 0 ? `${fairwaysHit}/${fairways.length}` : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
