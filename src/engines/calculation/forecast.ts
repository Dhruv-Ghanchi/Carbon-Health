import type { Mission } from '../../types';

export interface ForecastInput {
  currentFootprint: number;
  activeMissions: Mission[];
  historicalCompletionRate: number; // calculated as (completedMissions / (completed + abandoned + active))
  streakLength: number;
}

export interface ForecastOutput {
  projectedFootprint: number;
  projectedReduction: number;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
}

export function calculateForecast(input: ForecastInput): ForecastOutput {
  // If completion rate is NaN or invalid, default to 0.5 (50% chance of completion)
  const effectiveRate = (isNaN(input.historicalCompletionRate) || input.historicalCompletionRate === undefined) 
    ? 0.5 
    : Math.max(0, Math.min(1, input.historicalCompletionRate));

  const maxPotentialReduction = input.activeMissions.reduce((acc, mission) => acc + (mission.targetReduction || 0), 0);
  
  const projectedReduction = Number((maxPotentialReduction * effectiveRate).toFixed(2));
  const projectedFootprint = Number(Math.max(0, input.currentFootprint - projectedReduction).toFixed(2));
  
  let confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  if (input.streakLength > 7) {
    confidenceLevel = 'HIGH';
  } else if (input.streakLength >= 3 || input.activeMissions.length > 0) {
    confidenceLevel = 'MEDIUM';
  }

  const ratePercentage = Math.round(effectiveRate * 100);
  
  return {
    projectedFootprint,
    projectedReduction,
    confidenceLevel,
    explanation: `Based on your ${ratePercentage}% mission completion rate, we project you will save ~${projectedReduction} kg CO₂. Confidence is ${confidenceLevel} based on your recent activity streak.`
  };
}
