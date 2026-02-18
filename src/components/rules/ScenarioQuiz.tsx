import { useState, useCallback, useEffect, useMemo } from 'react';
import { ProgressBar } from '../ui';
import { ScenarioCard } from './ScenarioCard';
import { QuizResults } from './QuizResults';
import { scenarios, type Scenario } from '../../data/scenarios';
import { loadFromStorage, saveToStorage } from '../../utils/storage';

const BEST_SCORE_KEY = 'golf-edu-quiz-best';

function shuffle(arr: Scenario[]): Scenario[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ScenarioQuiz() {
  const [shuffled, setShuffled] = useState(() => shuffle(scenarios));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => loadFromStorage<number>(BEST_SCORE_KEY, 0));

  const total = useMemo(() => shuffled.length, [shuffled]);

  const handleAnswer = useCallback((correct: boolean) => {
    if (correct) setScore((s) => s + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex >= total - 1) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, total]);

  useEffect(() => {
    if (finished && score > bestScore) {
      setBestScore(score);
      saveToStorage(BEST_SCORE_KEY, score);
    }
  }, [finished, score, bestScore]);

  const handleRetry = useCallback(() => {
    setShuffled(shuffle(scenarios));
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    return (
      <QuizResults
        score={score}
        total={total}
        bestScore={bestScore}
        onRetry={handleRetry}
      />
    );
  }

  const scenario = shuffled[currentIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>
          Question {currentIndex + 1} of {total}
        </span>
        <span className="font-medium text-green-700 dark:text-green-400">
          Score: {score}
        </span>
      </div>

      <ProgressBar value={currentIndex + 1} max={total} />

      <ScenarioCard
        key={scenario.id}
        question={scenario.question}
        options={scenario.options}
        correctIndex={scenario.correctIndex}
        explanation={scenario.explanation}
        onAnswer={handleAnswer}
        onNext={handleNext}
        isLast={currentIndex === total - 1}
      />
    </div>
  );
}
