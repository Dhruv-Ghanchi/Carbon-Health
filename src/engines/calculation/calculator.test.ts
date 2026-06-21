import { describe, it, expect } from 'vitest';
import { calculateCarbonFootprint } from './calculator';
import type { CarbonAssessment } from '../../types';

describe('calculateCarbonFootprint', () => {
  it('should calculate the baseline footprint correctly', () => {
    const assessment: CarbonAssessment = {
      primaryTransport: 'car_gas',
      commuteDistance: '15_to_30',
      acUsage: 'sometimes',
      meatConsumption: 'daily',
      recyclingHabits: 'sometimes',
      publicTransportUsage: 'sometimes',
      electricitySavingHabits: 'medium',
      createdAt: new Date().toISOString(),
      householdSize: 1
    };
    
    const result = calculateCarbonFootprint(assessment);
    expect(result.totalFootprint).toBeGreaterThan(0);
    expect(result.breakdown.transport).toBeGreaterThan(0);
    expect(result.breakdown.diet).toBeGreaterThan(0);
  });
});
