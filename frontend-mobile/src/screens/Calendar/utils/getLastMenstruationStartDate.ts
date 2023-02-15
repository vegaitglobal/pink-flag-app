import { TODAY } from '@pf/constants';
import { isAfter } from 'date-fns';

export const getLastMenstruationStartDate = (previousStartDate: string, potentialStartDate: string): string => {
  const potentialDate = new Date(potentialStartDate);

  if (isAfter(potentialDate, TODAY)) {
    return previousStartDate;
  }

  return potentialStartDate;
};
