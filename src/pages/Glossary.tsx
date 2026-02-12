import { useState, useEffect, useMemo, useCallback, useRef, createRef } from 'react';
import { useLocation } from 'react-router-dom';
import { glossaryTerms, type TermCategory, type GlossaryTerm } from '../data/glossary';
import { GlossarySearch } from '../components/glossary/GlossarySearch';
import { CategoryFilter } from '../components/glossary/CategoryFilter';
import { AlphabetIndex } from '../components/glossary/AlphabetIndex';
import { TermCard } from '../components/glossary/TermCard';

function groupByLetter(terms: GlossaryTerm[]): Map<string, GlossaryTerm[]> {
  const groups = new Map<string, GlossaryTerm[]>();
  for (const term of terms) {
    const letter = term.term[0].toUpperCase();
    const arr = groups.get(letter) ?? [];
    arr.push(term);
    groups.set(letter, arr);
  }
  return new Map([...groups.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

export function Glossary() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<TermCategory | 'All'>('All');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const termRefs = useRef<Map<string, React.RefObject<HTMLDivElement | null>>>(new Map());

  function getTermRef(id: string) {
    if (!termRefs.current.has(id)) {
      termRefs.current.set(id, createRef<HTMLDivElement>());
    }
    return termRefs.current.get(id)!;
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return glossaryTerms
      .filter((t) => {
        if (category !== 'All' && t.category !== category) return false;
        if (q) {
          return (
            t.term.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [search, category]);

  const grouped = useMemo(() => groupByLetter(filtered), [filtered]);

  const availableLetters = useMemo(
    () => new Set([...grouped.keys()]),
    [grouped]
  );

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      scrollToTerm(hash);
    }
  }, [location.hash]);

  const scrollToTerm = useCallback((id: string) => {
    setHighlightedId(id);
    requestAnimationFrame(() => {
      const ref = termRefs.current.get(id);
      ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    setTimeout(() => setHighlightedId(null), 2000);
  }, []);

  const handleTermClick = useCallback(
    (id: string) => {
      setSearch('');
      setCategory('All');
      window.history.replaceState(null, '', `#${id}`);
      setTimeout(() => scrollToTerm(id), 50);
    },
    [scrollToTerm]
  );

  const handleLetterClick = useCallback((letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Golf Glossary
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            {glossaryTerms.length} essential golf terms every beginner should know
          </p>
        </div>
      </div>

      {/* Search & Filters - sticky */}
      <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 space-y-3">
          <GlossarySearch value={search} onChange={setSearch} />
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Alphabet sidebar - desktop only */}
          <aside className="hidden md:block sticky top-36 self-start">
            <AlphabetIndex
              availableLetters={availableLetters}
              onSelect={handleLetterClick}
            />
          </aside>

          {/* Alphabet bar - mobile only */}
          <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-2 py-1.5 md:hidden">
            <div className="flex justify-between overflow-x-auto">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
                const available = availableLetters.has(letter);
                return (
                  <button
                    key={letter}
                    disabled={!available}
                    onClick={() => handleLetterClick(letter)}
                    className={`w-7 h-7 flex items-center justify-center rounded text-xs font-semibold ${
                      available
                        ? 'text-gray-700 active:bg-green-100'
                        : 'text-gray-300'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Term list */}
          <div className="flex-1 space-y-8 pb-16 md:pb-6">
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No terms found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}

            {[...grouped.entries()].map(([letter, terms]) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="text-xl font-bold text-green-700 mb-3 scroll-mt-36">
                  {letter}
                </h2>
                <div className="space-y-3">
                  {terms.map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      highlighted={highlightedId === term.id}
                      cardRef={getTermRef(term.id)}
                      onTermClick={handleTermClick}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
