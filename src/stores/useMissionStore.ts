import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Mission } from '../types';

interface MissionState {
  activeMissions: Mission[];
  completedMissions: Mission[];
  // Placeholder actions
  addMission: (mission: Mission) => void;
}

export const useMissionStore = create<MissionState>()(
  persist(
    (set) => ({
      activeMissions: [],
      completedMissions: [],
      addMission: (mission) => set((state) => ({ 
        activeMissions: [...state.activeMissions, mission] 
      })),
    }),
    {
      name: 'carbon-mission-storage',
    }
  )
);
