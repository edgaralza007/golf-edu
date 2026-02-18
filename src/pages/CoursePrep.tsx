import { useState, useCallback, useMemo, useEffect } from 'react';
import { checklistSections } from '../data/checklist';
import { ChecklistSection } from '../components/checklist/ChecklistSection';
import { ReadinessScore } from '../components/checklist/ReadinessScore';
import { ShareSummary } from '../components/checklist/ShareSummary';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { Modal } from '../components/ui';

const STORAGE_KEY = 'golf-edu-checklist';

function Confetti() {
  const pieces = useMemo(() => {
    const colors = ['#22c55e', '#16a34a', '#eab308', '#3b82f6', '#ef4444', '#a855f7'];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function CoursePrep() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    const saved = loadFromStorage<string[]>(STORAGE_KEY, []);
    return new Set(saved);
  });
  const [showSummary, setShowSummary] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalItems = useMemo(
    () => checklistSections.reduce((sum, s) => sum + s.items.length, 0),
    []
  );
  const percentage = useMemo(
    () => (totalItems > 0 ? Math.round((checkedIds.size / totalItems) * 100) : 0),
    [checkedIds.size, totalItems]
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, Array.from(checkedIds));
  }, [checkedIds]);

  useEffect(() => {
    if (percentage === 100 && checkedIds.size > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [percentage, checkedIds.size]);

  const handleToggle = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCheckedIds(new Set());
    setShowResetConfirm(false);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Course Preparation Checklist
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
          Everything you need for your first round of golf
        </p>
      </div>

      {/* Readiness Score */}
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center">
        <ReadinessScore percentage={percentage} />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {checkedIds.size} of {totalItems} items checked
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {checklistSections.map((section) => (
          <ChecklistSection
            key={section.id}
            section={section}
            checkedIds={checkedIds}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center pb-8">
        <button
          type="button"
          onClick={() => setShowSummary(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate Summary
        </button>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset All
        </button>
      </div>

      {/* Summary Modal */}
      <Modal open={showSummary} onClose={() => setShowSummary(false)} title="Your Readiness Summary">
        <ShareSummary sections={checklistSections} checkedIds={checkedIds} />
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal open={showResetConfirm} onClose={() => setShowResetConfirm(false)} title="Reset Checklist?">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          This will uncheck all items. Are you sure you want to start over?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => setShowResetConfirm(false)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Reset All
          </button>
        </div>
      </Modal>
    </div>
  );
}
