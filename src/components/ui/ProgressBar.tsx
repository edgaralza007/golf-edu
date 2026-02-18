interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, label, showPercentage = false, className = '' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span className="text-gray-600 dark:text-gray-400">{label}</span>}
          {showPercentage && <span className="font-medium text-green-700 dark:text-green-400">{pct}%</span>}
        </div>
      )}
      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
