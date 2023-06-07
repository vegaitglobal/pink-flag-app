import notifee, { AndroidBadgeIconType, AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { ANDROID_CALENDAR_NOTIFICATION_CHANNEL, CalendarRoutes } from '@pf/constants';
const { CALENDAR } = CalendarRoutes;

export const createTriggerNotification = async (
  notificationId: string,
  date: Date,
  userName: string,
  description: string,
): Promise<void> => {
  date.setHours(9);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title: `Ćao ${userName},`,
      body: description,
      android: {
        channelId: ANDROID_CALENDAR_NOTIFICATION_CHANNEL,
        badgeIconType: AndroidBadgeIconType.SMALL,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_small_icon',
        color: '#EC67B1',
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
      data: {
        screen: CALENDAR,
      },
    },
    trigger,
  );
};
