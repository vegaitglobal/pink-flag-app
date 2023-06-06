import { addDays, subDays } from 'date-fns';
import { getMarkerKey } from './getMarkerKey';

const FERTILITY_OFFSET = 19;
export const FERTILITY_DAYS = 7;
export const OVULATION_DAY = 5;

/**
 * Returns the start date of fertility.
 * @param menstruationStartDate - First day of the cycle.
 * @param cycleLength - Cycle length in days.
 * @returns - Fertility start date.
 */
export const getFertilityStartDate = (menstruationStartDate: string, cycleLength: number): string => {
  const date = new Date(menstruationStartDate);
  const nextCycleStart = addDays(date, cycleLength);
  const fertilityStart = subDays(nextCycleStart, FERTILITY_OFFSET);

  return getMarkerKey(fertilityStart);
};
