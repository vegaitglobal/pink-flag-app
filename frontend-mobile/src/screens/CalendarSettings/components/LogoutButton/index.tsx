import React from 'react';
import { Container } from './styles';
import { PrimaryButton } from '@pf/components';
import { SlideInEntering, SlideInExiting } from './customAnimations';

const BUTTON_COLOR = '#EC6767';

interface Props {
  onPress?: () => void;
}

export const LogoutButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Container entering={SlideInEntering} exiting={SlideInExiting}>
      <PrimaryButton content="Odjavi se" onPress={onPress} background={BUTTON_COLOR} />
    </Container>
  );
};
