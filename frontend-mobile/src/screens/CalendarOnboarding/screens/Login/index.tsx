import { GoogleLoginButton, Line } from '@pf/components';
import React from 'react';
import { Container, StyledDescription, StyledTitle, StyledButton } from './styles';
import { AuthenticatedUser } from '@pf/constants';

interface Props {
  onLogin: (authenticatedUser?: AuthenticatedUser) => void;
  onAnonymousLogin: () => void;
}

export const LoginScreen: React.FC<Props> = ({ onLogin, onAnonymousLogin }) => {
  return (
    <Container>
      <StyledTitle content="Prijavi se" />
      <GoogleLoginButton onLogin={onLogin} />
      <StyledButton content="Započni kalendar bez prijave" onPress={onAnonymousLogin} />
      <Line />
      <StyledDescription content="Prijavljivanjem pomoću Google-a ti omogućava da sve svoje podatke vezane za kalendar čuvaš na svom Google nalogu." />
    </Container>
  );
};
