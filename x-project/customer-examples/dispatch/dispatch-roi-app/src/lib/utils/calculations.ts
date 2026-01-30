/**
 * Utility functions for calculating ROI metrics and scenario impacts
 */

import type { Department, Scenario, DispatchData } from '../types';

/**
 * Calculate savings for a department in a given scenario
 */
export function calculateDepartmentSavings(
  department: Department,
  scenario: Scenario,
  aiScenarios: DispatchData['aiScenarios']
): number {
  const impactRate = aiScenarios.departmentImpact[department.id]?.[scenario] || 0;
  return department.annualSpend * impactRate;
}

/**
 * Calculate total savings across all departments for a scenario
 */
export function calculateTotalSavings(
  departments: Department[],
  scenario: Scenario,
  aiScenarios: DispatchData['aiScenarios']
): number {
  return departments.reduce((total, dept) => {
    return total + calculateDepartmentSavings(dept, scenario, aiScenarios);
  }, 0);
}

/**
 * Calculate variance from benchmark (as percentage points)
 */
export function calculateVarianceFromBenchmark(
  current: number,
  benchmark: number
): number {
  return ((current - benchmark) / benchmark) * 100;
}

/**
 * Calculate EV gain for a scenario at a given multiple
 */
export function calculateEVGain(
  scenarioEbitda: number,
  baselineEbitda: number,
  multiple: number
): number {
  return (scenarioEbitda - baselineEbitda) * multiple;
}

/**
 * Calculate EV return multiple (how much EV created per $1 invested)
 */
export function calculateEVReturnMultiple(
  evGain: number,
  investment: number
): number {
  if (investment === 0) return 0;
  return evGain / investment;
}

/**
 * Determine if a scenario exceeds Rule of 40 threshold
 */
export function exceedsRuleOf40(ruleOf40Value: number): boolean {
  return ruleOf40Value >= 0.40;
}

/**
 * Get color based on Rule of 40 score
 */
export function getRuleOf40Color(ruleOf40Value: number): string {
  if (ruleOf40Value >= 0.50) return 'text-accent-green';
  if (ruleOf40Value >= 0.40) return 'text-accent-blue';
  if (ruleOf40Value >= 0.30) return 'text-accent-yellow';
  return 'text-accent-red';
}

/**
 * Calculate percentage of target achieved
 */
export function calculateTargetProgress(current: number, target: number): number {
  return (current / target) * 100;
}
