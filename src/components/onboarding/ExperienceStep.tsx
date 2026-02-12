import type { Experience } from '../../types';
import { OptionCard } from './OptionCard';

interface ExperienceStepProps {
  value: Experience;
  onSelect: (value: Experience) => void;
}

const options: { value: Experience; label: string; description: string; icon: string }[] = [
  { value: 'never', label: 'Never', description: "I'm completely new to golf", icon: '🌱' },
  { value: 'few-times', label: 'A Few Times', description: "I've played casually before", icon: '⛳' },
  { value: 'regularly', label: 'Regularly', description: 'I play often and want to improve', icon: '🏌️' },
];

export function ExperienceStep({ value, onSelect }: ExperienceStepProps) {
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
