import React, { useEffect } from 'react';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '@pf/navigation';
import { ThemeProvider } from '@emotion/react';
import { AppTheme } from '@pf/theme';
import { Provider } from 'react-redux';
import { persistor, store } from '@pf/store';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import { Linking } from 'react-native';
import {
  ANDROID_BLOG_NOTIFICIATION_CHANNEL,
  ANDROID_CALENDAR_NOTIFICATION_CHANNEL,
  BlogRoutes,
  CalendarRoutes,
  FCM_TOKEN,
  IS_IOS,
  POSTS_TOPIC,
} from './constants';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const { BLOG_DETAILS } = BlogRoutes;
const { CALENDAR } = CalendarRoutes;

type NotificationData = {
  screen?: string;
  id?: string;
};

const setupAndroidNotificationChannel = async (
  id: string,
  name: string,
  importance: AndroidImportance,
): Promise<void> => {
  await notifee.createChannel({
    id,
    name,
    importance,
  });
};

const saveRemoteNotificationToken = async (newToken: string): Promise<void> => {
  const getHasTokenChanged = async (): Promise<boolean> => {
    const oldToken = await EncryptedStorage.getItem(FCM_TOKEN);
    return newToken !== oldToken;
  };

  const hasTokenChanged = await getHasTokenChanged();
  if (hasTokenChanged) {
    await EncryptedStorage.setItem(FCM_TOKEN, newToken);
  }
};

const App: React.FC = () => {
  useEffect(() => {
    const unsubscribeToTokenRefresh = messaging().onTokenRefresh(refreshedToken => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      saveRemoteNotificationToken(refreshedToken);
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    messaging().subscribeToTopic(POSTS_TOPIC);

    return () => {
      unsubscribeToTokenRefresh();
    };
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-floating-promises */
    (async () => {
      /**
       * getInitialNotification is deprecated on iOS in favour of the PRESS event received by the onForegroundEvent event handler
       */
      if (IS_IOS) {
        return;
      }

      await setupAndroidNotificationChannel(
        ANDROID_CALENDAR_NOTIFICATION_CHANNEL,
        'Kalendar notifikacije',
        AndroidImportance.HIGH,
      );

      await setupAndroidNotificationChannel(
        ANDROID_BLOG_NOTIFICIATION_CHANNEL,
        'Blog notifikacije',
        AndroidImportance.HIGH,
      );
    })();
  }, []);

  const deepLinksConfig = {
    screens: {
      app: {
        initialRouteName: 'home_stack',
        screens: {
          blog_stack: {
            initialRouteName: 'blog',
            screens: {
              blog: 'blog',
              blog_details: {
                path: 'blog_details/:id',
              },
            },
          },
          calendar_stack: {
            initialRouteName: 'calendar',
            screens: {
              calendar: 'calendar',
            },
          },
        },
      },
    },
  };
  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['pinkflag://'],
    config: deepLinksConfig,
    async getInitialURL() {
      /**
       * Handle push notification in quit/terminated state
       */
      const initalRemoteMessage = await messaging().getInitialNotification();

      /**
       * Handle clicking on deep link. Currently unsupported
       */
      const initilaUrl = await Linking.getInitialURL();

      /**
       * Handle local notification in quit/terminated state
       */
      const initalLocalMessage = await notifee.getInitialNotification();

      // if (pressActionId === 'default' && (notification?.data as NotificationData).screen === CALENDAR) {
      //   navigateToCalendar();
      // }
      if (initilaUrl != null) {
        return initilaUrl;
      }

      if (initalRemoteMessage?.data?.id) {
        return `pinkflag://blog_details/${initalRemoteMessage.data.id}`;
      }

      if (initalLocalMessage) {
        const { pressAction, notification } = initalLocalMessage || {};
        const { id: pressActionId } = pressAction || {};

        return 'pinkflag://calendar';
      }
    },
    subscribe(listener) {
      /**
       * Handling push notification when recieved while app was in background state
       */
      const unsubscribeBackgroundPushNotificationListener = messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage.data?.id) {
          listener(`pinkflag://blog_details/${remoteMessage.data.id}`);
        }
      });

      /**
       * Handling push notification when recieved while app was in foreground state
       */
      const unsubscribeForegroundPushNotificationListener = messaging().onMessage(remoteMessage => {
        notifee.displayNotification({
          android: {
            channelId: ANDROID_BLOG_NOTIFICIATION_CHANNEL,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
          },
          title: remoteMessage.notification?.body,
          data: {
            screen: 'blog_details',
            id: remoteMessage?.data?.id || '',
          },
        });
      });

      /**
       * Handling local notification recieved when app was in foreground state
       */
      const unsubscribeForegroundLocalNotificationListener = notifee.onForegroundEvent(
        ({ type, detail: { notification } }) => {
          if (
            type === EventType.PRESS &&
            notification?.data &&
            (notification?.data as NotificationData).screen === BLOG_DETAILS &&
            (notification?.data as NotificationData)?.id
          ) {
            listener(`pinkflag://blog_details/${notification.data.id as string}`);
          }
          if (type === EventType.PRESS && (notification?.data as NotificationData).screen === CALENDAR) {
            listener('pinkflag://calendar');
          }
        },
      );

      /**
       * Handling local notification recieved when app was in background/quit state
       */
      // eslint-disable-next-line @typescript-eslint/require-await
      notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification } = detail;
        if (type === EventType.PRESS && (notification?.data as NotificationData).screen === CALENDAR) {
          listener('pinkflag://calendar');
        }
        if (
          type === EventType.PRESS &&
          notification?.data &&
          (notification?.data as NotificationData).screen === BLOG_DETAILS &&
          (notification?.data as NotificationData)?.id
        ) {
          listener(`pinkflag://blog_details/${notification.data.id as string}`);
        }
      });

      return () => {
        unsubscribeBackgroundPushNotificationListener(),
          unsubscribeForegroundPushNotificationListener(),
          unsubscribeForegroundLocalNotificationListener;
      };
    },
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={AppTheme}>
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
