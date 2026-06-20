import { useUserStore, useMissionStore } from '../../stores';
import { useShallow } from 'zustand/react/shallow';

export const useRecommendationsQuery = () => {
  const { profile, assessment } = useUserStore(useShallow(state => ({ profile: state.profile, assessment: state.assessment })));
  const { activeMissions, completedMissions } = useMissionStore(useShallow(state => ({ 
    activeMissions: state.activeMissions, 
    completedMissions: state.completedMissions
  })));

  // Mock archivedMissions as empty array since it's not in MissionStore yet
  return { profile, assessment, activeMissions, completedMissions, archivedMissions: [] };
};
