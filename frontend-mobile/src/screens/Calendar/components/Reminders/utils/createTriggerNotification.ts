import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

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
        channelId: 'kalendar-notifikacije',
      },
      data: {
        screen: 'calendar',
      },
    },
    trigger,
  );
};
