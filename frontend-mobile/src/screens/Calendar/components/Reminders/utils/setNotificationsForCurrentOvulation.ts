/* eslint-disable @typescript-eslint/no-floating-promises */
import { subDays } from 'date-fns';
import { createTriggerNotification } from './createTriggerNotification';

const SEVEN_DAYS = 7;
const ONE_DAY = 1;

export const setNotificationsForCurrentOvulation = (
  daysDiff: number,
  ovulationDate: Date,
  notificationId: string,
  userName: string,
): void => {
  if (daysDiff >= ONE_DAY) {
    createTriggerNotification(notificationId + 'ovulation-0', ovulationDate, userName, 'Ovulacija ti kreće danas!');
  }

  if (daysDiff >= SEVEN_DAYS) {
    createTriggerNotification(
      notificationId + '7',
      subDays(ovulationDate, SEVEN_DAYS),
      userName,
      'Ovulacija ti kreće za 7 dana!',
    );
  }
};
