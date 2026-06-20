import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, CarbonAssessment } from '../types';

interface UserState {
  profile: UserProfile | null;
  assessment: CarbonAssessment | null;
  // Placeholder actions
  setProfile: (profile: UserProfile) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      assessment: null,
      setProfile: (profile) => set({ profile }),
      reset: () => set({ profile: null, assessment: null }),
    }),
    {
      name: 'carbon-user-storage',
    }
  )
);
