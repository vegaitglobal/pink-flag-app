import notifee, { AndroidImportance, Event, EventType } from '@notifee/react-native';
import {
  ANDROID_BLOG_NOTIFICATION_CHANNEL,
  ANDROID_CALENDAR_NOTIFICATION_CHANNEL,
  BlogRoutes,
  BottomTabRoutes,
  CalendarRoutes,
  FCM_TOKEN,
  RootRoutes,
} from '@pf/constants';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';

const { APP } = RootRoutes;
const { HOME_STACK } = BottomTabRoutes;
const { BLOG, BLOG_DETAILS } = BlogRoutes;
const { CALENDAR } = CalendarRoutes;

type NotificationData = {
  screen?: string;
  id?: string;
};

export const LINKING_PREFIX = 'pinkflag://';
export const deepLinksConfig = {
  screens: {
    [APP]: {
      initialRouteName: HOME_STACK,
      screens: {
        blog_stack: {
          initialRouteName: BLOG,
          screens: {
            blog: BLOG,
            blog_details: {
              path: `${BLOG_DETAILS}/:id`,
            },
          },
        },
        calendar_stack: {
          initialRouteName: CALENDAR,
          screens: {
            calendar: CALENDAR,
          },
        },
      },
    },
  },
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

export const setupAndroidNotificationChannels = async () => {
  await setupAndroidNotificationChannel(
    ANDROID_CALENDAR_NOTIFICATION_CHANNEL,
    'Kalendar notifikacije',
    AndroidImportance.HIGH,
  );

  await setupAndroidNotificationChannel(ANDROID_BLOG_NOTIFICATION_CHANNEL, 'Blog notifikacije', AndroidImportance.HIGH);
};

const getHasTokenChanged = async (newToken: string): Promise<boolean> => {
  const oldToken = await EncryptedStorage.getItem(FCM_TOKEN);
  return newToken !== oldToken;
};

export const saveRemoteNotificationToken = async (newToken: string): Promise<void> => {
  const hasTokenChanged = await getHasTokenChanged(newToken);
  if (hasTokenChanged) {
    await EncryptedStorage.setItem(FCM_TOKEN, newToken);
  }
};

export const displayPushNotification = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  notifee.displayNotification({
    android: {
      channelId: ANDROID_BLOG_NOTIFICATION_CHANNEL,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
    title: remoteMessage.notification?.body,
    data: {
      screen: BLOG_DETAILS,
      id: remoteMessage?.data?.id || '',
    },
  });
};

export const handleOnNotificationPress = async ({ type, detail }: Event, callback: (url: string) => void) => {
  const { notification } = detail;
  const isPress = type === EventType.PRESS;

  if (isPress && (notification?.data as NotificationData).screen === CALENDAR) {
    callback(`${LINKING_PREFIX}${CALENDAR}`);
    return;
  }

  if (
    isPress &&
    notification?.data &&
    (notification?.data as NotificationData).screen === BLOG_DETAILS &&
    (notification?.data as NotificationData)?.id
  ) {
    callback(`${LINKING_PREFIX}${BLOG_DETAILS}/${notification.data.id as string}`);
  }
};
