import { addDays } from 'date-fns';
import { getMarkerKey } from './getMarkerKey';

export const getDateRange = (startDate: string, dateCount: number): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);

  for (let i = 0; i < dateCount; i++) {
    dates.push(getMarkerKey(addDays(start, i)));
  }

  return dates;
};
