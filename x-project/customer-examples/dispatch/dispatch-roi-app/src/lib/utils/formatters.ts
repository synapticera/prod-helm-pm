/**
 * Utility functions for formatting numbers, currency, and percentages
 */

/**
 * Format a number as currency (e.g., $5,800,000 → $5.8M)
 */
export function formatCurrency(value: number, compact: boolean = true): string {
  if (compact) {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a decimal as a percentage (e.g., 0.157 → 15.7%)
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a large number with commas (e.g., 25686093 → 25,686,093)
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Format an ROI multiple (e.g., 6.15 → 6.2x)
 */
export function formatMultiple(value: number): string {
  return `${value.toFixed(1)}x`;
}

/**
 * Calculate and format the variance from a benchmark
 * Returns a string like "+3.2%" or "-1.5%"
 */
export function formatVariance(current: number, benchmark: number): string {
  const variance = ((current - benchmark) / benchmark) * 100;
  const sign = variance >= 0 ? '+' : '';
  return `${sign}${variance.toFixed(1)}%`;
}

/**
 * Get color class for assessment badges
 */
export function getAssessmentColor(assessment: string): string {
  switch (assessment.toLowerCase()) {
    case 'at benchmark':
      return 'bg-accent-green/10 text-accent-green border-accent-green/20';
    case 'above median':
      return 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20';
    case 'below median':
      return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20';
    default:
      return 'bg-surface text-text-secondary border-border';
  }
}

/**
 * Get scenario badge color
 */
export function getScenarioColor(scenario: string): string {
  switch (scenario.toLowerCase()) {
    case 'conservative':
      return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20';
    case 'moderate':
      return 'bg-accent-green/10 text-accent-green border-accent-green/20';
    case 'aggressive':
      return 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20';
    case 'transformed':
      return 'bg-accent-red/10 text-accent-red border-accent-red/20';
    default:
      return 'bg-surface text-text-secondary border-border';
  }
}

/**
 * Format currency in accounting notation (negative values in parentheses)
 * Returns object with formatted string and whether it's negative (for styling)
 */
export function formatAccounting(value: number, compact: boolean = true): { text: string; isNegative: boolean } {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  let formatted: string;
  if (compact) {
    if (absValue >= 1_000_000) {
      formatted = `$${(absValue / 1_000_000).toFixed(1)}M`;
    } else if (absValue >= 1_000) {
      formatted = `$${(absValue / 1_000).toFixed(1)}K`;
    } else {
      formatted = `$${absValue.toFixed(0)}`;
    }
  } else {
    formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(absValue);
  }

  return {
    text: isNegative ? `(${formatted})` : formatted,
    isNegative
  };
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
