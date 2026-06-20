import type { DailyCheckIn, CheckInResponse } from './types';
import { validateCheckIn, validateDuplicateCheckIn, normalizeISOToDate } from './validators';

export const createCheckIn = (
  existingCheckIns: DailyCheckIn[],
  date: string,
  response: CheckInResponse,
  timestampISO: string,
  missionIds?: string[]
): DailyCheckIn => {
  const normalizedDate = normalizeISOToDate(date);
  validateDuplicateCheckIn(existingCheckIns, normalizedDate);

  const checkIn: DailyCheckIn = {
    id: `checkin_${normalizedDate}`,
    date: normalizedDate,
    response,
    missionIds,
    createdAt: timestampISO,
  };

  validateCheckIn(checkIn);
  return checkIn;
};

export const appendCheckIn = (existingCheckIns: DailyCheckIn[], checkIn: DailyCheckIn): DailyCheckIn[] => {
  validateDuplicateCheckIn(existingCheckIns, checkIn.date);
  return [...existingCheckIns, checkIn].sort((a, b) => a.date.localeCompare(b.date));
};
