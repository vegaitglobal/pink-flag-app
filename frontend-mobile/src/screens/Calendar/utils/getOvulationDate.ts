import { addDays } from 'date-fns';
import { OVULATION_DAY, getFertilityStartDate } from './getFertilityStartDate';

export const getOvulationDate = (menstruationStart: string, cycleLength: number): Date => {
  const fertilityStart = getFertilityStartDate(menstruationStart, cycleLength);

  return addDays(new Date(fertilityStart), OVULATION_DAY);
};
