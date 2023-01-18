import React from 'react';
import { PrimaryButton } from '@pf/components';
import { Content, Overlay, Title } from './styles';
import { RootNavigatorParams, RootRoutes } from '@pf/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { CALENDAR_ONBOARDING } = RootRoutes;

export const DisabledOverlay: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootNavigatorParams>>();

  return (
    <>
      <Overlay></Overlay>
      <Content>
        <Title content="Kalendar je deaktiviran" />
        <PrimaryButton content="Aktiviraj kalendar" onPress={() => navigate(CALENDAR_ONBOARDING)} />
      </Content>
    </>
  );
};
