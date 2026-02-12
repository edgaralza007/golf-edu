import { CATEGORIES, type TermCategory } from '../../data/glossary';

interface CategoryFilterProps {
  selected: TermCategory | 'All';
  onChange: (category: TermCategory | 'All') => void;
}

const categoryColors: Record<TermCategory | 'All', string> = {
  All: 'bg-green-700 text-white',
  Scoring: 'bg-amber-100 text-amber-800',
  'Course Features': 'bg-emerald-100 text-emerald-800',
  'Shot Types': 'bg-blue-100 text-blue-800',
  Equipment: 'bg-purple-100 text-purple-800',
  'Game Formats': 'bg-rose-100 text-rose-800',
  General: 'bg-gray-100 text-gray-700',
};

const categoryColorsActive: Record<TermCategory | 'All', string> = {
  All: 'bg-green-700 text-white ring-2 ring-green-500 ring-offset-2',
  Scoring: 'bg-amber-600 text-white ring-2 ring-amber-400 ring-offset-2',
  'Course Features': 'bg-emerald-600 text-white ring-2 ring-emerald-400 ring-offset-2',
  'Shot Types': 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2',
  Equipment: 'bg-purple-600 text-white ring-2 ring-purple-400 ring-offset-2',
  'Game Formats': 'bg-rose-600 text-white ring-2 ring-rose-400 ring-offset-2',
  General: 'bg-gray-600 text-white ring-2 ring-gray-400 ring-offset-2',
};

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const options: (TermCategory | 'All')[] = ['All', ...CATEGORIES];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
      {options.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            selected === cat ? categoryColorsActive[cat] : categoryColors[cat]
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export function getCategoryBadgeColor(category: TermCategory): string {
  const map: Record<TermCategory, string> = {
    Scoring: 'bg-amber-100 text-amber-800',
    'Course Features': 'bg-emerald-100 text-emerald-800',
    'Shot Types': 'bg-blue-100 text-blue-800',
    Equipment: 'bg-purple-100 text-purple-800',
    'Game Formats': 'bg-rose-100 text-rose-800',
    General: 'bg-gray-100 text-gray-700',
  };
  return map[category];
}
