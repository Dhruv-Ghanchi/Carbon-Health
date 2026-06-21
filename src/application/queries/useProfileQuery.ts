import { useUserStore } from '../../stores';
import { useShallow } from 'zustand/react/shallow';

export const useProfileQuery = () => {
  return useUserStore(useShallow(state => ({ profile: state.profile })));
};
