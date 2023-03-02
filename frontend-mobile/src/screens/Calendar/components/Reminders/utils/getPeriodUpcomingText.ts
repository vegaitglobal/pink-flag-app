import { differenceInCalendarDays } from 'date-fns';

export const getPeriodUpcomingText = (date: Date): string => {
  const daysDiff = differenceInCalendarDays(date, new Date());

  let days = '';
  if (daysDiff === 1) {
    days = `sutra!`;
  }

  if (daysDiff > 1) {
    days = `za ${daysDiff} dana!`;
  }

  return 'Period kreće ' + days;
};
