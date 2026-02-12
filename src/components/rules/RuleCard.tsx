import { useState } from 'react';
import { Card, Badge } from '../ui';

interface RuleCardProps {
  title: string;
  icon: string;
  summary: string;
  details: string[];
  penaltyStrokes?: number;
  tip?: string;
}

export function RuleCard({ title, icon, summary, details, penaltyStrokes, tip }: RuleCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full cursor-pointer" padding="sm" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {penaltyStrokes !== undefined && (
              <Badge variant="amber">
                {penaltyStrokes === 0 ? 'No penalty' : `${penaltyStrokes} penalty stroke${penaltyStrokes > 1 ? 's' : ''}`}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{summary}</p>

          {expanded && (
            <div className="mt-3 space-y-2">
              <ul className="space-y-2">
                {details.map((detail, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">&#x2022;</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              {tip && (
                <div className="mt-3 rounded-lg bg-green-50 border border-green-200 p-3">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Tip:</span> {tip}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </Card>
  );
}
