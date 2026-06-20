import { buildIntelligenceContext } from '../context';
import { applyBehavioralAdaptation } from '../adaptation';
import { generateInsights } from '../insights';
import { buildUnifiedNarrative } from '../narrative';
import { applyRecommendationAdapter } from '../recommendationAdapter';
import type { DashboardRawState } from '../../../application/snapshots/useDashboardSnapshot';
import type { UnifiedNarrative } from '../types';
import type { Recommendation } from '../../recommendation/types';

export interface IntelligencePipelineResult {
  narrative: UnifiedNarrative;
  adaptedRecommendations: Recommendation[];
}

export function buildDashboardIntelligencePipeline(
  rawState: DashboardRawState,
  weekStart: string
): IntelligencePipelineResult {
  if (!rawState.profile || !rawState.assessment) {
    return {
      narrative: { headline: '', subheadline: '', tone: '', insights: [] },
      adaptedRecommendations: []
    };
  }

  // 2. Build Intelligence Context
  const intelContext = buildIntelligenceContext(rawState.profile, rawState.dailyCheckIns);

  // 3. Apply Behavioral Adaptation
  const adaptation = applyBehavioralAdaptation(intelContext);

  // 4. Apply Fatigue Model (already handled internally by recommendationAdapter, but called here if we wanted to extract it, we'll let adapter handle it, or we explicitly pass it)
  // 5. Generate Insights
  const insights = generateInsights(intelContext);

  // 6. Generate Narrative
  const narrative = buildUnifiedNarrative(adaptation, insights);

  // 7. Apply Recommendation Adapter
  const adaptedRecommendations = applyRecommendationAdapter(
    rawState.profile,
    rawState.assessment,
    rawState.activeMissions,
    rawState.completedMissions,
    rawState.archivedMissions || [],
    adaptation,
    weekStart
  );

  // 8. Return a SINGLE structured intelligence object
  return {
    narrative,
    adaptedRecommendations
  };
}
