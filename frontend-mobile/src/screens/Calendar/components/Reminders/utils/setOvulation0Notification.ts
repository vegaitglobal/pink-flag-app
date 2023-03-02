/* eslint-disable @typescript-eslint/no-floating-promises */
import { addDays, isAfter } from 'date-fns';
import { OVULATION_0 } from '../constants';
import { createTriggerNotification } from './createTriggerNotification';

export const setOvulation0Notification = (
  ovulationDate: Date,
  cycleLength: number,
  notificationId: string,
  userName: string,
): void => {
  const today = new Date();
  let date = ovulationDate;

  while (!isAfter(date, today)) {
    date = addDays(date, cycleLength);
  }

  createTriggerNotification(notificationId + OVULATION_0, date, userName, 'Ovulacija ti kreće danas!');
};
