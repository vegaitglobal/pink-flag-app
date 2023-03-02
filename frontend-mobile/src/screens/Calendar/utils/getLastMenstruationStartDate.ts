import { TODAY } from '@pf/constants';
import { isAfter, isBefore, isToday } from 'date-fns';

/**
 * @param previousStartDate The previous cycle start date.
 * @param actualStartDate The cycle start date for the current month.
 * @param upcomingStartDate The cycle upcoming start date for current month.
 * @returns Returns the correct last menstruation date for given month.
 */

export const getLastMenstruationStartDate = (
  previousStartDate: string,
  actualStartDate: string,
  upcomingStartDate: string,
): string => {
  const actualDate = new Date(actualStartDate);

  if (isAfter(actualDate, TODAY)) {
    return previousStartDate;
  }

  const upcomingDate = new Date(upcomingStartDate);

  if (isBefore(upcomingDate, TODAY) || isToday(upcomingDate)) {
    return upcomingStartDate;
  }

  return actualStartDate;
};
