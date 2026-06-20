import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DailyCheckIn } from '../types';

interface ProgressState {
  history: DailyCheckIn[];
  // Placeholder actions
}

export const useProgressStore = create<ProgressState>()(
  persist(
    () => ({
      history: [] as DailyCheckIn[],
    }),
    {
      name: 'carbon-progress-storage',
    }
  )
);
