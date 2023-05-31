import { PERIOD_7 } from './../constants';
import { addDays, isAfter, subDays } from 'date-fns';
import { createTriggerNotification } from './createTriggerNotification';

const SEVEN_DAYS = 7;

export const setPeriod7Notification = (
  menstruationDate: Date,
  cycleLength: number,
  notificationId: string,
  userName: string,
): void => {
  const today = new Date();
  let date = subDays(menstruationDate, SEVEN_DAYS);

  while (!isAfter(date, today)) {
    date = addDays(date, cycleLength);
  }

  createTriggerNotification(notificationId + PERIOD_7, date, userName, 'Period ti kreće za 7 dana!');
};
