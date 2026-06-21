import type { IntelligencePipelineResult } from '../../engines/intelligence/pipeline/buildDashboardIntelligencePipeline';
import type { buildDashboardSnapshot } from '../snapshots/dashboardSnapshot';

type BaseDashboard = ReturnType<typeof buildDashboardSnapshot>;

export function buildDashboardViewModel(
  base: BaseDashboard | null,
  intelligence: IntelligencePipelineResult
) {
  if (!base) {
    return {
      isReady: false,
      footprint: { totalFootprint: 0, personalEmissions: 0, sharedEmissions: 0, breakdown: { transport: 0, commute: 0, diet: 0, ac: 0, electricity: 0, consumption: 0 }, biggestContributor: 'transport' },
      scoreOutput: { carbonHealthScore: 0, statusLevel: 'Carbon Beginner' as const, explanation: { baselineContribution: 0, trendContribution: 0, actionContribution: 0 }, nextTier: 'Eco Explorer' as const, pointsToNextTier: 40, progressPercentage: 0 },
      progressSummary: { currentStreak: 0, longestStreak: 0 },
      topRecommendations: intelligence.adaptedRecommendations,
      activeMissions: [],
      narrative: intelligence.narrative,
      benchmark: { percentileRank: 10, percentileText: 'Bottom 40%', explanation: '' },
      forecast: { projectedFootprint: 0, projectedReduction: 0, confidenceLevel: 'LOW' as const, explanation: '' },
      footprintInsights: { highestCategory: '', highestPercentage: 0, equivalentsText: '' },
      impactMetrics: { baselineFootprint: 0, completedReduction: 0, projectedFootprint: 0 }
    };
  }

  return {
    ...base,
    topRecommendations: intelligence.adaptedRecommendations.length > 0 
      ? intelligence.adaptedRecommendations 
      : base.topRecommendations,
    narrative: intelligence.narrative
  };
}
