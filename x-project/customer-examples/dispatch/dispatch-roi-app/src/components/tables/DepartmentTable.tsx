'use client';

import { useState } from 'react';
import { useScenario } from '@/lib/hooks/useScenario';
import { getDepartments, getAIScenarios, getMarketEvidence } from '@/lib/data';
import { formatCurrency, formatPercent, formatVariance, getAssessmentColor } from '@/lib/utils/formatters';
import { calculateDepartmentSavings } from '@/lib/utils/calculations';
import { getDepartmentColor } from '@/lib/utils/colors';
import AnimatedNumber from '@/components/shared/AnimatedNumber';
import Badge from '@/components/shared/Badge';
import { ChevronDown, Users, Lightbulb, FileText } from 'lucide-react';

export default function DepartmentTable() {
  const { scenario } = useScenario();
  const departments = getDepartments();
  const aiScenarios = getAIScenarios();
  const evidence = getMarketEvidence();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Sort by AI savings potential (descending)
  const sortedDepartments = [...departments]
    .filter(d => d.aiOpportunity)
    .sort((a, b) => {
      const savingsA = calculateDepartmentSavings(a, scenario, aiScenarios);
      const savingsB = calculateDepartmentSavings(b, scenario, aiScenarios);
      return savingsB - savingsA;
    });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2" style={{ borderColor: 'var(--border-strong)' }}>
            <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Department</th>
            <th className="text-right py-4 px-4 text-sm font-semibold text-text-secondary">Annual Spend</th>
            <th className="text-right py-4 px-4 text-sm font-semibold text-text-secondary">vs Benchmark</th>
            <th className="text-right py-4 px-4 text-sm font-semibold text-text-secondary">AI Savings</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {sortedDepartments.map((dept) => {
            const savings = calculateDepartmentSavings(dept, scenario, aiScenarios);
            const impactRate = aiScenarios.departmentImpact[dept.id]?.[scenario] || 0;
            const isExpanded = expandedRow === dept.id;
            const deptColor = getDepartmentColor(dept.id);

            return (
              <>
                {/* Main Row */}
                <tr
                  key={dept.id}
                  onClick={() => setExpandedRow(isExpanded ? null : dept.id)}
                  className="border-b border-border hover:bg-surface-hover transition-all cursor-pointer group"
                  style={{ borderLeft: `4px solid ${deptColor}` }}
                >
                  <td className="py-4 px-6">
                    <div className="font-semibold text-text-primary">{dept.name}</div>
                    {dept.headcount && (
                      <div className="text-sm text-text-tertiary flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        {dept.headcount} FTEs
                      </div>
                    )}
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="font-bold text-text-primary">{formatCurrency(dept.annualSpend)}</div>
                    <div className="text-xs text-text-tertiary">{formatPercent(dept.percentOfRevenue)} of revenue</div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={dept.assessment.includes('Above') ? 'warning' : dept.assessment.includes('Below') ? 'info' : 'success'}>
                        {dept.assessment}
                      </Badge>
                      <div className="text-xs text-text-tertiary">
                        {formatVariance(dept.percentOfRevenue, dept.benchmark.median)}
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="text-xl font-bold" style={{ color: 'var(--synaptic-teal-bright)' }}>
                      <AnimatedNumber value={savings} formatter={formatCurrency} />
                    </div>
                    <div className="text-xs text-text-tertiary">{formatPercent(impactRate)} efficiency</div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <ChevronDown
                      className={`w-5 h-5 text-text-tertiary group-hover:text-accent-blue transition-all ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </td>
                </tr>

                {/* Expanded Row */}
                {isExpanded && dept.aiOpportunity && (
                  <tr>
                    <td colSpan={5} className="bg-surface-elevated p-0">
                      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Teams */}
                        {dept.teams && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Users className="w-4 h-4 text-accent-blue" />
                              <h4 className="font-semibold text-text-primary">Teams</h4>
                            </div>
                            <div className="space-y-2">
                              {dept.teams.map((team, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 rounded bg-surface border border-border">
                                  <span className="text-sm text-text-primary">{team.name}</span>
                                  <span className="text-sm text-text-secondary">{team.ftes} FTEs</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Use Cases */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-accent-yellow" />
                            <h4 className="font-semibold text-text-primary">AI Use Cases</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {dept.aiOpportunity.useCases.map((useCase, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-xs font-medium rounded-full border"
                                style={{
                                  background: 'var(--synaptic-teal-subtle)',
                                  color: 'var(--synaptic-teal-bright)',
                                  borderColor: 'var(--synaptic-teal)'
                                }}
                              >
                                {useCase}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Evidence */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-accent-green" />
                            <h4 className="font-semibold text-text-primary">Market Evidence</h4>
                          </div>
                          <div className="space-y-2">
                            {dept.aiOpportunity.evidence.slice(0, 3).map((ev, idx) => (
                              <div key={idx} className="text-xs text-text-secondary p-2 rounded bg-surface border-l-2"
                                   style={{ borderLeftColor: deptColor }}>
                                {ev}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
