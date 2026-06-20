import { useUserStore, useMissionStore, useProgressStore } from '../../stores';
import { useShallow } from 'zustand/react/shallow';

export const useDashboardQuery = () => {
  const { profile, assessment } = useUserStore(useShallow(state => ({ profile: state.profile, assessment: state.assessment })));
  const { activeMissions, completedMissions } = useMissionStore(useShallow(state => ({ activeMissions: state.activeMissions, completedMissions: state.completedMissions })));
  const { dailyCheckIns } = useProgressStore(useShallow(state => ({ dailyCheckIns: state.dailyCheckIns })));

  return { profile, assessment, activeMissions, completedMissions, dailyCheckIns };
};
