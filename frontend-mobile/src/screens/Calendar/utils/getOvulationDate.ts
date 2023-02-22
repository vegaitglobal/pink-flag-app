import { addDays } from 'date-fns';
import { FERTILITY_MIDDLE, getFertilityStartDate } from './getFertilityStartDate';

export const getOvulationDate = (menstruationStart: string, cycleLength: number): Date => {
  const fertilityStart = getFertilityStartDate(menstruationStart, cycleLength);

  return addDays(new Date(fertilityStart), FERTILITY_MIDDLE);
};
