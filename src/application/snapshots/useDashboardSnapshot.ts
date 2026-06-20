import { buildDashboardSnapshot } from './dashboardSnapshot';
import { buildDashboardIntelligencePipeline } from '../../engines/intelligence/pipeline/buildDashboardIntelligencePipeline';
import { buildDashboardViewModel } from '../composers/buildDashboardViewModel';
import { getCurrentWeekContext } from '../dateContext';
import type { UserProfile, CarbonAssessment, Mission, DailyCheckIn } from '../../types';

export interface DashboardRawState {
  profile: UserProfile | null;
  assessment: CarbonAssessment | null;
  activeMissions: Mission[];
  completedMissions: Mission[];
  archivedMissions?: Mission[];
  dailyCheckIns: DailyCheckIn[];
}

export function useDashboardSnapshot(rawState: DashboardRawState) {
  const dateISO = new Date().toISOString();
  const { weekStart } = getCurrentWeekContext(dateISO);

  const intelligence = buildDashboardIntelligencePipeline(rawState, weekStart);

  if (!rawState.profile || !rawState.assessment) {
    return buildDashboardViewModel(null, intelligence);
  }

  const baseDashboard = buildDashboardSnapshot(
    rawState.profile,
    rawState.assessment,
    rawState.activeMissions,
    rawState.completedMissions,
    rawState.dailyCheckIns
  );

  return buildDashboardViewModel(baseDashboard, intelligence);
}
