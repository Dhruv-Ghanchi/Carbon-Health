import { calculateStreaks } from '../../engines/progress/streakEngine';
import { generateJourneyEvents } from '../../engines/progress/journeyEngine';
import { generateWeeklySummary } from '../../engines/progress/progressEngine';
import type { DailyCheckIn, Mission } from '../../types';
import type { DailyCheckIn as EngineDailyCheckIn } from '../../engines/progress/types';
import type { Mission as EngineMission } from '../../engines/missions/types';

export function buildProgressSnapshot(
  dailyCheckIns: DailyCheckIn[],
  completedMissions: Mission[]
) {
  // Map App state to Engine state
  const engineCheckIns: EngineDailyCheckIn[] = dailyCheckIns.map(c => ({
    id: c.id,
    date: c.date.split('T')[0],
    response: c.completed ? 'YES' : 'NO',
    missionIds: c.missionWorkedOn ? [c.missionWorkedOn] : [],
    createdAt: c.date
  }));

  const engineMissions: EngineMission[] = completedMissions.map(m => ({
    id: m.id,
    recommendationId: m.id,
    title: m.title,
    description: m.description,
    category: m.category,
    type: m.missionType === 'one_time' ? 'ONE_TIME' : 'RECURRING',
    difficulty: m.difficulty.toUpperCase() as 'EASY' | 'MEDIUM' | 'HARD',
    impactScore: m.targetReduction,
    status: 'COMPLETED',
    progress: { current: 1, target: 1 },
    createdAt: m.createdAt,
    updatedAt: m.createdAt
  }));

  // Use existing engines to derive progress intelligence
  const rawStreakMetrics = calculateStreaks(engineCheckIns);
  const streakMetrics = {
    ...rawStreakMetrics,
    engagementRate: Math.round(rawStreakMetrics.engagementRate)
  };
  
  const timestampISO = new Date().toISOString();
  const journeyEvents = generateJourneyEvents(engineCheckIns, engineMissions, [], timestampISO);
  
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const weekStart = oneWeekAgo.toISOString().split('T')[0];
  const weekEnd = today.toISOString().split('T')[0];

  const weeklySummary = generateWeeklySummary(weekStart, weekEnd, engineCheckIns, engineMissions, journeyEvents);

  return {
    isReady: true,
    streakMetrics,
    journeyEvents,
    weeklySummary,
    completedMissions,
    dailyCheckIns
  };
}
