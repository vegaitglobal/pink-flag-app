import { PERIOD_1 } from './../constants';
import { addDays, isAfter, subDays } from 'date-fns';
import { createTriggerNotification } from './createTriggerNotification';

const ONE_DAY = 1;

export const setPeriod1Notification = (
  menstruationDate: Date,
  cycleLength: number,
  notificationId: string,
  userName: string,
): void => {
  const today = new Date();
  let date = subDays(menstruationDate, ONE_DAY);

  while (!isAfter(date, today)) {
    date = addDays(date, cycleLength);
  }

  createTriggerNotification(notificationId + PERIOD_1, date, userName, 'Period ti kreće sutra!');
};
