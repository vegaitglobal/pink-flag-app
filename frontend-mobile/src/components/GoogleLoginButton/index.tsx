/* eslint-disable @typescript-eslint/no-misused-promises */
import { GoogleSvg } from '@pf/assets';
import React, { useCallback } from 'react';
import { ActivityIndicator, Alert, TouchableOpacityProps } from 'react-native';
import { Container, StyledCustomText } from './styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthenticatedUser, EMPTY_STRING } from '@pf/constants';
import { useTheme } from '@emotion/react';

interface Props extends TouchableOpacityProps {
  beforeLogin?: () => void;
  onLogin?: (authenticatedUser?: AuthenticatedUser) => void;
  isLoading?: boolean;
}

export const GoogleLoginButton: React.FC<Props> = ({ onLogin, beforeLogin, isLoading, ...props }) => {
  const theme = useTheme();

  const signIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {
        user: { id, email, givenName, photo },
      } = userInfo;
      onLogin?.({ id, email, name: givenName || EMPTY_STRING, photo: photo || EMPTY_STRING });
    } catch (error) {
      Alert.alert('Došlo je do greške', 'Pokušaj malo kasnije', [{ text: 'Ok' }]);
    }
  }, [onLogin]);

  const handleOnPress = useCallback(async () => {
    beforeLogin?.();
    await signIn();
  }, [beforeLogin, signIn]);

  return (
    <Container {...props} onPress={handleOnPress}>
      {isLoading ? <ActivityIndicator color={theme.colors.primary} /> : <GoogleSvg />}
      <StyledCustomText content="Prijavi se pomoću Google-a" />
    </Container>
  );
};
