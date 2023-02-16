import { TODAY } from '@pf/constants';
import { differenceInDays } from 'date-fns';

export const getPeriodInProgressText = (date: Date): string => {
  const daysDiff = differenceInDays(date, TODAY);

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
