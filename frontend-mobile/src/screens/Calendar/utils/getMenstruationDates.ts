import { MarkedDates } from 'react-native-calendars/src/types';
import { getDateRange } from './getDateRange';
import { CalendarMarkerStyles } from '@pf/components';
import { isSameOrBefore } from './isSameOrBefore';

const MenstruationMarker = CalendarMarkerStyles.MenstruationMarker;
const ExpectedMenstruationMarker = CalendarMarkerStyles.ExpectedMenstruationMarker;
const TODAY = new Date();

export const getMenstruationDates = (menstruationStartDate: string, menstruationLength: number): MarkedDates => {
  const dates = getDateRange(menstruationStartDate, menstruationLength);

  return dates.reduce((date, key) => {
    const currentDate = new Date(key);
    const marker = isSameOrBefore(currentDate, TODAY) ? MenstruationMarker : ExpectedMenstruationMarker;
    return { ...date, [key]: marker };
  }, {});
};
