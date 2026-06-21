import { useMissionStore, useProgressStore } from '../../stores';
import type { Mission } from '../../types';
import type { Recommendation } from '../../engines/recommendation/types';

export function acceptRecommendationCommand(recommendation: Recommendation) {
  const newMission: Mission = {
    id: `mission-${Date.now()}-${recommendation.id}`,
    title: recommendation.title,
    description: recommendation.description,
    category: recommendation.category,
    difficulty: recommendation.difficulty,
    targetReduction: recommendation.estimatedReduction,
    status: 'in_progress',
    missionType: 'one_time', // default
    streakCount: 0,
    createdAt: new Date().toISOString()
  };

  useMissionStore.getState().addActiveMission(newMission);
}

export function completeMissionCommand(missionId: string) {
  const activeMission = useMissionStore.getState().activeMissions.find(m => m.id === missionId);
  if (activeMission) {
    useMissionStore.getState().completeMission(missionId, { ...activeMission, status: 'completed', completedAt: new Date().toISOString() });
  }
  useProgressStore.getState().addDailyCheckIn({
    id: `checkin-${Date.now()}`,
    date: new Date().toISOString(),
    completed: true,
    missionWorkedOn: missionId
  });
}

export function skipMissionCommand(missionId: string) {
  useMissionStore.getState().removeActiveMission(missionId);
  useProgressStore.getState().addDailyCheckIn({
    id: `checkin-${Date.now()}`,
    date: new Date().toISOString(),
    completed: false,
    missionWorkedOn: missionId
  });
}
