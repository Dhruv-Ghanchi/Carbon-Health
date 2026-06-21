import { describe, it, expect } from 'vitest';
import { generateRecommendations } from './ranking';
import type { CarbonAssessment, UserProfile } from '../../types';

describe('generateRecommendations', () => {
  it('should generate personalized recommendations based on assessment', () => {
    const assessment: CarbonAssessment = {
      primaryTransport: 'car_gas',
      commuteDistance: '15_to_30',
      acUsage: 'always',
      meatConsumption: 'daily',
      recyclingHabits: 'rarely',
      publicTransportUsage: 'never',
      electricitySavingHabits: 'low',
      createdAt: new Date().toISOString(),
      householdSize: 1
    };
    
    const user: UserProfile = {
      id: 'test-user',
      name: 'Test',
      motivationLevel: 'casual',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const recommendations = generateRecommendations(assessment, user);
    expect(recommendations.length).toBeGreaterThan(0);
    // Since motivation is casual, we should see easy or medium difficulty
    const allValidDifficulties = recommendations.every(r => ['easy', 'medium'].includes(r.difficulty));
    expect(allValidDifficulties).toBe(true);
  });
});
