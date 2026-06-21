import { buildProgressSnapshot } from './progressSnapshot';
import type { Mission, DailyCheckIn } from '../../types';

export interface ProgressRawState {
  dailyCheckIns: DailyCheckIn[];
  completedMissions: Mission[];
  activeMissions: Mission[];
}

export function useProgressSnapshot(rawState: ProgressRawState) {
  return buildProgressSnapshot(
    rawState.dailyCheckIns,
    rawState.completedMissions
  );
}
