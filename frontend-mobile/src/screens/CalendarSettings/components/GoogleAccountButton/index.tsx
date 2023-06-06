/* eslint-disable @typescript-eslint/no-misused-promises */
import { ArrowDownSvg, GoogleSvg } from '@pf/assets';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import {
  Avatar,
  Container,
  ContentArea,
  LeftArea,
  RightArea,
  Row,
  StyledGoogleLoginButton,
  Subtitle,
  Title,
  TopMask,
} from './styles';
import { useAppDispatch, useAppSelector } from '@pf/hooks';
import { logoutUser, selectUser } from '@pf/reducers/userReducer';
import { AuthenticatedUser, EMPTY_STRING } from '@pf/constants';
import { useSettingsLogin } from './useSettingsLogin';
import { LogoutButton } from '../LogoutButton';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { delay } from '@pf/utils';

const FACING_UP = '-180deg';
const FACING_DOWN = '0deg';
const GOOGLE_ICON_SIZE = 24;
const ANIMATION_DURATION = 400;

interface Ref {
  hideDropdown: () => void;
}

export const GoogleAccountButton = forwardRef<Ref>(({ ...props }, ref) => {
  const dispatch = useAppDispatch();
  const arrowAngle = useSharedValue(FACING_DOWN);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const { email, name, photo, id } = useAppSelector(selectUser);
  const { handleLoginFromSettings, isLoading } = useSettingsLogin();

  const beforeLogin = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const onLogin = useCallback(
    (authenticatedUser?: AuthenticatedUser) => {
      const { id, email, photo } = authenticatedUser || {};
      handleLoginFromSettings(id, email, photo);
    },
    [handleLoginFromSettings],
  );

  const showDropdown = useCallback(() => {
    setIsLogoutVisible(prevState => !prevState);
  }, []);

  const hideDropdown = useCallback(() => {
    setIsLogoutVisible(false);
  }, []);

  const handleLogout = useCallback(async () => {
    hideDropdown();
    await delay(ANIMATION_DURATION);
    dispatch(logoutUser());
  }, [dispatch, hideDropdown]);

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(arrowAngle.value, { duration: ANIMATION_DURATION }) }],
    };
  });

  useEffect(() => {
    if (isLogoutVisible) {
      arrowAngle.value = FACING_UP;
      return;
    }

    arrowAngle.value = FACING_DOWN;
  }, [arrowAngle, isLogoutVisible]);

  useImperativeHandle(ref, () => ({
    hideDropdown: hideDropdown,
  }));

  if (!id) {
    return <StyledGoogleLoginButton beforeLogin={beforeLogin} onLogin={onLogin} isLoading={isLoading} />;
  }

  return (
    <>
      <TopMask />
      <Container onPress={showDropdown} {...props}>
        <LeftArea>
          <Avatar source={{ uri: photo }} />
        </LeftArea>
        <ContentArea>
          <Title content={`Prijavljena kao ${name || EMPTY_STRING}`} />
          <Row>
            <Subtitle content={email} />
            <Animated.View style={arrowStyle}>
              <ArrowDownSvg />
            </Animated.View>
          </Row>
        </ContentArea>
        <RightArea>
          <GoogleSvg height={GOOGLE_ICON_SIZE} width={GOOGLE_ICON_SIZE} />
        </RightArea>
      </Container>
      {isLogoutVisible && <LogoutButton onPress={handleLogout} />}
    </>
  );
});

export { type Ref as GoogleAccountButtonRef };
