/* eslint-disable @typescript-eslint/no-floating-promises */
import { subDays } from 'date-fns';
import { createTriggerNotification } from './createTriggerNotification';

const SEVEN_DAYS = 7;
const ONE_DAY = 1;

export const setNotificationsForCurrentPeriod = (
  daysDiff: number,
  menstruationStartDate: Date,
  notificationId: string,
  userName: string,
): void => {
  if (daysDiff >= ONE_DAY) {
    createTriggerNotification(
      notificationId + '1',
      subDays(menstruationStartDate, ONE_DAY),
      userName,
      'Period ti kreće sutra!',
    );
  }

  if (daysDiff >= SEVEN_DAYS) {
    createTriggerNotification(
      notificationId + '7',
      subDays(menstruationStartDate, SEVEN_DAYS),
      userName,
      'Period ti kreće za 7 dana!',
    );
  }
};
