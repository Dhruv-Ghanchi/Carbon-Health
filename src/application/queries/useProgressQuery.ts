import { useProgressStore, useMissionStore } from '../../stores';
import { useShallow } from 'zustand/react/shallow';

export const useProgressQuery = () => {
  const { dailyCheckIns } = useProgressStore(useShallow(state => ({ dailyCheckIns: state.dailyCheckIns })));
  const { completedMissions, activeMissions } = useMissionStore(useShallow(state => ({ 
    completedMissions: state.completedMissions,
    activeMissions: state.activeMissions
  })));

  return { dailyCheckIns, completedMissions, activeMissions };
};
