import {
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  LOCATION_LABELS,
  type DrillCategory,
  type DrillLocation,
} from '../../data/drills';

export interface DrillFilterState {
  category: DrillCategory | 'all';
  difficulty: 1 | 2 | 3 | 'all';
  maxMinutes: number | 'all';
  location: DrillLocation | 'all';
  sortBy: 'difficulty' | 'time' | 'category';
  searchQuery: string;
}

interface DrillFiltersProps {
  filters: DrillFilterState;
  onChange: (filters: DrillFilterState) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const categories = Object.entries(CATEGORY_LABELS) as [DrillCategory, string][];
const locations = Object.entries(LOCATION_LABELS) as [DrillLocation, string][];

export function DrillFilters({ filters, onChange, mobileOpen, onMobileClose }: DrillFiltersProps) {
  const update = (patch: Partial<DrillFilterState>) => onChange({ ...filters, ...patch });

  const activeCount = [
    filters.category !== 'all',
    filters.difficulty !== 'all',
    filters.maxMinutes !== 'all',
    filters.location !== 'all',
  ].filter(Boolean).length;

  const panel = (
    <div className="space-y-5">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <div className="relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => update({ searchQuery: e.target.value })}
            placeholder="Search drills..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Category chips */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update({ category: 'all' })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filters.category === 'all'
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            All
          </button>
          {categories.map(([key, label]) => (
            <button
              key={key}
              onClick={() => update({ category: key })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                filters.category === key
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
        <select
          value={String(filters.difficulty)}
          onChange={(e) =>
            update({ difficulty: e.target.value === 'all' ? 'all' : (Number(e.target.value) as 1 | 2 | 3) })
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Levels</option>
          {([1, 2, 3] as const).map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_LABELS[d]}
            </option>
          ))}
        </select>
      </div>

      {/* Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Time</label>
        <select
          value={String(filters.maxMinutes)}
          onChange={(e) =>
            update({ maxMinutes: e.target.value === 'all' ? 'all' : Number(e.target.value) })
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">Any Duration</option>
          <option value="5">5 minutes or less</option>
          <option value="10">10 minutes or less</option>
          <option value="15">15 minutes or less</option>
          <option value="20">20 minutes or less</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <select
          value={filters.location}
          onChange={(e) => update({ location: e.target.value as DrillLocation | 'all' })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">Any Location</option>
          {locations.map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as DrillFilterState['sortBy'] })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="difficulty">Difficulty</option>
          <option value="time">Time</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* Reset */}
      {activeCount > 0 && (
        <button
          onClick={() =>
            onChange({
              category: 'all',
              difficulty: 'all',
              maxMinutes: 'all',
              location: 'all',
              sortBy: 'difficulty',
              searchQuery: '',
            })
          }
          className="w-full text-sm text-green-700 font-medium hover:text-green-800 py-1"
        >
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile slide-out panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={onMobileClose} />
      )}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">{panel}</div>
      </aside>

      {/* Desktop sidebar filter */}
      <aside className="hidden md:block w-64 shrink-0">{panel}</aside>
    </>
  );
}
