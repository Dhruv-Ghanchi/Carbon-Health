import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, omitHydration } from '../shared';
import type { HydrationState } from '../shared';
import type { CarbonHealthReport } from '../../types';

interface ReportState extends HydrationState {
  report: CarbonHealthReport | null;
  
  setReport: (report: CarbonHealthReport) => void;
  resetReport: () => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      report: null,
      
      setReport: (report) => set({ report }),
      resetReport: () => set({ report: null }),
    }),
    {
      name: STORAGE_KEYS.REPORT,
      partialize: omitHydration,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
