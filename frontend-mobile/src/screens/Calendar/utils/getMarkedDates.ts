import { MarkedDates } from 'react-native-calendars/src/types';
import { getDateWithOffset } from './getDateWithOffset';
import { getFertilityDates } from './getFertilityDates';
import { getMenstruationDates } from './getMenstruationDates';
import { getPreviousMenstruationStartDate } from './getPreviousMenstruationStartDate';
import { getUpcomingMenstruationStartDate } from './getUpcomingMenstruationStartDate';

/**
 * Returns marked dates for given month.
 * @param cycleLength - Cycle length in days.
 * @param menstruationLength - Menstruation length in days.
 * @param menstruationStartDate - Menstruation start date.
 * @returns An array of dates which is marked with different type of cycle markers.
 */
export const getMarkedDates = (
  cycleLength?: number,
  menstruationLength?: number,
  menstruationStartDate?: string,
  monthOffset?: number,
): MarkedDates | undefined => {
  if (!cycleLength || !menstruationLength || !menstruationStartDate) {
    return undefined;
  }

  const menstruationStartDateWithOffset = getDateWithOffset(menstruationStartDate, cycleLength, monthOffset);

  const previousMenstruationDate = getPreviousMenstruationStartDate(menstruationStartDateWithOffset, cycleLength);
  const previousFertilityDays = getFertilityDates(previousMenstruationDate, cycleLength);
  const previousMenstruationDates = getMenstruationDates(previousMenstruationDate, menstruationLength);

  const menstruationDates = getMenstruationDates(menstruationStartDateWithOffset, menstruationLength);
  const fertilityDays = getFertilityDates(menstruationStartDateWithOffset, cycleLength);

  const upcomingMenstruationDate = getUpcomingMenstruationStartDate(menstruationStartDateWithOffset, cycleLength);
  const upcomingMenstruationDates = getMenstruationDates(upcomingMenstruationDate, menstruationLength);
  const upcomingFertilityDays = getFertilityDates(upcomingMenstruationDate, cycleLength);

  return {
    ...previousMenstruationDates,
    ...previousFertilityDays,
    ...menstruationDates,
    ...fertilityDays,
    ...upcomingMenstruationDates,
    ...upcomingFertilityDays,
  };
};
