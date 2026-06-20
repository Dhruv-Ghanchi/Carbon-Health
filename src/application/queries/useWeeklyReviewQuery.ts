import { useProgressStore, useMissionStore, useUserStore } from '../../stores';
import { useShallow } from 'zustand/react/shallow';

export const useWeeklyReviewQuery = () => {
  const { profile, assessment } = useUserStore(useShallow(state => ({ profile: state.profile, assessment: state.assessment })));
  const { dailyCheckIns } = useProgressStore(useShallow(state => ({ dailyCheckIns: state.dailyCheckIns })));
  const { completedMissions } = useMissionStore(useShallow(state => ({ completedMissions: state.completedMissions })));

  return { profile, assessment, dailyCheckIns, completedMissions };
};
