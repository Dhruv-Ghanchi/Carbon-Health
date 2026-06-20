import type { Mission } from '../../types';
import type { Recommendation } from '../../engines/recommendation/types';

export function buildRecommendationSnapshot(
  activeMissions: Mission[],
  recommendations: Recommendation[]
) {
  return {
    isReady: true,
    recommendations,
    activeCount: activeMissions.length
  };
}
