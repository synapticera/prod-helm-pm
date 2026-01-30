'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import CoreDataTable from '@/components/tables/CoreDataTable';
import EBITDAImpactTable from '@/components/tables/EBITDAImpactTable';
import CashFlowTable from '@/components/tables/CashFlowTable';
import AIRoadmapTable from '@/components/tables/AIRoadmapTable';
import SavingsCompositionChart from '@/components/charts/SavingsCompositionChart';
import SavingsPercentageChart from '@/components/charts/SavingsPercentageChart';
import EBITDAProgressionChart from '@/components/charts/EBITDAProgressionChart';
import EVGrowthChart from '@/components/charts/EVGrowthChart';
import { getDepartments } from '@/lib/data';
import { getDepartmentColor } from '@/lib/utils/colors';

export default function Home() {
  const [activeTab, setActiveTab] = useState('core-data');
  const departments = getDepartments().filter(d => d.aiOpportunity);

  const tabs = [
    { id: 'core-data', label: 'Spend & Savings by Department' },
    { id: 'ebitda-ev', label: 'EBITDA & EV Impact' },
    { id: 'cash-flow', label: 'Cash Flow Analysis' },
    { id: 'ai-roadmap', label: 'AI Roadmap' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 text-sm font-medium border-b-2 transition-all
                  ${activeTab === tab.id
                    ? 'border-accent-blue text-accent-blue'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto py-4" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        {activeTab === 'core-data' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                Department Costs & AI Savings Potential
              </h2>
              <CoreDataTable />
            </div>

            {/* Stacked Area Charts */}
            <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Department Analysis Across Scenarios</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-text-secondary mb-2">Savings by Department ($M)</div>
                  <SavingsCompositionChart />
                </div>

                <div>
                  <div className="text-xs text-text-secondary mb-2">Savings Composition (% of Total Savings)</div>
                  <SavingsPercentageChart />
                </div>
              </div>

              {/* Unified Legend */}
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
                <span className="font-medium text-text-secondary">Departments:</span>
                {departments.map(dept => (
                  <div key={dept.id} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded" style={{ background: getDepartmentColor(dept.id) }} />
                    <span>{dept.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ebitda-ev' && (
          <div className="space-y-5" style={{ paddingLeft: '150px', paddingRight: '150px' }}>
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-2.5">
                EBITDA & Enterprise Value Impact
              </h2>
              <EBITDAImpactTable />
            </div>

            {/* Charts */}
            <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h3 className="text-sm font-semibold text-text-primary mb-3.5">Financial Impact Progression</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <div className="text-xs text-text-secondary mb-1.5">EBITDA Growth Across Scenarios</div>
                  <EBITDAProgressionChart />
                </div>

                <div>
                  <div className="text-xs text-text-secondary mb-1.5">Enterprise Value @ 10x EBITDA</div>
                  <EVGrowthChart multiple={10} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cash-flow' && (
          <div style={{ paddingLeft: '100px', paddingRight: '100px' }}>
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              7-Year Cash Flow Projection (Aggressive Scenario)
            </h2>
            <CashFlowTable />
          </div>
        )}

        {activeTab === 'ai-roadmap' && (
          <AIRoadmapTable />
        )}
      </main>
    </div>
  );
}
