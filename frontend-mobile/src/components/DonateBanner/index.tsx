/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback } from 'react';
import { Container, Description, Loader, Title } from './styles';
import { UiButton } from '@pf/components';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigatorParams, BottomTabRoutes } from '@pf/constants';
import { useGetDonationsModuleQuery } from '@pf/services';
import { FALLBACK } from './fallback';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@emotion/react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { DONATION_STACK } = BottomTabRoutes;

export const DonateBanner: React.FC = ({ ...props }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetDonationsModuleQuery();
  const { navigate } = useNavigation<NativeStackNavigationProp<BottomTabNavigatorParams>>();
  const handleOnPress = useCallback(() => navigate(DONATION_STACK), [navigate]);

  if (isLoading) {
    return (
      <Container source={require('../../assets/images/donation.png')} resizeMode="stretch" {...props}>
        <Loader>
          <ActivityIndicator color={theme.colors.white} />
        </Loader>
      </Container>
    );
  }

  return (
    <Container source={require('../../assets/images/donation.png')} resizeMode="stretch" {...props}>
      <Title content={data?.title || FALLBACK.title} />
      <Description content={data?.description || FALLBACK.description} />
      <UiButton content={data?.button_text || FALLBACK.button_text} onPress={handleOnPress} />
    </Container>
  );
};
