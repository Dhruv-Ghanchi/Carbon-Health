import { useMissionStore } from '../../stores';
import { useShallow } from 'zustand/react/shallow';

export const useMissionsQuery = () => {
  const { activeMissions, completedMissions } = useMissionStore(useShallow(state => ({ activeMissions: state.activeMissions, completedMissions: state.completedMissions })));

  return { activeMissions, completedMissions };
};
