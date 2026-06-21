import type { UserProfile } from '../../types';

const MOTIVATION_LABELS: Record<string, string> = {
  casual: 'Casual',
  steady: 'Steady Progress',
  urgent: 'Highly Committed'
};

export function useProfileSnapshot(rawState: { profile: UserProfile | null }) {
  if (!rawState.profile) {
    return {
      isReady: false,
      profile: null,
      motivationLabel: ''
    };
  }

  return {
    isReady: true,
    profile: rawState.profile,
    motivationLabel: MOTIVATION_LABELS[rawState.profile.motivationLevel] || rawState.profile.motivationLevel
  };
}
