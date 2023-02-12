import { MarkedDates } from 'react-native-calendars/src/types';
import { getDateRange } from './getDateRange';
import { CalendarMarkerStyles } from '@pf/components';
import { getFertilityStartDate } from './getFertilityStartDate';

const FERTILITY_DAYS = 5;
const FERTILITY_MIDDLE = 2;
const FertilityMarker = CalendarMarkerStyles.FertilityMarker;
const OvulationMarker = CalendarMarkerStyles.OvulationMarker;

export const getFertilityDates = (menstruationStartDate: string, cycleLength: number): MarkedDates => {
  const startDate = getFertilityStartDate(menstruationStartDate, cycleLength);
  const dates = getDateRange(startDate, FERTILITY_DAYS);

  return dates.reduce((date, key, index) => {
    const marker = index === FERTILITY_MIDDLE ? OvulationMarker : FertilityMarker;

    return { ...date, [key]: marker };
  }, {});
};
