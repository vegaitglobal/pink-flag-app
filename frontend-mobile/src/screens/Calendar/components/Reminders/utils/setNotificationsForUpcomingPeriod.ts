import { addDays, isBefore, subDays } from 'date-fns';
/* eslint-disable @typescript-eslint/no-floating-promises */
import { createTriggerNotification } from './createTriggerNotification';

const SEVEN_DAYS = 7;
const ONE_DAY = 1;

export const setNotificationsForUpcomingPeriod = (
  menstruationStartDate: Date,
  cycleLength: number,
  notificationId: string,
  userName: string,
): void => {
  let upcomingMenstruationStartDate = addDays(menstruationStartDate, cycleLength);

  if (isBefore(upcomingMenstruationStartDate, new Date())) {
    upcomingMenstruationStartDate = addDays(upcomingMenstruationStartDate, cycleLength);
  }

  createTriggerNotification(
    notificationId + '1',
    subDays(upcomingMenstruationStartDate, ONE_DAY),
    userName,
    'Period ti kreće sutra!',
  );

  createTriggerNotification(
    notificationId + '7',
    subDays(upcomingMenstruationStartDate, SEVEN_DAYS),
    userName,
    'Period ti kreće za 7 dana!',
  );
};
