/* eslint-disable @typescript-eslint/no-misused-promises */
import { GoogleSvg } from '@pf/assets';
import React, { useCallback } from 'react';
import { Avatar, Container, ContentArea, LeftArea, RightArea, Subtitle, Title } from './styles';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { objectLog } from '@pf/utils';

const GOOGLE_ICON_SIZE = 24;

export const GoogleAccountButton: React.FC = () => {
  const signIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      objectLog('userInfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('canceled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('inProgress');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('noPlayService');
        // play services not available or outdated
      } else {
        console.log('else', error);

        // some other error happened
      }
    }
  }, []);

  return (
    <Container onPress={signIn}>
      <LeftArea>
        <Avatar />
      </LeftArea>
      <ContentArea>
        <Title content="Sign in as Milica" />
        <Subtitle content="m.petrovic@gmail.com" />
      </ContentArea>
      <RightArea>
        <GoogleSvg height={GOOGLE_ICON_SIZE} width={GOOGLE_ICON_SIZE} />
      </RightArea>
    </Container>
  );
};
