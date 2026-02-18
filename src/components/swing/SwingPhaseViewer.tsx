import { Button } from '../ui/Button';

interface SwingPhaseViewerProps {
  currentPhase: number;
  totalPhases: number;
  phaseName: string;
  autoPlay: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  onToggleAutoPlay: () => void;
}

const phaseLabels = ['Setup', 'Backswing', 'Downswing', 'Impact', 'Follow-through'];

export function SwingPhaseViewer({
  currentPhase,
  totalPhases,
  phaseName,
  autoPlay,
  onPrevious,
  onNext,
  onSelect,
  onToggleAutoPlay,
}: SwingPhaseViewerProps) {
  return (
    <div>
      {/* Phase indicator dots */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: totalPhases }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Go to phase: ${phaseLabels[i] ?? i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentPhase
                ? 'bg-green-600 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Phase name */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
        Phase {currentPhase + 1} of {totalPhases}
      </p>
      <h3 className="text-center text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">{phaseName}</h3>

      {/* Previous / Next / Auto-play controls */}
      <div className="flex items-center justify-between mt-5 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={currentPhase === 0}
          className="min-w-[100px]"
        >
          &larr; Prev
        </Button>
        <button
          onClick={onToggleAutoPlay}
          aria-label={autoPlay ? 'Pause auto-play' : 'Start auto-play'}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
            autoPlay
              ? 'bg-green-700 text-white hover:bg-green-800'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {autoPlay ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={currentPhase === totalPhases - 1}
          className="min-w-[100px]"
        >
          Next &rarr;
        </Button>
      </div>
    </div>
  );
}
