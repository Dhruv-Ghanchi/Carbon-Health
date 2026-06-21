import { describe, it, expect } from 'vitest';
import { calculateCarbonHealthScore } from './calculator';

describe('calculateCarbonHealthScore', () => {
  it('should prorate the score correctly if no actions are assigned (newbie)', () => {
    const input = {
      currentFootprint: 1000,
      completedActions: 0,
      assignedActions: 0
    };
    const result = calculateCarbonHealthScore(input);
    expect(result.carbonHealthScore).toBeGreaterThanOrEqual(0);
    expect(result.carbonHealthScore).toBeLessThanOrEqual(100);
    expect(result.statusLevel).toBeDefined();
  });

  it('should calculate the score accurately with actions assigned', () => {
    const input = {
      currentFootprint: 800,
      completedActions: 5,
      assignedActions: 10
    };
    const result = calculateCarbonHealthScore(input);
    expect(result.carbonHealthScore).toBeGreaterThan(0);
    expect(result.explanation.actionContribution).toBe(20); // 5/10 * 40 (SCORE_WEIGHTS.ACTION)
  });
});
