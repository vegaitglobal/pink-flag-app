import { differenceInCalendarDays } from 'date-fns';
import { useEffect } from 'react';
import { useAppSelector } from '@pf/hooks';
import { selectAreCalendarNotificationsEnabled } from '@pf/reducers/settingsReducer';
import notifee from '@notifee/react-native';
import {
  setNotificationsForCurrentOvulation,
  setNotificationsForCurrentPeriod,
  setNotificationsForUpcomingOvulation,
  setNotificationsForUpcomingPeriod,
} from '../utils';
import { selectUserName } from '@pf/reducers/userReducer';
import { getOvulationDate } from '../../../utils';
/* eslint-disable @typescript-eslint/no-floating-promises */

export const useNotificationSchedule = (menstruationStart?: string, cycleLength?: number): void => {
  const userName = useAppSelector(selectUserName);
  const areCalendarNotificationsEnabled = useAppSelector(selectAreCalendarNotificationsEnabled);

  useEffect(() => {
    (async () => {
      if (!menstruationStart || cycleLength === undefined) {
        return;
      }

      if (!areCalendarNotificationsEnabled) {
        notifee.cancelAllNotifications();
        return;
      }

      const notificationId = `${userName}-${menstruationStart}-${cycleLength}-`;
      const setupDone = (await notifee.getTriggerNotificationIds()).some(x =>
        [notificationId + '1', notificationId + '7'].includes(x),
      );

      if (setupDone) {
        return;
      }

      notifee.cancelAllNotifications();
      const menstruationStartDate = new Date(menstruationStart);
      const ovulationDate = getOvulationDate(menstruationStart, cycleLength);
      const menstruationDaysDiff = differenceInCalendarDays(menstruationStartDate, new Date());
      const ovulationDaysDiff = differenceInCalendarDays(ovulationDate, new Date());

      if (ovulationDaysDiff < 0) {
        setNotificationsForUpcomingOvulation(ovulationDate, cycleLength, notificationId, userName);
      }

      if (ovulationDaysDiff >= 1) {
        setNotificationsForCurrentOvulation(ovulationDaysDiff, ovulationDate, notificationId, userName);
      }

      if (menstruationDaysDiff < 0) {
        setNotificationsForUpcomingPeriod(menstruationStartDate, cycleLength, notificationId, userName);
        return;
      }

      setNotificationsForCurrentPeriod(menstruationDaysDiff, menstruationStartDate, notificationId, userName);
    })();
  }, [areCalendarNotificationsEnabled, cycleLength, menstruationStart, userName]);
};

//! Test on android
//! Testing on iOS
//! Should re-run only when menstruationStart changes? Thinking about notificationIDs, should they be included in the setupDone array check.
