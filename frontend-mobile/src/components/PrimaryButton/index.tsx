import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, DisabledOverlay, StyledCustomText } from './styles';

interface Props extends TouchableOpacityProps {
  content?: string;
  background?: string;
  isFullWidth?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ content, disabled, background, isFullWidth = true, ...props }) => {
  return (
    <Container disabled={disabled} background={background} isFullWidth={isFullWidth} {...props}>
      <StyledCustomText content={content} />
      {disabled && <DisabledOverlay />}
    </Container>
  );
};

export { type Props as PrimaryButtonProps };
