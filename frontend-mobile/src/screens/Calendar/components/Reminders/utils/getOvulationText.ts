import { getOvulationDate } from '../../../utils';
import { addDays, isAfter, isToday, subDays } from 'date-fns';
import { getOvulationUpcomingText } from './getOvulationUpcomingText';

const FALLBACK = 'Podsetnik za početak ovulacije.';

export const getOvulationText = (menstruationStart?: string, cycleLength?: number): string => {
  if (!menstruationStart || cycleLength === undefined) {
    return FALLBACK;
  }
  const Today = new Date();
  console.log('MENSTRUATION START', menstruationStart);
  const ovulationDate = getOvulationDate(menstruationStart, cycleLength);
  const previousOvulationDate = subDays(ovulationDate, cycleLength);
  console.log('PREV', previousOvulationDate);

  if (isAfter(previousOvulationDate, Today) || isToday(previousOvulationDate)) {
    return getOvulationUpcomingText(previousOvulationDate);
  }

  if (isAfter(ovulationDate, Today) || isToday(ovulationDate)) {
    console.log('[1]');
    console.log('isAfter', isAfter(ovulationDate, new Date()));
    console.log('isToday', isToday(ovulationDate));
    console.log('ovulationDate', ovulationDate);
    return getOvulationUpcomingText(ovulationDate);
  }
  const upcomingOvulation = addDays(ovulationDate, cycleLength);
  console.log('[2]');
  return getOvulationUpcomingText(upcomingOvulation);
};
