import { useState } from 'react';
import { Card, Button } from '../ui';

interface ScenarioCardProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

export function ScenarioCard({
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
  onNext,
  isLast,
}: ScenarioCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    onAnswer(index === correctIndex);
  };

  const getOptionClasses = (index: number) => {
    const base =
      'w-full text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors';
    if (selected === null) {
      return `${base} border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-700`;
    }
    if (index === correctIndex) {
      return `${base} border-green-500 bg-green-50 text-green-800`;
    }
    if (index === selected) {
      return `${base} border-red-500 bg-red-50 text-red-800`;
    }
    return `${base} border-gray-200 text-gray-400`;
  };

  return (
    <Card padding="lg" className="w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{question}</h3>

      <div className="space-y-3">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={getOptionClasses(i)}
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex-shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="mt-4 space-y-4">
          <div
            className={`rounded-lg p-3 text-sm ${
              selected === correctIndex
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}
          >
            <p className="font-medium mb-1">
              {selected === correctIndex ? 'Correct!' : 'Not quite.'}
            </p>
            <p>{explanation}</p>
          </div>
          <Button onClick={onNext} className="w-full">
            {isLast ? 'See Results' : 'Next Question'}
          </Button>
        </div>
      )}
    </Card>
  );
}
