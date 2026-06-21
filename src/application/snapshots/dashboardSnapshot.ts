import { calculateCarbonFootprint } from '../../engines/calculation/calculator';
import { calculateCarbonHealthScore } from '../../engines/score/calculator';
import { generateRecommendations } from '../../engines/recommendation/ranking';
import { calculateBenchmark } from '../../engines/score/benchmark';
import { calculateForecast } from '../../engines/calculation/forecast';
import type { UserProfile, CarbonAssessment, Mission, DailyCheckIn } from '../../types';

export function buildDashboardSnapshot(
  profile: UserProfile,
  assessment: CarbonAssessment,
  activeMissions: Mission[],
  completedMissions: Mission[],
  dailyCheckIns: DailyCheckIn[]
) {
  const footprint = calculateCarbonFootprint(assessment);
  
  const scoreInput = {
    currentFootprint: footprint.totalFootprint,
    completedActions: completedMissions.length,
    assignedActions: activeMissions.length + completedMissions.length
  };
  const scoreOutput = calculateCarbonHealthScore(scoreInput);

  const progressSummary = {
    currentStreak: dailyCheckIns.filter(c => c.completed).length,
    longestStreak: dailyCheckIns.filter(c => c.completed).length
  };

  const topRecommendations = generateRecommendations(assessment, profile).slice(0, 3);

  const benchmark = calculateBenchmark(scoreOutput.carbonHealthScore);

  const forecast = calculateForecast({
    currentFootprint: footprint.totalFootprint,
    activeMissions,
    historicalCompletionRate: dailyCheckIns.filter(c => c.completed).length / Math.max(1, dailyCheckIns.length),
    streakLength: progressSummary.currentStreak,
  });

  let highestCategory = '';
  let highestPercentage = 0;
  let maxAmount = 0;
  
  if (footprint.breakdown && footprint.totalFootprint > 0) {
    for (const [category, amount] of Object.entries(footprint.breakdown)) {
      if (typeof amount === 'number' && amount > maxAmount) {
        maxAmount = amount;
        highestCategory = category;
        highestPercentage = Math.round((amount / footprint.totalFootprint) * 100);
      }
    }
  }

  const footprintInsights = {
    highestCategory,
    highestPercentage
  };

  return {
    isReady: true,
    footprint,
    scoreOutput,
    progressSummary,
    topRecommendations,
    activeMissions,
    benchmark,
    forecast,
    footprintInsights
  };
}
