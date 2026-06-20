import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, omitHydration } from '../shared';
import type { HydrationState } from '../shared';
import type { UserProgress, DailyCheckIn, WeeklyReview, JourneyEvent } from '../../types';

interface ProgressState extends HydrationState {
  userProgress: UserProgress | null;
  dailyCheckIns: DailyCheckIn[];
  weeklyReviews: WeeklyReview[];
  journeyEvents: JourneyEvent[];
  
  setUserProgress: (progress: UserProgress) => void;
  addDailyCheckIn: (checkIn: DailyCheckIn) => void;
  addWeeklyReview: (review: WeeklyReview) => void;
  addJourneyEvent: (event: JourneyEvent) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      userProgress: null,
      dailyCheckIns: [],
      weeklyReviews: [],
      journeyEvents: [],
      
      setUserProgress: (progress) => set({ userProgress: progress }),
      addDailyCheckIn: (checkIn) => set((state) => ({ dailyCheckIns: [...state.dailyCheckIns, checkIn] })),
      addWeeklyReview: (review) => set((state) => ({ weeklyReviews: [...state.weeklyReviews, review] })),
      addJourneyEvent: (event) => set((state) => ({ journeyEvents: [...state.journeyEvents, event] })),
      resetProgress: () => set({ userProgress: null, dailyCheckIns: [], weeklyReviews: [], journeyEvents: [] })
    }),
    {
      name: STORAGE_KEYS.PROGRESS,
      partialize: omitHydration,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Derived state placeholders
export const selectLatestReview = (state: ProgressState) => state.weeklyReviews[state.weeklyReviews.length - 1];
export const selectCurrentLevel = (state: ProgressState) => state.userProgress?.currentLevel ?? 1;
