import { CustomSwitch, CustomSwitchRef } from '@pf/components';
import { useAppSelector } from '@pf/hooks';
import { selectAreBlogNotificationsEnabled } from '@pf/reducers/settingsReducer';
import React, { useCallback, useRef } from 'react';
import { Container, Title } from './styles';

interface Props {
  onChange?: (newValue: boolean) => void;
}

export const NotificationInput: React.FC<Props> = ({ onChange }) => {
  const switchRef = useRef<CustomSwitchRef>(null);
  const areNotificationsEnabled = useAppSelector(selectAreBlogNotificationsEnabled);

  const handleOnPress = useCallback(() => {
    switchRef.current?.triggerValueChange();
  }, []);

  return (
    <Container onPress={handleOnPress}>
      <Title content="Notifikacija za novi post?" />
      <CustomSwitch ref={switchRef} value={areNotificationsEnabled} onSwitchChange={onChange} />
    </Container>
  );
};
