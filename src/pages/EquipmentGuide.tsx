import { useState } from 'react';
import { Tabs } from '../components/ui';
import { ClubTypeCard } from '../components/equipment/ClubTypeCard';
import { BudgetSelector } from '../components/equipment/BudgetSelector';
import { GolfBagDiagram } from '../components/equipment/GolfBagDiagram';
import { ClubAnatomy } from '../components/equipment/ClubAnatomy';
import { clubTypes } from '../data/equipment';

const tabs = [
  { id: 'clubs', label: 'Club Types' },
  { id: 'budget', label: 'Budget Guide' },
  { id: 'bag', label: 'Bag Layout' },
  { id: 'anatomy', label: 'Club Anatomy' },
];

export function EquipmentGuide() {
  const [activeTab, setActiveTab] = useState('clubs');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Golf Equipment Guide</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Everything a beginner needs to know about golf clubs and gear.
          </p>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
          {activeTab === 'clubs' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Each club is designed for a specific purpose. Tap a card to see more details and beginner tips.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {clubTypes.map((club) => (
                  <ClubTypeCard key={club.id} club={club} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'budget' && <BudgetSelector />}
          {activeTab === 'bag' && <GolfBagDiagram />}
          {activeTab === 'anatomy' && <ClubAnatomy />}
        </Tabs>
      </div>
    </div>
  );
}
