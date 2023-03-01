import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { ANDROID_NOTIFICATION_CHANNEL } from '@pf/constants';

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
        channelId: ANDROID_NOTIFICATION_CHANNEL,
        smallIcon: 'ic_small_icon',
        color: '#EC67B1',
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
      data: {
        screen: 'calendar',
      },
    },
    trigger,
  );
};
