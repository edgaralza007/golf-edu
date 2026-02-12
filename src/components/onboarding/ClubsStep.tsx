import type { ClubOwnership } from '../../types';
import { OptionCard } from './OptionCard';

interface ClubsStepProps {
  value: ClubOwnership;
  onSelect: (value: ClubOwnership) => void;
}

const options: { value: ClubOwnership; label: string; description: string; icon: string }[] = [
  { value: 'no', label: 'No', description: "I don't have any clubs yet", icon: '🤷' },
  { value: 'borrowing', label: 'Borrowing', description: "I borrow from friends or family", icon: '🤝' },
  { value: 'starter-set', label: 'Starter Set', description: 'I have a basic starter set', icon: '🎒' },
  { value: 'full-set', label: 'Full Set', description: 'I have a complete set of clubs', icon: '🏆' },
];

export function ClubsStep({ value, onSelect }: ClubsStepProps) {
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
