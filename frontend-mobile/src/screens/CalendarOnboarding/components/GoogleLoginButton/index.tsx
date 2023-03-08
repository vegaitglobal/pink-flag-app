import { GoogleSvg } from '@pf/assets';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, DevelopmentText, InDevelopment, Overlay, StyledCustomText, TextContainer } from './styles';

export const GoogleLoginButton: React.FC<TouchableOpacityProps> = ({ ...props }) => {
  return (
    <Container disabled {...props}>
      <GoogleSvg />
      <StyledCustomText content="Prijavi se pomoću Google-a" />
      <InDevelopment>
        <Overlay />
        <TextContainer>
          <DevelopmentText content="USKORO" />
        </TextContainer>
      </InDevelopment>
    </Container>
  );
};
