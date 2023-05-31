/* eslint-disable @typescript-eslint/no-misused-promises */
import { ArrowDownSvg, GoogleSvg } from '@pf/assets';
import React, { useCallback } from 'react';
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
} from './styles';
import { useAppDispatch, useAppSelector } from '@pf/hooks';
import { clearUser, selectUser } from '@pf/reducers/userReducer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EMPTY_STRING, RootNavigatorParams, RootRoutes } from '@pf/constants';
import { useNavigation } from '@react-navigation/native';

const GOOGLE_ICON_SIZE = 24;
const { CALENDAR_ONBOARDING } = RootRoutes;

export const GoogleAccountButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<RootNavigatorParams>>();
  const { email, name, photo, id } = useAppSelector(selectUser);

  const beforeLogin = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  const afterLogin = useCallback(() => {
    //! check if contains data on backend.
    //! If does, return;
    goBack();
    navigate(CALENDAR_ONBOARDING, { skipFirstPage: true });
  }, [goBack, navigate]);

  if (!id) {
    return <StyledGoogleLoginButton beforeLogin={beforeLogin} onLogin={afterLogin} />;
  }

  return (
    <Container>
      <LeftArea>
        <Avatar source={{ uri: photo }} />
      </LeftArea>
      <ContentArea>
        <Title content={`Prijavljena kao ${name || EMPTY_STRING}`} />
        <Row>
          <Subtitle content={email} />
          <ArrowDownSvg />
        </Row>
      </ContentArea>
      <RightArea>
        <GoogleSvg height={GOOGLE_ICON_SIZE} width={GOOGLE_ICON_SIZE} />
      </RightArea>
    </Container>
  );
};
