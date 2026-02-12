import { Link } from 'react-router-dom';
import { swingTypes } from '../data/swings';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const difficultyBadge: Record<string, { label: string; variant: 'green' | 'amber' | 'navy' }> = {
  beginner: { label: 'Beginner', variant: 'green' },
  intermediate: { label: 'Intermediate', variant: 'amber' },
  advanced: { label: 'Advanced', variant: 'navy' },
};

export function SwingFundamentals() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Swing Fundamentals</h1>
      <p className="mt-2 text-gray-600">
        Master the five essential golf swings. Tap any swing type to explore each phase in detail.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {swingTypes.map((swing) => {
          const badge = difficultyBadge[swing.difficulty];
          return (
            <Link key={swing.id} to={`/swing-fundamentals/${swing.id}`} className="block group">
              <Card className="h-full transition-shadow group-hover:shadow-md group-hover:border-green-200">
                <div className="text-3xl mb-3">{swing.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    {swing.name}
                  </h2>
                  {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{swing.description}</p>
                <p className="mt-3 text-xs text-gray-400">{swing.phases.length} phases</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
