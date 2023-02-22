/* eslint-disable @typescript-eslint/no-floating-promises */
import { addDays, isBefore, subDays } from 'date-fns';
import { createTriggerNotification } from './createTriggerNotification';

const SEVEN_DAYS = 7;

export const setNotificationsForUpcomingOvulation = (
  ovulationDate: Date,
  cycleLength: number,
  notificationId: string,
  userName: string,
): void => {
  let upcomingOvulationDate = addDays(ovulationDate, cycleLength);

  if (isBefore(upcomingOvulationDate, new Date())) {
    upcomingOvulationDate = addDays(upcomingOvulationDate, cycleLength);
  }

  createTriggerNotification(
    notificationId + 'ovulation-0',
    upcomingOvulationDate,
    userName,
    'Ovulacija ti kreće danas!',
  );

  createTriggerNotification(
    notificationId + 'ovulation-7',
    subDays(upcomingOvulationDate, SEVEN_DAYS),
    userName,
    'Ovulacija ti kreće za 7 dana!',
  );
};
