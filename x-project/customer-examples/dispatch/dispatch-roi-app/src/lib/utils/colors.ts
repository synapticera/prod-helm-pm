/**
 * Color mapping and utilities for visual hierarchy
 * Based on Synaptic design system
 */

/**
 * Department color mapping for visual coding
 */
export const departmentColors = {
  css: '#FB4100',      // Orange - highest priority/impact
  rd: '#01A9DB',       // Teal - strategic investment
  sales: '#10B981',    // Green - growth driver
  marketing: '#F59E0B',// Yellow - amplification
  ga: '#8BA4C4',       // Blue-gray - support function
  cogs: '#5A7A9C',     // Muted gray - infrastructure
} as const;

/**
 * Get color for a department by ID
 */
export function getDepartmentColor(deptId: string): string {
  return departmentColors[deptId as keyof typeof departmentColors] || '#8BA4C4';
}

/**
 * Get contrasting text color for department backgrounds
 */
export function getDepartmentTextColor(deptId: string): string {
  // All department colors are vibrant enough to use white text
  return '#FFFFFF';
}

/**
 * Get glow effect color for department
 */
export function getDepartmentGlow(deptId: string): string {
  const color = getDepartmentColor(deptId);
  // Convert hex to rgba for glow
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `0 0 10px rgba(${r}, ${g}, ${b}, 0.4)`;
}

/**
 * Scenario color mapping
 */
export const scenarioColors = {
  conservative: '#01A9DB',  // Teal - safe bet
  moderate: '#10B981',      // Green - balanced
  aggressive: '#F59E0B',    // Yellow/Orange - bold
  transformed: '#FB4100',   // Orange-red - visionary
} as const;

/**
 * Get color for a scenario
 */
export function getScenarioColor(scenario: string): string {
  return scenarioColors[scenario as keyof typeof scenarioColors] || '#8BA4C4';
}

/**
 * Heat map color based on value and range
 * Returns background color for table cells
 */
export function getHeatMapColor(value: number, min: number, max: number): string {
  const normalized = (value - min) / (max - min);

  if (normalized < 0.25) {
    return 'rgba(239, 68, 68, 0.1)';  // Red tint for low values
  } else if (normalized < 0.5) {
    return 'rgba(245, 158, 11, 0.1)'; // Yellow tint for medium
  } else if (normalized < 0.75) {
    return 'rgba(16, 185, 129, 0.1)'; // Green tint for good
  } else {
    return 'rgba(1, 169, 219, 0.15)'; // Teal tint for excellent
  }
}

/**
 * Get Rule of 40 color based on score
 */
export function getRuleOf40Color(score: number): string {
  if (score >= 0.50) return '#10B981';  // Green - excellent
  if (score >= 0.40) return '#00D4FF';  // Teal - target met
  if (score >= 0.30) return '#F59E0B';  // Yellow - approaching
  return '#EF4444';                      // Red - needs work
}
