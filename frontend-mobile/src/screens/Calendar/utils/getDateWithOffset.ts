import { EMPTY_STRING } from '@pf/constants';
import { addDays, isSameMonth, subDays, isBefore } from 'date-fns';
import { getMarkerKey } from './getMarkerKey';

export const getDateWithOffset = (menstruationStartDate?: string, cycleLength?: number, currentDate?: Date): string => {
  if (!menstruationStartDate || !cycleLength || !currentDate) {
    return EMPTY_STRING;
  }

  let shiftedMenstruationStartDate = new Date(menstruationStartDate);

  const calcDays = isBefore(shiftedMenstruationStartDate, currentDate) ? addDays : subDays;

  while (!isSameMonth(shiftedMenstruationStartDate, currentDate)) {
    shiftedMenstruationStartDate = calcDays(shiftedMenstruationStartDate, cycleLength);
  }

  return getMarkerKey(shiftedMenstruationStartDate);
};
