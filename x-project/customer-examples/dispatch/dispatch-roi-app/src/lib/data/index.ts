/**
 * Data access layer for Dispatch ROI data
 */

import dispatchRoiData from './dispatch-roi.json';
import type { DispatchData, Department, Scenario } from '../types';

// Cast the imported JSON to our TypeScript type
export const data: DispatchData = dispatchRoiData as DispatchData;

// Convenience getter functions
export const getCompanyData = () => data.company;

export const getDepartments = () => data.departments;

export const getIndustryBenchmarks = () => data.industryBenchmarks;

export const getAIScenarios = () => data.aiScenarios;

export const getProjectedOutcomes = () => data.projectedOutcomes;

export const getEnterpriseValueImpact = () => data.enterpriseValueImpact;

export const getMarketEvidence = () => data.marketEvidence;

// Specific department lookups
export const getDepartmentById = (id: string): Department | undefined => {
  return data.departments.find(dept => dept.id === id);
};

export const getDepartmentsByAssessment = (assessment: string): Department[] => {
  return data.departments.filter(dept =>
    dept.assessment.toLowerCase() === assessment.toLowerCase()
  );
};

// Scenario data helpers
export const getScenarioDefinition = (scenario: Scenario) => {
  return data.aiScenarios.definitions.find(def => def.id === scenario);
};

export const getScenarioOutcome = (scenario: Scenario) => {
  return data.projectedOutcomes.scenarios[scenario];
};

export const getBaselineOutcome = () => {
  return data.projectedOutcomes.scenarios.baseline;
};

// EV helpers
export const getEVByMultiple = (scenario: Scenario, multiple: 8 | 10 | 12) => {
  const scenarioEV = data.enterpriseValueImpact.evByScenario[scenario];
  const key = `ev${multiple}x` as 'ev8x' | 'ev10x' | 'ev12x';
  return scenarioEV[key];
};

export const getBaselineEV = (multiple: 8 | 10 | 12) => {
  return data.enterpriseValueImpact.baselineEbitda * multiple;
};

export default data;
