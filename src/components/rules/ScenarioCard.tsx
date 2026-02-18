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
      return `${base} border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-700 dark:text-gray-300`;
    }
    if (index === correctIndex) {
      return `${base} border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300`;
    }
    if (index === selected) {
      return `${base} border-red-500 dark:border-red-700 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300`;
    }
    return `${base} border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500`;
  };

  return (
    <Card padding="lg" className="w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{question}</h3>

      <div className="space-y-3">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={getOptionClasses(i)}
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-400 flex-shrink-0">
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
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
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
