import { MarkedDates } from 'react-native-calendars/src/types';
import { getDateRange } from './getDateRange';
import { CalendarMarkerStyles } from '@pf/components';
import { FERTILITY_DAYS, FERTILITY_MIDDLE, getFertilityStartDate } from './getFertilityStartDate';
import { isToday } from 'date-fns';
import { addTodayMarker } from './addTodayMarker';

const FertilityMarker = CalendarMarkerStyles.FertilityMarker;
const OvulationMarker = CalendarMarkerStyles.OvulationMarker;

export const getFertilityDates = (menstruationStartDate: string, cycleLength: number): MarkedDates => {
  const startDate = getFertilityStartDate(menstruationStartDate, cycleLength);
  const dates = getDateRange(startDate, FERTILITY_DAYS);

  return dates.reduce((result, date, index) => {
    const isOvulation = index === FERTILITY_MIDDLE;
    let marker = isOvulation ? OvulationMarker : FertilityMarker;

    if (isToday(new Date(date))) {
      marker = addTodayMarker(marker);
    }

    return { ...result, [date]: marker };
  }, {});
};
