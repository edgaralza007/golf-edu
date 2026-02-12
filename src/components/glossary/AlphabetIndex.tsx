interface AlphabetIndexProps {
  availableLetters: Set<string>;
  activeLetter?: string;
  onSelect: (letter: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function AlphabetIndex({ availableLetters, activeLetter, onSelect }: AlphabetIndexProps) {
  return (
    <nav
      aria-label="Alphabetical index"
      className="flex flex-wrap gap-1 md:flex-col md:gap-0.5"
    >
      {ALPHABET.map((letter) => {
        const available = availableLetters.has(letter);
        const active = activeLetter === letter;
        return (
          <button
            key={letter}
            disabled={!available}
            onClick={() => onSelect(letter)}
            className={`w-8 h-8 md:w-7 md:h-7 flex items-center justify-center rounded text-xs font-semibold transition-colors ${
              active
                ? 'bg-green-700 text-white'
                : available
                  ? 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  : 'text-gray-300 cursor-default'
            }`}
          >
            {letter}
          </button>
        );
      })}
    </nav>
  );
}
