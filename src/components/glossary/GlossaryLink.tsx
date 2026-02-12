import type { ReactNode } from 'react';
import { glossaryMap } from '../../data/glossary';

interface GlossaryLinkProps {
  /** The glossary term ID (slug) to link to */
  termId: string;
  /** Optional custom children; defaults to the term name */
  children?: ReactNode;
  className?: string;
}

/**
 * Reusable link component that navigates to a glossary term.
 * Use from any module to create a clickable reference to a glossary entry.
 *
 * Usage:
 *   <GlossaryLink termId="birdie" />
 *   <GlossaryLink termId="par">learn about par</GlossaryLink>
 */
export function GlossaryLink({ termId, children, className = '' }: GlossaryLinkProps) {
  const term = glossaryMap.get(termId);
  const label = children ?? term?.term ?? termId;

  return (
    <a
      href={`/glossary#${termId}`}
      className={`text-green-700 hover:text-green-900 underline decoration-dotted underline-offset-2 font-medium ${className}`}
      title={term?.definition}
    >
      {label}
    </a>
  );
}
