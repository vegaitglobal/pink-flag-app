import { TODAY } from '@pf/constants';
import { differenceInDays } from 'date-fns';

export const getPeriodUpcomingText = (date: Date): string => {
  const daysDiff = differenceInDays(date, TODAY);

  let days = '';
  if (daysDiff === 1) {
    days = `za 2 dana!`;
  }

  if (daysDiff === 0) {
    days = 'sutra!';
  }

  if (daysDiff > 1) {
    days = `za ${daysDiff + 1} dana!`;
  }

  return 'Period kreće ' + days;
};
