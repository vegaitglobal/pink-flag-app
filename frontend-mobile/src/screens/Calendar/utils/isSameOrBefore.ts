import { isBefore, isEqual } from 'date-fns';

export const isSameOrBefore = (firstDate: Date, secondDate: Date): boolean => {
  return isBefore(firstDate, secondDate) || isEqual(firstDate, secondDate);
};
