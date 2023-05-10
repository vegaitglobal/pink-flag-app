import React, { useMemo } from 'react';
import { ACTIVE_COLOR, Container, DISABLED_COLOR, StyledArrow } from './styles';

interface Props {
  isRight?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  isHidden?: boolean;
}

export const Arrow: React.FC<Props> = ({ isRight, isDisabled, isHidden, onPress }) => {
  const color = useMemo(() => (isDisabled ? DISABLED_COLOR : ACTIVE_COLOR), [isDisabled]);

  if (isHidden) {
    return null;
  }

  return (
    <Container disabled={isDisabled} onPress={onPress}>
      <StyledArrow fill={color} isRight={isRight} />
    </Container>
  );
};
