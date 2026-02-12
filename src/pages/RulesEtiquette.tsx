import { useState } from 'react';
import { Tabs } from '../components/ui';
import { RuleCard } from '../components/rules/RuleCard';
import { ScenarioQuiz } from '../components/rules/ScenarioQuiz';
import { rules, etiquette } from '../data/rules';

const tabs = [
  { id: 'rules', label: 'Rules' },
  { id: 'etiquette', label: 'Etiquette' },
  { id: 'quiz', label: 'Quiz' },
];

export function RulesEtiquette() {
  const [activeTab, setActiveTab] = useState('rules');

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
        Rules &amp; Etiquette
      </h1>
      <p className="text-gray-600 mb-6">
        Learn the essential rules and on-course etiquette every golfer should know.
      </p>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
        {activeTab === 'rules' && (
          <div className="space-y-3">
            {rules.map((rule) => (
              <RuleCard
                key={rule.id}
                title={rule.title}
                icon={rule.icon}
                summary={rule.summary}
                details={rule.details}
                penaltyStrokes={rule.penaltyStrokes}
                tip={rule.tip}
              />
            ))}
          </div>
        )}

        {activeTab === 'etiquette' && (
          <div className="space-y-3">
            {etiquette.map((item) => (
              <RuleCard
                key={item.id}
                title={item.title}
                icon={item.icon}
                summary={item.summary}
                details={item.details}
                tip={item.tip}
              />
            ))}
          </div>
        )}

        {activeTab === 'quiz' && <ScenarioQuiz />}
      </Tabs>
    </div>
  );
}
