import { addDays, isAfter, isToday } from 'date-fns';
import { getPeriodInProgressText } from './getPeriodInProgressText';
import { getPeriodUpcomingText } from './getPeriodUpcomingText';

const FALLBACK = 'Podsetnik za početak perioda.';

export const getPeriodText = (
  menstruationStart?: string,
  menstruationLength?: number,
  cycleLength?: number,
): string => {
  if (!menstruationStart || !menstruationLength || !cycleLength) {
    return FALLBACK;
  }

  const TODAY = new Date();
  const menstruationStartDate = new Date(menstruationStart);
  const menstruationEnd = addDays(menstruationStartDate, menstruationLength - 1);
  if (isAfter(menstruationStartDate, TODAY)) {
    return getPeriodUpcomingText(menstruationStartDate);
  }

  if (isAfter(menstruationEnd, TODAY) || isToday(menstruationEnd)) {
    return getPeriodInProgressText(menstruationEnd);
  }

  const upcomingMenstruationStartDate = addDays(menstruationStartDate, cycleLength);

  return getPeriodUpcomingText(upcomingMenstruationStartDate);
};
