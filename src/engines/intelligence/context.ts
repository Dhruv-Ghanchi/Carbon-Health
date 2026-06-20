import type { UserProfile, DailyCheckIn } from '../../types';
import type { IntelligenceContext } from './types';

export function buildIntelligenceContext(
  profile: UserProfile,
  history: DailyCheckIn[]
): IntelligenceContext {
  const checkIns = history; 
  const successRate = checkIns.length > 0 
    ? checkIns.filter(c => c.completed).length / checkIns.length 
    : 1.0;

  const engagementLevel = checkIns.length >= 5 ? 'HIGH' : checkIns.length >= 2 ? 'MEDIUM' : 'LOW';

  const trendDelta = 0; 

  return {
    motivation: profile.motivationLevel || 'casual',
    engagementLevel,
    missionSuccessRate: successRate,
    trendDelta
  };
}
