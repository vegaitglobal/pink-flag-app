/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { ANDROID_NOTIFICATION_CHANNEL, FCM_TOKEN, POSTS_TOPIC } from '@pf/constants';
import EncryptedStorage from 'react-native-encrypted-storage';

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

export const usePushNotificationsListener = (): void => {
  useEffect(() => {
    /**
     * Handling notification when recieved while app was in quit/terminated state
     */
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('TERMINATED APP NOTIFICATION', remoteMessage);
      });

    /**
     * Handling notification when recieved while app was in background state
     */
    const unsubscribeBackgroundListener = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('BACKGROUND NOTIFICATION', remoteMessage);
    });

    /**
     * Handling notification when recieved while app was in foreground state
     */
    const unsubscribeForegroundListener = messaging().onMessage(remoteMessage => {
      console.log('FOREGROUND NOTIFICATION', remoteMessage);
      notifee.displayNotification({
        android: { channelId: ANDROID_NOTIFICATION_CHANNEL, importance: AndroidImportance.HIGH },
        title: remoteMessage.notification?.body,
      });
    });

    const unsubscribeToTokenRefresh = messaging().onTokenRefresh(refreshedToken => {
      saveRemoteNotificationToken(refreshedToken);
    });

    messaging().subscribeToTopic(POSTS_TOPIC);

    return () => {
      unsubscribeForegroundListener(), unsubscribeToTokenRefresh(), unsubscribeBackgroundListener();
    };
  }, []);
};
