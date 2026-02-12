import { Card, Button, ProgressBar } from '../ui';

interface QuizResultsProps {
  score: number;
  total: number;
  bestScore: number;
  onRetry: () => void;
}

function getFeedback(pct: number): { message: string; emoji: string } {
  if (pct === 100) return { message: 'Perfect score! You know your rules inside and out.', emoji: '\ud83c\udfc6' };
  if (pct >= 80) return { message: 'Great job! You have a strong grasp of golf rules and etiquette.', emoji: '\ud83c\udf1f' };
  if (pct >= 60) return { message: 'Good effort! Review the areas you missed and try again.', emoji: '\ud83d\udc4d' };
  if (pct >= 40) return { message: 'Getting there! Spend some time reading the rules section, then retake the quiz.', emoji: '\ud83d\udcda' };
  return { message: 'Keep learning! Read through the rules and etiquette sections, then give it another shot.', emoji: '\ud83c\udfcc\ufe0f' };
}

export function QuizResults({ score, total, bestScore, onRetry }: QuizResultsProps) {
  const pct = Math.round((score / total) * 100);
  const { message, emoji } = getFeedback(pct);
  const isNewBest = score >= bestScore;

  return (
    <Card padding="lg" className="w-full max-w-2xl mx-auto text-center">
      <div className="text-5xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
      <p className="text-lg text-gray-700 mb-1">
        You scored <span className="font-bold text-green-700">{score}</span> out of{' '}
        <span className="font-bold">{total}</span>
      </p>
      <p className="text-3xl font-bold text-green-700 mb-4">{pct}%</p>

      <ProgressBar value={score} max={total} className="mb-4" />

      <p className="text-gray-600 mb-2">{message}</p>

      {isNewBest && score > 0 && (
        <p className="text-sm font-medium text-amber-600 mb-4">
          New personal best!
        </p>
      )}

      {!isNewBest && bestScore > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          Personal best: {bestScore}/{total} ({Math.round((bestScore / total) * 100)}%)
        </p>
      )}

      <Button onClick={onRetry} className="w-full max-w-xs">
        Try Again
      </Button>
    </Card>
  );
}
