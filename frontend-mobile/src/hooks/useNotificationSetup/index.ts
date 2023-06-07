import notifee from '@notifee/react-native';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  LINKING_PREFIX,
  deepLinksConfig,
  displayPushNotification,
  handleOnNotificationPress,
  saveRemoteNotificationToken,
  setupAndroidNotificationChannels,
} from './utils';
import { BlogRoutes, CalendarRoutes, IS_IOS, POSTS_TOPIC } from '@pf/constants';
import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
import { useAppSelector } from '../useRedux';
import { selectAreBlogNotificationsEnabled } from '@pf/reducers/settingsReducer';

const { BLOG_DETAILS } = BlogRoutes;
const { CALENDAR } = CalendarRoutes;
const checkOnce = () => true;

export const useNotificationsSetup = () => {
  const areBlogNotificationEnabled = useAppSelector(selectAreBlogNotificationsEnabled, checkOnce);

  useEffect(() => {
    const unsubscribeToTokenRefresh = messaging().onTokenRefresh(refreshedToken => {
      saveRemoteNotificationToken(refreshedToken);
    });

    if (areBlogNotificationEnabled) {
      messaging().subscribeToTopic(POSTS_TOPIC);
    }

    return () => {
      unsubscribeToTokenRefresh();
    };
  }, [areBlogNotificationEnabled]);

  useEffect(() => {
    (async () => {
      /**
       * getInitialNotification is deprecated on iOS in favour of the PRESS event received by the onForegroundEvent event handler
       */
      if (IS_IOS) {
        return;
      }

      await setupAndroidNotificationChannels();
    })();
  }, []);

  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: [LINKING_PREFIX],
    config: deepLinksConfig,
    async getInitialURL() {
      /**
       * Handle clicking on deep link. Currently unsupported
       */
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl != null) {
        return initialUrl;
      }

      /**
       * Handle push notification in quit/terminated state
       */
      const initialRemoteMessage = await messaging().getInitialNotification();
      if (initialRemoteMessage?.data?.id) {
        return `${LINKING_PREFIX}${BLOG_DETAILS}/${initialRemoteMessage.data.id}`;
      }

      /**
       * Handle local notification in quit/terminated state
       */
      const initialLocalMessage = await notifee.getInitialNotification();
      if (initialLocalMessage) {
        return `${LINKING_PREFIX}${CALENDAR}`;
      }
    },
    subscribe(listener) {
      /**
       * Handling push notification when received while app was in background state
       */
      const unsubscribeBackgroundPushNotificationListener = messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage.data?.id) {
          listener(`${LINKING_PREFIX}${BLOG_DETAILS}/${remoteMessage.data.id}`);
        }
      });

      /**
       * Handling push notification when received while app was in foreground state
       */
      const unsubscribeForegroundPushNotificationListener = messaging().onMessage(remoteMessage => {
        displayPushNotification(remoteMessage);
      });

      /**
       * Handling local notification received when app was in foreground state
       */
      const unsubscribeForegroundLocalNotificationListener = notifee.onForegroundEvent(event => {
        handleOnNotificationPress(event, listener);
      });

      /**
       * Handling local notification received when app was in background/quit state
       */
      notifee.onBackgroundEvent(async event => {
        handleOnNotificationPress(event, listener);
      });

      return () => {
        unsubscribeBackgroundPushNotificationListener();
        unsubscribeForegroundPushNotificationListener();
        unsubscribeForegroundLocalNotificationListener();
      };
    },
  };

  return linking;
};
