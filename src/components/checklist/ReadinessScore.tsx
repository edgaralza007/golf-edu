interface ReadinessScoreProps {
  percentage: number;
}

export function ReadinessScore({ percentage }: ReadinessScoreProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (pct: number) => {
    if (pct <= 33) return { stroke: '#ef4444', text: 'text-red-500', bg: 'bg-red-50' };
    if (pct <= 66) return { stroke: '#eab308', text: 'text-yellow-500', bg: 'bg-yellow-50' };
    return { stroke: '#22c55e', text: 'text-green-500', bg: 'bg-green-50' };
  };

  const color = getColor(percentage);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${color.text}`}>
            {percentage}%
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600">
        {percentage === 100
          ? 'You are ready!'
          : percentage >= 67
            ? 'Almost there!'
            : percentage >= 34
              ? 'Making progress'
              : 'Getting started'}
      </p>
    </div>
  );
}
