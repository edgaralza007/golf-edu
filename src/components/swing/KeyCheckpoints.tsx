import type { SwingPhase } from '../../data/swings';
import { Card } from '../ui/Card';

interface KeyCheckpointsProps {
  phase: SwingPhase;
}

interface CheckpointItemProps {
  label: string;
  value: string;
  icon: string;
}

function CheckpointItem({ label, value, icon }: CheckpointItemProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export function KeyCheckpoints({ phase }: KeyCheckpointsProps) {
  return (
    <Card className="mt-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Key Checkpoints</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CheckpointItem icon="🤲" label="Grip" value={phase.gripNote} />
        <CheckpointItem icon="🧍" label="Body Position" value={phase.bodyPosition} />
        <CheckpointItem icon="⚖️" label="Weight" value={phase.weightDistribution} />
        <CheckpointItem icon="🏑" label="Club Position" value={phase.clubPosition} />
      </div>
    </Card>
  );
}
