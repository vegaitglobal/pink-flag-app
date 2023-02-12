import { getMarkerKey } from './getMarkerKey';
import { subDays } from 'date-fns';

export const getPreviousMenstruationStartDate = (menstruationStartDate: string, cycleLength: number): string => {
  const date = new Date(menstruationStartDate);
  const nextCycleStart = subDays(date, cycleLength);

  return getMarkerKey(nextCycleStart);
};
