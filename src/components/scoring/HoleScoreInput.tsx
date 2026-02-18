import type { HoleScore } from '../../types';

interface HoleScoreInputProps {
  holeScore: HoleScore;
  onChange: (updated: HoleScore) => void;
}

export function HoleScoreInput({ holeScore, onChange }: HoleScoreInputProps) {
  const isPar3 = holeScore.par === 3;

  return (
    <div className="grid grid-cols-5 gap-2 items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      <div className="text-center font-semibold text-gray-700 dark:text-gray-300 text-sm">
        {holeScore.hole}
      </div>

      <div>
        <input
          type="number"
          min={3}
          max={5}
          value={holeScore.par}
          onChange={(e) =>
            onChange({
              ...holeScore,
              par: Number(e.target.value) || 3,
              fairwayHit: Number(e.target.value) === 3 ? null : holeScore.fairwayHit,
            })
          }
          className="w-full h-10 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <input
          type="number"
          min={1}
          max={15}
          value={holeScore.score || ''}
          onChange={(e) =>
            onChange({ ...holeScore, score: Number(e.target.value) || 0 })
          }
          placeholder="-"
          className="w-full h-10 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <input
          type="number"
          min={0}
          max={10}
          value={holeScore.putts || ''}
          onChange={(e) =>
            onChange({ ...holeScore, putts: Number(e.target.value) || 0 })
          }
          placeholder="-"
          className="w-full h-10 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="flex justify-center">
        <input
          type="checkbox"
          checked={holeScore.fairwayHit === true}
          disabled={isPar3}
          onChange={(e) =>
            onChange({ ...holeScore, fairwayHit: e.target.checked })
          }
          className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:opacity-30"
        />
      </div>
    </div>
  );
}
