import { ProgressValidationError } from './types';
import type { DailyCheckIn } from './types';

export const normalizeISOToDate = (isoString: string): string => {
  // ISO string is format YYYY-MM-DDTHH:mm:ss.sssZ
  // If already YYYY-MM-DD, returns itself
  return isoString.split('T')[0];
};

export const validateCheckIn = (checkIn: DailyCheckIn): void => {
  if (checkIn.response !== 'YES' && checkIn.response !== 'NO') {
    throw new ProgressValidationError(`Invalid response: strictly requires 'YES' or 'NO'. Received: ${checkIn.response}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn.date)) {
    throw new ProgressValidationError(`Invalid date format. Expected YYYY-MM-DD: ${checkIn.date}`);
  }
};

export const validateDuplicateCheckIn = (checkIns: DailyCheckIn[], date: string): void => {
  const normalizedDate = normalizeISOToDate(date);
  if (checkIns.some(c => c.date === normalizedDate)) {
    throw new ProgressValidationError(`Duplicate check-in for date: ${normalizedDate}`);
  }
};
