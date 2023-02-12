import { getMarkerKey } from './getMarkerKey';
import { addDays } from 'date-fns';

export const getUpcomingMenstruationStartDate = (menstruationStartDate: string, cycleLength: number): string => {
  const date = new Date(menstruationStartDate);
  const nextCycleStart = addDays(date, cycleLength);

  return getMarkerKey(nextCycleStart);
};
