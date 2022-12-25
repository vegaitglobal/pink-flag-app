import { CustomSwitch, CustomSwitchRef } from '@pf/components';
import React, { useCallback, useRef } from 'react';
import { Container, Title } from './styles';

export const NotificationInput: React.FC = () => {
  const switchRef = useRef<CustomSwitchRef>(null);

  const handleOnPress = useCallback(() => {
    switchRef.current?.triggerValueChange();
  }, []);

  return (
    <Container onPress={handleOnPress}>
      <Title content="Primaj obaveštenja za kalendar?" />
      <CustomSwitch ref={switchRef} />
    </Container>
  );
};
