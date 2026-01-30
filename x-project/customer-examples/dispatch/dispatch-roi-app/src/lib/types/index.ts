// Core Types for Dispatch ROI App

export type Scenario = 'conservative' | 'moderate' | 'aggressive' | 'transformed';

export interface CompanyMetrics {
  totalRevenue: number;
  recurringRevenuePercent: number;
  grossMargin: number;
  ebitda: number;
  ebitdaMargin: number;
  totalEmployees: number;
  arrPerEmployee: number;
  yoyRevenueGrowth: number;
  ruleOf40: number;
}

export interface Company {
  name: string;
  description: string;
  fiscalYear: number;
  metrics: CompanyMetrics;
}

export interface BenchmarkMetric {
  median: number;
  topQuartile: number;
}

export interface IndustryBenchmarks {
  scale: string;
  sources: string[];
  metrics: {
    recurringRevenue: BenchmarkMetric;
    grossMargin: BenchmarkMetric;
    ebitdaMargin: BenchmarkMetric;
    arrPerFte: BenchmarkMetric;
    growthRate: BenchmarkMetric;
    ruleOf40: { target: number; topQuartile: number };
  };
}

export interface Team {
  name: string;
  ftes: number;
  entity?: string;
  breakdown?: string;
}

export interface Subcategory {
  name: string;
  spend: number;
  percentOfRevenue: number;
  benchmarkMedian: number;
  notes: string;
}

export interface AIOpportunity {
  useCases: string[];
  evidence: string[];
}

export interface Department {
  id: string;
  name: string;
  annualSpend: number;
  percentOfRevenue: number;
  benchmark: BenchmarkMetric;
  assessment: string;
  headcount?: number;
  notes: string;
  subcategories?: Subcategory[];
  teams?: Team[];
  aiOpportunity?: AIOpportunity;
}

export interface ScenarioDefinition {
  id: Scenario;
  name: string;
  efficiencyTarget: { min: number; max: number };
  investmentLevel: { min: number; max: number; label: string };
  timeline: string;
  riskProfile: string;
  description: string;
}

export interface AIScenarios {
  definitions: ScenarioDefinition[];
  departmentImpact: {
    [departmentId: string]: {
      conservative: number;
      moderate: number;
      aggressive: number;
      transformed: number;
    };
  };
  investmentRates: {
    conservative: number;
    moderate: number;
    aggressive: number;
    transformed: number;
  };
}

export interface ScenarioOutcome {
  totalSavings: number;
  investment: number;
  netBenefit: number;
  roiMultiple: number;
  paybackPeriod: string;
  fteEquivalent: number;
  newEbitda: number;
  newEbitdaMargin: number;
  newRuleOf40: number;
}

export interface BaselineOutcome {
  ebitda: number;
  ebitdaMargin: number;
  ruleOf40: number;
}

export interface ProjectedOutcomes {
  totalOpEx: number;
  scenarios: {
    baseline: BaselineOutcome;
    conservative: ScenarioOutcome;
    moderate: ScenarioOutcome;
    aggressive: ScenarioOutcome;
    transformed: ScenarioOutcome;
  };
}

export interface EVMultiple {
  multiple: number;
  label: string;
  baselineEv: number;
}

export interface ScenarioEV {
  ebitda: number;
  ev8x: number;
  ev10x: number;
  ev12x: number;
  evGain10x: number;
  evReturnMultiple: number;
}

export interface EnterpriseValueImpact {
  baselineEbitda: number;
  multiples: EVMultiple[];
  evByScenario: {
    conservative: ScenarioEV;
    moderate: ScenarioEV;
    aggressive: ScenarioEV;
    transformed: ScenarioEV;
  };
}

export interface MarketEvidence {
  generalStats: string[];
  byDepartment: {
    [key: string]: string[];
  };
}

export interface DispatchData {
  company: Company;
  industryBenchmarks: IndustryBenchmarks;
  departments: Department[];
  aiScenarios: AIScenarios;
  projectedOutcomes: ProjectedOutcomes;
  enterpriseValueImpact: EnterpriseValueImpact;
  marketEvidence: MarketEvidence;
}
