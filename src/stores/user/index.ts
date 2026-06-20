import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, omitHydration } from '../shared';
import type { HydrationState } from '../shared';
import type { UserProfile, CarbonAssessment } from '../../types';

interface UserState extends HydrationState {
  profile: UserProfile | null;
  assessment: CarbonAssessment | null;
  
  setProfile: (profile: UserProfile) => void;
  setAssessment: (assessment: CarbonAssessment) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      profile: null,
      assessment: null,
      
      setProfile: (profile) => set({ profile }),
      setAssessment: (assessment) => set({ assessment }),
      resetUser: () => set({ profile: null, assessment: null }),
    }),
    {
      name: STORAGE_KEYS.USER,
      partialize: omitHydration,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
