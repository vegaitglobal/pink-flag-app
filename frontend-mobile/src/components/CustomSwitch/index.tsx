import { useTheme } from '@emotion/react';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Container, Switch, Base } from './styles';
import { useAnimation } from './useAnimation';

interface Props {
  value?: boolean;
  onSwitchChange?: (newValue: boolean) => void;
}

export interface Ref {
  triggerValueChange: () => void;
}

export const CustomSwitch = forwardRef<Ref, Props>(({ value = false, onSwitchChange, ...props }, ref) => {
  const theme = useTheme();
  const [isOn, setIsOn] = useState(value);
  const { animatedX, handleTurnOff, handleTurnOn, interpolatedColor } = useAnimation(value, theme);

  const handleOnValueChange = useCallback(() => {
    if (isOn) {
      handleTurnOff();
      setIsOn(false);
      onSwitchChange?.(false);
      return;
    }

    handleTurnOn();
    setIsOn(true);
    onSwitchChange?.(true);
  }, [handleTurnOff, handleTurnOn, isOn, onSwitchChange]);

  useImperativeHandle(ref, () => ({
    triggerValueChange: handleOnValueChange,
  }));

  return (
    <Container onPress={handleOnValueChange} hitSlop={5} {...props}>
      <Base style={{ backgroundColor: interpolatedColor }}>
        <Switch style={{ transform: [{ translateX: animatedX }] }} />
      </Base>
    </Container>
  );
});
