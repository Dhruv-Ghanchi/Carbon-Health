import type { DailyCheckIn, JourneyEvent } from './types';
import { PROGRESS_CONSTANTS } from './constants';
import type { Mission } from '../missions/types';
import { calculateStreaks } from './streakEngine';

export const generateJourneyEvents = (
  checkIns: DailyCheckIn[],
  completedMissions: Mission[],
  existingEvents: JourneyEvent[],
  timestampISO: string
): JourneyEvent[] => {
  const newEvents: JourneyEvent[] = [];
  const allEvents = [...existingEvents];

  const addEvent = (type: JourneyEvent['type'], title: string, description: string) => {
    if (!allEvents.some(e => e.type === type)) {
      const event: JourneyEvent = {
        id: `event_${type}_${timestampISO}`,
        type,
        title,
        description,
        createdAt: timestampISO,
      };
      newEvents.push(event);
      allEvents.push(event);
    }
  };

  if (checkIns.length >= 1) {
    addEvent('FIRST_CHECKIN', 'First Check-In', 'Completed your first daily check-in.');
  }

  const { longestStreak } = calculateStreaks(checkIns);

  if (longestStreak >= PROGRESS_CONSTANTS.STREAK_7) {
    addEvent('STREAK_7', '7-Day Streak', 'Consistently engaged for 7 days in a row.');
  }
  if (longestStreak >= PROGRESS_CONSTANTS.STREAK_30) {
    addEvent('STREAK_30', '30-Day Streak', 'Consistently engaged for 30 days in a row.');
  }

  if (completedMissions.length >= 1) {
    addEvent('FIRST_MISSION_COMPLETED', 'First Mission Completed', 'Successfully completed your first mission.');
  }
  if (completedMissions.length >= PROGRESS_CONSTANTS.MISSIONS_5) {
    addEvent('MISSIONS_5_COMPLETED', '5 Missions Completed', 'Successfully completed 5 missions.');
  }
  if (completedMissions.length >= PROGRESS_CONSTANTS.MISSIONS_10) {
    addEvent('MISSIONS_10_COMPLETED', '10 Missions Completed', 'Successfully completed 10 missions.');
  }

  return newEvents;
};
