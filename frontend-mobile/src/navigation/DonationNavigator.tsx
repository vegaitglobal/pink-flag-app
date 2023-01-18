import React, { useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { DonationRoutes, DonationNavigatorParams, RootNavigatorParams, RootRoutes } from '@pf/constants';
import { DonationScreen } from '@pf/screens';
import { NavHeader } from '@pf/components';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const { DONATIONS } = DonationRoutes;
const { GENERAL_SETTINGS } = RootRoutes;

export interface DonationScreenProps<Screen extends keyof DonationNavigatorParams> {
  navigation: StackNavigationProp<DonationNavigatorParams, Screen>;
  route: RouteProp<DonationNavigatorParams, Screen>;
}

const DonationNavigator: React.FC = (props: Partial<StackNavigatorProps>) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootNavigatorParams>>();
  const handleOnSettingsPress = useCallback(() => navigate(GENERAL_SETTINGS), [navigate]);

  return (
    <Stack.Navigator initialRouteName={DONATIONS} screenOptions={{ headerShown: true }} {...props}>
      <Stack.Screen
        name={DONATIONS}
        component={DonationScreen}
        options={{
          header: props => <NavHeader onSettingsPress={handleOnSettingsPress} {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default DonationNavigator;
