import React from 'react';
import { RootRoutes } from '@pf/constants';
import { CalendarOnboardingScreen, CalendarSettingsScreen, GeneralSettingsScreen } from '@pf/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';

const Stack = createNativeStackNavigator();
type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const { APP, GENERAL_SETTINGS, CALENDAR_SETTINGS, CALENDAR_ONBOARDING } = RootRoutes;

export const RootNavigator: React.FC = (props: Partial<StackNavigatorProps>) => {
  return (
    <Stack.Navigator initialRouteName={APP} screenOptions={{ headerShown: false }} {...props}>
      <Stack.Screen name={APP} component={BottomTabNavigator} />
      <Stack.Screen
        name={GENERAL_SETTINGS}
        component={GeneralSettingsScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name={CALENDAR_ONBOARDING}
        component={CalendarOnboardingScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name={CALENDAR_SETTINGS}
        component={CalendarSettingsScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
    </Stack.Navigator>
  );
};
