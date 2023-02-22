/* eslint-disable @typescript-eslint/require-await */
import { useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarNavigatorParams, CalendarRoutes } from '@pf/constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TypedNavigation = NativeStackNavigationProp<CalendarNavigatorParams>;
const { CALENDAR } = CalendarRoutes;
type NotificationData = {
  screen?: string;
};

export const useNotificationListener = (): void => {
  const { navigate } = useNavigation<TypedNavigation>();
  useEffect(() => {
    const unsubscribeForegroundListener = notifee.onForegroundEvent(({ type, detail: { notification } }) => {
      if (type === EventType.PRESS && (notification?.data as NotificationData).screen === CALENDAR) {
        navigate(CALENDAR);
      }
    });

    return () => {
      unsubscribeForegroundListener();
    };
  }, [navigate]);

  //! Test
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification } = detail;
    if (type === EventType.ACTION_PRESS && (notification?.data as NotificationData).screen === CALENDAR) {
      navigate(CALENDAR);
    }
  });
};
