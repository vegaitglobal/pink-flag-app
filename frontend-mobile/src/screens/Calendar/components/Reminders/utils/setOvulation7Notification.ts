/* eslint-disable @typescript-eslint/no-floating-promises */
import { addDays, isAfter, subDays } from 'date-fns';
import { OVULATION_7 } from '../constants';
import { createTriggerNotification } from './createTriggerNotification';

const SEVEN_DAYS = 7;

export const setOvulation7Notification = (
  ovulationDate: Date,
  cycleLength: number,
  notificationId: string,
  userName: string,
): void => {
  const today = new Date();
  let date = subDays(ovulationDate, SEVEN_DAYS);

  while (!isAfter(date, today)) {
    date = addDays(date, cycleLength);
  }

  createTriggerNotification(notificationId + OVULATION_7, date, userName, 'Ovulacija ti kreće za 7 dana!');
};
