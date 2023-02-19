import { getFertilityStartDate, FERTILITY_MIDDLE } from '../../../utils';
import { addDays, isAfter, isToday } from 'date-fns';
import { getOvulationUpcomingText } from './getOvulationUpcomingText';

const FALLBACK = 'Podsetnik za početak ovulacije.';

export const getOvulationText = (menstruationStart?: string, cycleLength?: number): string => {
  if (!menstruationStart || cycleLength === undefined) {
    return FALLBACK;
  }

  const fertilityStart = getFertilityStartDate(menstruationStart, cycleLength);
  const ovulationDate = addDays(new Date(fertilityStart), FERTILITY_MIDDLE);

  if (isAfter(ovulationDate, new Date()) || isToday(ovulationDate)) {
    return getOvulationUpcomingText(ovulationDate);
  }
  const upcomingOvulation = addDays(ovulationDate, cycleLength);
  return getOvulationUpcomingText(upcomingOvulation);
};
