import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { drills, CATEGORY_LABELS, LOCATION_ICONS, type Drill } from '../../data/drills';
import { DifficultyBadge } from './DifficultyBadge';

interface QuickPracticeProps {
  open: boolean;
  onClose: () => void;
}

function buildPlan(minutes: number): Drill[] {
  const shuffled = [...drills].sort(() => Math.random() - 0.5);
  const plan: Drill[] = [];
  let remaining = minutes;
  const usedCategories = new Set<string>();

  // First pass: pick one from each category for variety
  for (const drill of shuffled) {
    if (remaining <= 0) break;
    if (usedCategories.has(drill.category)) continue;
    if (drill.estimatedMinutes <= remaining) {
      plan.push(drill);
      remaining -= drill.estimatedMinutes;
      usedCategories.add(drill.category);
    }
  }

  // Second pass: fill remaining time
  for (const drill of shuffled) {
    if (remaining <= 0) break;
    if (plan.includes(drill)) continue;
    if (drill.estimatedMinutes <= remaining) {
      plan.push(drill);
      remaining -= drill.estimatedMinutes;
    }
  }

  return plan;
}

export function QuickPractice({ open, onClose }: QuickPracticeProps) {
  const [selectedTime, setSelectedTime] = useState(30);
  const [plan, setPlan] = useState<Drill[] | null>(null);

  const totalMinutes = useMemo(() => {
    if (!plan) return 0;
    return plan.reduce((sum, d) => sum + d.estimatedMinutes, 0);
  }, [plan]);

  const generate = () => setPlan(buildPlan(selectedTime));

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50 bg-white rounded-2xl shadow-xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Quick Practice Plan</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Select your available time and we'll build a practice plan.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {/* Time selector */}
          <div className="flex gap-2 mb-5">
            {[15, 30, 60].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSelectedTime(m);
                  setPlan(null);
                }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  selectedTime === m
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {m} min
              </button>
            ))}
          </div>

          <button
            onClick={generate}
            className="w-full py-2.5 rounded-lg bg-green-700 text-white font-medium text-sm hover:bg-green-800 transition-colors mb-5"
          >
            {plan ? 'Regenerate Plan' : 'Generate Plan'}
          </button>

          {/* Generated plan */}
          {plan && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">
                  Your {selectedTime}-Minute Plan
                </span>
                <span className="text-gray-500">
                  {totalMinutes} min total &middot; {plan.length} drills
                </span>
              </div>

              <ol className="space-y-2">
                {plan.map((drill, i) => (
                  <li key={drill.id}>
                    <Link
                      to={`/drills/${drill.id}`}
                      onClick={onClose}
                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-colors"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {drill.name}
                          </span>
                          <DifficultyBadge level={drill.difficulty} />
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{drill.estimatedMinutes} min</span>
                          <span>&middot;</span>
                          <span>
                            {LOCATION_ICONS[drill.location]} {CATEGORY_LABELS[drill.category]}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
