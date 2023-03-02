import { getOvulationDate } from '../../../utils';
import { addDays, isAfter, isToday, subDays } from 'date-fns';
import { getOvulationUpcomingText } from './getOvulationUpcomingText';

const FALLBACK = 'Podsetnik za početak ovulacije.';

export const getOvulationText = (menstruationStart?: string, cycleLength?: number): string => {
  if (!menstruationStart || cycleLength === undefined) {
    return FALLBACK;
  }
  const Today = new Date();
  const ovulationDate = getOvulationDate(menstruationStart, cycleLength);
  const previousOvulationDate = subDays(ovulationDate, cycleLength);

  if (isAfter(previousOvulationDate, Today) || isToday(previousOvulationDate)) {
    return getOvulationUpcomingText(previousOvulationDate);
  }

  if (isAfter(ovulationDate, Today) || isToday(ovulationDate)) {
    return getOvulationUpcomingText(ovulationDate);
  }
  const upcomingOvulation = addDays(ovulationDate, cycleLength);
  return getOvulationUpcomingText(upcomingOvulation);
};
