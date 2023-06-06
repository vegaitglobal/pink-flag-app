import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootNavigator } from './RootNavigator';
import { useNotificationsSetup } from '@pf/hooks';

export const Navigation: React.FC = () => {
  const linking = useNotificationsSetup();

  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
};
