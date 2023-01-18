import { CustomSwitch, CustomSwitchRef } from '@pf/components';
import { useAppSelector } from '@pf/hooks';
import { selectAreCalendarNotificationsEnabled } from '@pf/reducers/settingsReducer';
import React, { useCallback, useRef } from 'react';
import { Container, Title } from './styles';

interface Props {
  onChange?: (newValue: boolean) => void;
}

export const NotificationInput: React.FC<Props> = ({ onChange }) => {
  const areCalendarNotificationsEnabled = useAppSelector(selectAreCalendarNotificationsEnabled);
  const switchRef = useRef<CustomSwitchRef>(null);

  const handleOnPress = useCallback(() => {
    switchRef.current?.triggerValueChange();
  }, []);

  return (
    <Container onPress={handleOnPress}>
      <Title content="Primaj obaveštenja za kalendar?" />
      <CustomSwitch ref={switchRef} value={areCalendarNotificationsEnabled} onSwitchChange={onChange} />
    </Container>
  );
};
