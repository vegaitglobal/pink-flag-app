import { getMarkerKey } from './getMarkerKey';
import { addDays } from 'date-fns';
import { EMPTY_STRING } from '@pf/constants';

export const getUpcomingMenstruationStartDate = (menstruationStartDate?: string, cycleLength?: number): string => {
  if (!menstruationStartDate || !cycleLength) {
    return EMPTY_STRING;
  }

  const date = new Date(menstruationStartDate);
  const nextCycleStart = addDays(date, cycleLength);

  return getMarkerKey(nextCycleStart);
};
