import { buildRecommendationSnapshot } from './recommendationSnapshot';
import { buildIntelligenceContext } from '../../engines/intelligence/context';
import { applyBehavioralAdaptation } from '../../engines/intelligence/adaptation';
import { applyRecommendationAdapter } from '../../engines/intelligence/recommendationAdapter';
import { getCurrentWeekContext } from '../dateContext';
import type { UserProfile, CarbonAssessment, DailyCheckIn, Mission } from '../../types';

interface RecRawState {
  profile: UserProfile;
  assessment: CarbonAssessment;
  activeMissions: Mission[];
  completedMissions: Mission[];
  archivedMissions: Mission[];
  history?: DailyCheckIn[];
}

export function useRecommendationSnapshot(rawState: RecRawState) {
  const dateISO = new Date().toISOString();
  const { weekStart } = getCurrentWeekContext(dateISO);

  const checkIns = rawState.history || [];
  const intelContext = buildIntelligenceContext(rawState.profile, checkIns);
  const adaptation = applyBehavioralAdaptation(intelContext);
  
  const adaptedRecommendations = applyRecommendationAdapter(
    rawState.profile,
    rawState.assessment,
    rawState.activeMissions,
    rawState.completedMissions,
    rawState.archivedMissions,
    adaptation,
    weekStart
  );

  return buildRecommendationSnapshot(
    rawState.activeMissions,
    adaptedRecommendations
  );
}
