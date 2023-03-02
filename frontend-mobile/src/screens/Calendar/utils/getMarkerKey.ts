import { format } from 'date-fns';

const PATTERN = 'yyyy-MM-dd';

export const getMarkerKey = (date: string | Date): string => {
  const preparedDate = typeof date === 'string' ? new Date(date) : date;

  return format(preparedDate, PATTERN);
};
