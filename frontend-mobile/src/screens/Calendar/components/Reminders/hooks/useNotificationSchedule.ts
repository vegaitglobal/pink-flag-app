import { useCallback, useEffect } from 'react';
import { useAppSelector } from '@pf/hooks';
import { OVULATION_0, OVULATION_7, PERIOD_1, PERIOD_7 } from './../constants';
import { selectAreCalendarNotificationsEnabled } from '@pf/reducers/settingsReducer';
import notifee from '@notifee/react-native';
import {
  setOvulation0Notification,
  setOvulation7Notification,
  setPeriod1Notification,
  setPeriod7Notification,
} from '../utils';
import { selectUserName } from '@pf/reducers/userReducer';
import { getOvulationDate } from '../../../utils';
import { EMPTY_ARRAY } from '@pf/constants';

export const useNotificationSchedule = (
  menstruationStart?: string,
  menstruationLength?: number,
  cycleLength?: number,
): void => {
  const userName = useAppSelector(selectUserName);
  const areCalendarNotificationsEnabled = useAppSelector(selectAreCalendarNotificationsEnabled);

  const getScheduledNotifications = useCallback(async (notificationIdPattern: string) => {
    const notifications = await notifee.getTriggerNotificationIds();
    const cancelNotifications = notifications.some(x => !x.includes(notificationIdPattern));

    if (!cancelNotifications) {
      return notifications;
    }

    await notifee.cancelAllNotifications();
    return EMPTY_ARRAY;
  }, []);

  useEffect(() => {
    (async () => {
      if (!menstruationStart || cycleLength === undefined || menstruationLength === undefined) {
        return;
      }

      if (!areCalendarNotificationsEnabled) {
        notifee.cancelAllNotifications();
        return;
      }

      const notificationIdPattern = `${userName}-MS[${menstruationStart}]-PL[${menstruationLength}]-CL[${cycleLength}]-`;
      const notifications = await getScheduledNotifications(notificationIdPattern);
      const menstruationStartDate = new Date(menstruationStart);
      const ovulationDate = getOvulationDate(menstruationStart, cycleLength);

      if (!notifications.some(x => x.includes(PERIOD_1))) {
        setPeriod1Notification(menstruationStartDate, cycleLength, notificationIdPattern, userName);
      }

      if (!notifications.some(x => x.includes(PERIOD_7))) {
        setPeriod7Notification(menstruationStartDate, cycleLength, notificationIdPattern, userName);
      }

      if (!notifications.some(x => x.includes(OVULATION_0))) {
        setOvulation0Notification(ovulationDate, cycleLength, notificationIdPattern, userName);
      }

      if (!notifications.some(x => x.includes(OVULATION_7))) {
        setOvulation7Notification(ovulationDate, cycleLength, notificationIdPattern, userName);
      }
    })();
  }, [
    areCalendarNotificationsEnabled,
    cycleLength,
    getScheduledNotifications,
    menstruationLength,
    menstruationStart,
    userName,
  ]);
};
