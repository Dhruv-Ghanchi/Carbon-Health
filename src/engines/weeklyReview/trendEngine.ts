import type { TrendType } from './types';

export const detectTrend = (
  current: number,
  previous: number | null,
  stableMargin: number,
  higherIsBetter: boolean
): TrendType => {
  if (previous === null) {
    return 'INSUFFICIENT_DATA';
  }

  const diff = current - previous;
  
  if (Math.abs(diff) <= stableMargin) {
    return 'STABLE';
  }

  if (higherIsBetter) {
    return diff > 0 ? 'IMPROVING' : 'DECLINING';
  } else {
    // Lower is better (e.g. footprint)
    return diff < 0 ? 'IMPROVING' : 'DECLINING';
  }
};
