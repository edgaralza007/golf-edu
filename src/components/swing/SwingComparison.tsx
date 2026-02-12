import type { SwingPhase } from '../../data/swings';
import { Card } from '../ui/Card';

interface SwingComparisonProps {
  phase: SwingPhase;
}

export function SwingComparison({ phase }: SwingComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {/* Correct technique */}
      <Card className="border-green-200 bg-green-50/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold">
            &#10003;
          </span>
          <h4 className="font-semibold text-green-800">Correct Technique</h4>
        </div>
        <p className="text-sm text-green-900 leading-relaxed">{phase.description}</p>
        <div className="mt-3 pt-3 border-t border-green-200">
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Body Position</p>
          <p className="text-sm text-green-800">{phase.bodyPosition}</p>
        </div>
      </Card>

      {/* Common mistake */}
      <Card className="border-red-200 bg-red-50/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-sm font-bold">
            &#10007;
          </span>
          <h4 className="font-semibold text-red-800">Common Mistake</h4>
        </div>
        <p className="text-sm text-red-900 font-medium">{phase.commonMistake}</p>
        <div className="mt-3 pt-3 border-t border-red-200">
          <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Why It's Wrong & How to Fix</p>
          <p className="text-sm text-red-800 leading-relaxed">{phase.mistakeDescription}</p>
        </div>
      </Card>
    </div>
  );
}
