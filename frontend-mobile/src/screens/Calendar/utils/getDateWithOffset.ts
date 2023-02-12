import { addDays, addYears, subDays, subYears } from 'date-fns';
import { getMarkerKey } from './getMarkerKey';

const YEAR = 12;

export const getDateWithOffset = (menstruationStartDate: string, cycleLength: number, dateOffset?: number): string => {
  if (dateOffset === 0 || !dateOffset) {
    return menstruationStartDate;
  }

  const baseDate = new Date(menstruationStartDate);
  const preparedDateOffset = dateOffset < 0 ? Math.abs(dateOffset) : dateOffset;
  const calcYears = dateOffset < 0 ? subYears : addYears;
  const calcDays = dateOffset < 0 ? subDays : addDays;

  const yearsToSubtract = Math.floor(preparedDateOffset / YEAR);
  const daysToSubtract = (preparedDateOffset % YEAR) * cycleLength;

  const dateShiftedByYears = calcYears(baseDate, yearsToSubtract);
  const dateShiftedByDays = calcDays(dateShiftedByYears, daysToSubtract);

  return getMarkerKey(dateShiftedByDays);
};
