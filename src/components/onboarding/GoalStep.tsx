import type { GolfGoal } from '../../types';
import { OptionCard } from './OptionCard';

interface GoalStepProps {
  value: GolfGoal;
  onSelect: (value: GolfGoal) => void;
}

const options: { value: GolfGoal; label: string; description: string; icon: string }[] = [
  { value: 'fun-social', label: 'Fun & Social', description: 'Enjoy the game with friends and family', icon: '🎉' },
  { value: 'fitness-outdoors', label: 'Fitness & Outdoors', description: 'Stay active and enjoy nature', icon: '🌿' },
  { value: 'competition-improvement', label: 'Competition & Improvement', description: 'Compete and lower my scores', icon: '📈' },
];

export function GoalStep({ value, onSelect }: GoalStepProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <OptionCard
          key={option.value}
          label={option.label}
          description={option.description}
          icon={option.icon}
          selected={value === option.value}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  );
}
