'use client';

import { useScenario } from '@/lib/hooks/useScenario';
import { getScenarioColor } from '@/lib/utils/formatters';
import type { Scenario } from '@/lib/types';
import { Zap } from 'lucide-react';

const scenarios: { id: Scenario; label: string; description: string }[] = [
  { id: 'conservative', label: 'Conservative', description: '10-15% efficiency' },
  { id: 'moderate', label: 'Moderate', description: '20-30% efficiency' },
  { id: 'aggressive', label: 'Aggressive', description: '35-50% efficiency' },
  { id: 'transformed', label: 'Transformed', description: '50-70% efficiency' },
];

export default function ScenarioSelector() {
  const { scenario, setScenario } = useScenario();

  return (
    <div className="border-b border-border bg-surface/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-yellow/10 rounded-lg">
              <Zap className="w-5 h-5 text-accent-yellow" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                AI Transformation Scenario
              </h2>
              <p className="text-xs text-text-tertiary">
                Select a scenario to see projected outcomes
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`
                  px-4 py-2 rounded-lg border transition-all
                  ${
                    scenario === s.id
                      ? `${getScenarioColor(s.id)} font-semibold ring-2 ring-offset-2 ring-offset-background`
                      : 'bg-surface border-border text-text-secondary hover:bg-surface/80 hover:border-accent-blue/30'
                  }
                `}
              >
                <div className="text-sm">{s.label}</div>
                <div className="text-xs opacity-70">{s.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
