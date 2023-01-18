import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, DisabledOverlay, StyledCustomText } from './styles';

interface Props extends TouchableOpacityProps {
  content?: string;
  background?: string;
}

export const PrimaryButton: React.FC<Props> = ({ content, disabled, background, ...props }) => {
  return (
    <Container disabled={disabled} background={background} {...props}>
      <StyledCustomText content={content} />
      {disabled && <DisabledOverlay />}
    </Container>
  );
};
