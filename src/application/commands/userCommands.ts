import { useUserStore } from '../../stores';
import type { UserProfile, CarbonAssessment } from '../../types';

export function saveOnboardingDataCommand(profile: UserProfile, assessment: CarbonAssessment) {
  const store = useUserStore.getState();
  store.setProfile(profile);
  store.setAssessment(assessment);
}
