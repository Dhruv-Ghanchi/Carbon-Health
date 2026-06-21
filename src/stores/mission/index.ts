import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, omitHydration } from '../shared';
import type { HydrationState } from '../shared';
import type { Mission } from '../../types';

interface MissionState extends HydrationState {
  activeMissions: Mission[];
  completedMissions: Mission[];

  addActiveMission: (mission: Mission) => void;
  completeMission: (missionId: string, completedMission: Mission) => void;
  removeActiveMission: (missionId: string) => void;
  resetMissions: () => void;
}

export const useMissionStore = create<MissionState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      activeMissions: [],
      completedMissions: [],

      addActiveMission: (mission) =>
        set((state) => ({ activeMissions: [...state.activeMissions, mission] })),

      completeMission: (missionId, completedMission) =>
        set((state) => ({
          activeMissions: state.activeMissions.filter(m => m.id !== missionId),
          completedMissions: [...state.completedMissions, completedMission]
        })),

      removeActiveMission: (missionId) =>
        set((state) => ({
          activeMissions: state.activeMissions.filter(m => m.id !== missionId)
        })),

      resetMissions: () => set({ activeMissions: [], completedMissions: [] })
    }),
    {
      name: STORAGE_KEYS.MISSION,
      partialize: omitHydration,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Derived state placeholders
export const selectCurrentMission = (state: MissionState) => state.activeMissions[0];
