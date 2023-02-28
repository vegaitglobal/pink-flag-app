import { differenceInCalendarDays } from 'date-fns';

export const getPeriodInProgressText = (date: Date): string => {
  const daysDiff = differenceInCalendarDays(date, new Date());
  let days = '';
  if (daysDiff === 1) {
    days = `sutra!`;
  }

  if (daysDiff === 0) {
    days = 'danas!';
  }

  if (daysDiff > 1) {
    days = `za ${daysDiff} dana!`;
  }

  return 'Period se završava ' + days;
};
