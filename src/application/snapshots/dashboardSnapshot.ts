import { calculateCarbonFootprint } from '../../engines/calculation/calculator';
import { calculateCarbonHealthScore } from '../../engines/score/calculator';
import { generateRecommendations } from '../../engines/recommendation/ranking';
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

  return {
    isReady: true,
    footprint,
    scoreOutput,
    progressSummary,
    topRecommendations,
    activeMissions
  };
}
