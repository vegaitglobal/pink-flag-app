import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigatorParams, HomeRoutes } from '@pf/constants';
import { HomeScreen } from '@pf/screens';
import { NavHeader } from '@pf/components';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<HomeNavigatorParams>();
type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const { HOME } = HomeRoutes;

export interface HomeScreenProps<Screen extends keyof HomeNavigatorParams> {
  navigation: NativeStackNavigationProp<HomeNavigatorParams, Screen>;
  route: RouteProp<HomeNavigatorParams, Screen>;
}

const HomeNavigator: React.FC = (props: Partial<StackNavigatorProps>) => {
  return (
    <Stack.Navigator initialRouteName={HOME} screenOptions={{ headerShown: true }} {...props}>
      <Stack.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          header: props => <NavHeader isSettingsVisible={false} {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
