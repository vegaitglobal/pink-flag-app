/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTheme } from '@emotion/react';
import { BottomTabNavigatorParams, BottomTabRoutes } from '@pf/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { UiButton } from '../UiButton';
import { useGetCalendarBannerQuery } from '@pf/services';
import { Container, Description, Loader, Title } from './styles';
import { FALLBACK } from './fallback';

const { CALENDAR_STACK } = BottomTabRoutes;

export const HomeCalendar: React.FC = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCalendarBannerQuery();
  const { navigate } = useNavigation<StackNavigationProp<BottomTabNavigatorParams>>();

  const navigateToCalendar = useCallback(() => {
    navigate(CALENDAR_STACK);
  }, [navigate]);

  if (isLoading) {
    return (
      <Container source={require('../../assets/images/home-calendar.png')}>
        <Loader>
          <ActivityIndicator color={theme.colors.white} />
        </Loader>
      </Container>
    );
  }

  return (
    <Container source={require('../../assets/images/home-calendar.png')}>
      <Title content={data?.title || FALLBACK.title} />
      <Description content={data?.description || FALLBACK.description} />
      <UiButton content={data?.button_text || FALLBACK.button_text} onPress={navigateToCalendar} />
    </Container>
  );
};
