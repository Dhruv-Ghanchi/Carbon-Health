export const STORAGE_KEYS = {
  USER: 'user-store',
  REPORT: 'report-store',
  MISSION: 'mission-store',
  PROGRESS: 'progress-store',
  AWARENESS: 'awareness-store',
} as const;

export interface HydrationState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const omitHydration = <T extends HydrationState>(state: T): Omit<T, '_hasHydrated' | 'setHasHydrated'> => {
  const rest = { ...state };
  delete (rest as unknown as { _hasHydrated?: unknown })._hasHydrated;
  delete (rest as unknown as { setHasHydrated?: unknown }).setHasHydrated;
  return rest;
};
