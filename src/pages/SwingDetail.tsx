import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSwingById } from '../data/swings';
import { SwingPhaseViewer } from '../components/swing/SwingPhaseViewer';
import { SwingAnimation } from '../components/swing/SwingAnimation';
import { KeyCheckpoints } from '../components/swing/KeyCheckpoints';
import { SwingComparison } from '../components/swing/SwingComparison';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const difficultyBadge: Record<string, { label: string; variant: 'green' | 'amber' | 'navy' }> = {
  beginner: { label: 'Beginner', variant: 'green' },
  intermediate: { label: 'Intermediate', variant: 'amber' },
  advanced: { label: 'Advanced', variant: 'navy' },
};

const AUTO_PLAY_INTERVAL = 2500;

export function SwingDetail() {
  const { swingType } = useParams<{ swingType: string }>();
  const swing = getSwingById(swingType ?? '');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const advancePhase = useCallback(() => {
    if (!swing) return;
    setCurrentPhase((p) => (p >= swing.phases.length - 1 ? 0 : p + 1));
  }, [swing]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(advancePhase, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [autoPlay, advancePhase]);

  if (!swing) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Swing Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The swing type you are looking for does not exist.</p>
        <Link to="/swing-fundamentals">
          <Button variant="primary">Back to Swing Fundamentals</Button>
        </Link>
      </div>
    );
  }

  const phase = swing.phases[currentPhase];
  const badge = difficultyBadge[swing.difficulty];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/swing-fundamentals" className="text-sm text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 font-medium">
          &larr; All Swings
        </Link>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <span className="text-3xl">{swing.icon}</span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{swing.name}</h1>
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{swing.description}</p>

      {/* Quick info */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
        <span><span className="font-medium text-gray-800 dark:text-gray-200">Ball:</span> {swing.ballPosition}</span>
        <span><span className="font-medium text-gray-800 dark:text-gray-200">Stance:</span> {swing.stanceNote}</span>
      </div>

      {/* Phase viewer controls */}
      <Card>
        <SwingPhaseViewer
          currentPhase={currentPhase}
          totalPhases={swing.phases.length}
          phaseName={phase.name}
          autoPlay={autoPlay}
          onPrevious={() => { setAutoPlay(false); setCurrentPhase((p) => Math.max(0, p - 1)); }}
          onNext={() => { setAutoPlay(false); setCurrentPhase((p) => Math.min(swing.phases.length - 1, p + 1)); }}
          onSelect={(i) => { setAutoPlay(false); setCurrentPhase(i); }}
          onToggleAutoPlay={() => setAutoPlay((v) => !v)}
        />

        {/* SVG Animation */}
        <SwingAnimation phase={currentPhase} className="my-6" />

        {/* Phase description */}
        <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed max-w-xl mx-auto">{phase.description}</p>
      </Card>

      {/* Pro Tip callout */}
      <Card className="mt-4 border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/30">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">💡</span>
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Pro Tip</p>
            <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">{swing.proTip}</p>
          </div>
        </div>
      </Card>

      {/* Key Checkpoints */}
      <KeyCheckpoints phase={phase} />

      {/* Comparison toggle */}
      <div className="mt-6 text-center">
        <Button
          variant={showComparison ? 'primary' : 'outline'}
          size="lg"
          onClick={() => setShowComparison((v) => !v)}
        >
          {showComparison ? 'Hide Comparison' : 'Show Correct vs Common Mistake'}
        </Button>
      </div>

      {/* Comparison panel */}
      {showComparison && <SwingComparison phase={phase} />}

      {/* Practice This link */}
      <div className="mt-8 text-center">
        <Link to="/drills">
          <Button variant="secondary" size="lg">
            Practice This Swing &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}
