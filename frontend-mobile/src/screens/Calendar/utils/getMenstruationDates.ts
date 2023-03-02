import { MarkedDates } from 'react-native-calendars/src/types';
import { getDateRange } from './getDateRange';
import { CalendarMarkerStyles } from '@pf/components';
import { isSameOrBefore } from './isSameOrBefore';
import { isToday } from 'date-fns';
import { addTodayMarker } from './addTodayMarker';
import { TODAY } from '@pf/constants';

const MenstruationMarker = CalendarMarkerStyles.MenstruationMarker;
const ExpectedMenstruationMarker = CalendarMarkerStyles.ExpectedMenstruationMarker;

export const getMenstruationDates = (menstruationStartDate: string, menstruationLength: number): MarkedDates => {
  const dates = getDateRange(menstruationStartDate, menstruationLength);

  return dates.reduce((result, date) => {
    const currentDate = new Date(date);
    let marker = isSameOrBefore(currentDate, TODAY) ? MenstruationMarker : ExpectedMenstruationMarker;

    if (isToday(currentDate)) {
      marker = addTodayMarker(marker);
    }

    return { ...result, [date]: marker };
  }, {});
};
