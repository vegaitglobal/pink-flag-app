import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DonationRoutes, DonationNavigatorParams } from '@pf/constants';
import { DonationScreen } from '@pf/screens';
import { NavHeader } from '@pf/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<DonationNavigatorParams>();
type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const { DONATIONS } = DonationRoutes;

export interface DonationScreenProps<Screen extends keyof DonationNavigatorParams> {
  navigation: StackNavigationProp<DonationNavigatorParams, Screen>;
  route: RouteProp<DonationNavigatorParams, Screen>;
}

const DonationNavigator: React.FC = (props: Partial<StackNavigatorProps>) => {
  return (
    <Stack.Navigator initialRouteName={DONATIONS} screenOptions={{ headerShown: true }} {...props}>
      <Stack.Screen
        name={DONATIONS}
        component={DonationScreen}
        options={{
          header: props => <NavHeader isSettingsVisible={false} {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default DonationNavigator;
