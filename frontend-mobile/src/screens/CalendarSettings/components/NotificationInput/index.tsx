import { CustomSwitch, CustomSwitchRef } from '@pf/components';
import { useAppSelector } from '@pf/hooks';
import { selectAreCalendarNotificationsEnabled } from '@pf/reducers/settingsReducer';
import React, { useCallback, useRef } from 'react';
import { Container, Title } from './styles';
import notifee, { AndroidNotificationSetting, AuthorizationStatus } from '@notifee/react-native';
import { Alert, Linking } from 'react-native';
import { IS_IOS } from '@pf/constants';

interface Props {
  onChange?: (newValue: boolean) => void;
}

export const NotificationInput: React.FC<Props> = ({ onChange }) => {
  const areCalendarNotificationsEnabled = useAppSelector(selectAreCalendarNotificationsEnabled);
  const switchRef = useRef<CustomSwitchRef>(null);

  const handleOnPress = useCallback(() => {
    switchRef.current?.triggerValueChange();
  }, []);

  const openNotificationSettings = useCallback((openAlarmSettings?: boolean) => {
    if (IS_IOS) {
      Linking.openSettings();
      return;
    }

    if (openAlarmSettings) {
      notifee.openAlarmPermissionSettings();
      return;
    }

    notifee.openNotificationSettings();
  }, []);

  const checkForNotificationPermissions = useCallback(async () => {
    const permissions = await notifee.getNotificationSettings();
    const isAndroidAlarmNotificationDisabled = permissions.android.alarm === AndroidNotificationSetting.DISABLED;

    if (permissions.authorizationStatus === AuthorizationStatus.DENIED || isAndroidAlarmNotificationDisabled) {
      Alert.alert(
        'Obaveštenja su ti isključena na nivou uređaja',
        'Da bi primala obaveštenja potrebno je da ih odobriš unutar podešavanja',
        [
          {
            text: 'Odustani',
            onPress: handleOnPress,
            style: 'destructive',
          },
          {
            text: 'Otvori podešavanja',
            onPress: () => openNotificationSettings(isAndroidAlarmNotificationDisabled),
            style: 'cancel',
          },
        ],
      );
    }
  }, [handleOnPress, openNotificationSettings]);

  const handleOnChange = useCallback(
    (newValue: boolean) => {
      if (newValue) {
        checkForNotificationPermissions();
      }
      onChange?.(newValue);
    },
    [checkForNotificationPermissions, onChange],
  );

  return (
    <Container onPress={handleOnPress}>
      <Title content="Primaj obaveštenja za kalendar?" />
      <CustomSwitch ref={switchRef} value={areCalendarNotificationsEnabled} onSwitchChange={handleOnChange} />
    </Container>
  );
};
