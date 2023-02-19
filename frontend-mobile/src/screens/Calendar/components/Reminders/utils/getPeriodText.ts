import { addDays, isBefore, isAfter } from 'date-fns';
import { getPeriodInProgressText } from './getPeriodInProgressText';
import { getPeriodUpcomingText } from './getPeriodUpcomingText';

const FALLBACK = 'Podsetnik za početak perioda.';

export const getPeriodText = (
  menstruationStart?: string,
  upcomingMenstruationStart?: string,
  menstruationLength?: number,
): string => {
  if (!menstruationStart || !upcomingMenstruationStart || !menstruationLength) {
    return FALLBACK;
  }

  const TODAY = new Date();
  const menstruationStartDate = new Date(menstruationStart);
  const menstruationEnd = addDays(menstruationStartDate, menstruationLength);

  const isEndBeforeToday = isBefore(menstruationEnd, TODAY);
  const isBeginningAfterToday = isAfter(menstruationStartDate, TODAY);

  if (isEndBeforeToday || isBeginningAfterToday) {
    const date = isBeginningAfterToday ? menstruationStartDate : new Date(upcomingMenstruationStart);
    return getPeriodUpcomingText(date);
  }

  return getPeriodInProgressText(menstruationEnd);
};
