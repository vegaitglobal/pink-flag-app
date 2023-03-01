/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback } from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { ANDROID_NOTIFICATION_CHANNEL, BottomTabRoutes, CalendarRoutes, IS_IOS, RootRoutes } from '@pf/constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { APP } = RootRoutes;
const { CALENDAR } = CalendarRoutes;
const { CALENDAR_STACK } = BottomTabRoutes;
type TypedNavigation = NativeStackNavigationProp<any>;
type NotificationData = {
  screen?: string;
};

export const useNotificationListener = (): void => {
  const { navigate } = useNavigation<TypedNavigation>();
  const navigateToCalendar = useCallback(() => {
    navigate(APP, {
      screen: CALENDAR_STACK,
      params: { screen: CALENDAR, params: { isOpenedFromNotification: true } },
    });
  }, [navigate]);

  const setupAndroidNotificationChannel = useCallback(async () => {
    await notifee.createChannel({
      id: ANDROID_NOTIFICATION_CHANNEL,
      name: 'Kalendar notifikacije',
      importance: AndroidImportance.HIGH,
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (IS_IOS) {
        return;
      }

      await setupAndroidNotificationChannel();
      const initialNotification = await notifee.getInitialNotification();

      if (!initialNotification) {
        return;
      }

      const { pressAction, notification } = initialNotification || {};
      const { id: pressActionId } = pressAction || {};

      if (pressActionId === 'default' && (notification?.data as NotificationData).screen === CALENDAR) {
        navigateToCalendar();
      }
    })();

    const unsubscribeForegroundListener = notifee.onForegroundEvent(({ type, detail: { notification } }) => {
      if (type === EventType.PRESS && (notification?.data as NotificationData).screen === CALENDAR) {
        navigateToCalendar();
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification } = detail;
      if (type === EventType.PRESS && (notification?.data as NotificationData).screen === CALENDAR) {
        navigateToCalendar();
      }
    });

    return () => {
      unsubscribeForegroundListener();
    };
  }, [navigate, navigateToCalendar, setupAndroidNotificationChannel]);
};
