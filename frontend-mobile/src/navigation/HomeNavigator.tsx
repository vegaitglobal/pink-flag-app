import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { BlogRoutes, HomeNavigatorParams, HomeRoutes } from '@pf/constants';
import { BlogDetailsScreen, HomeScreen } from '@pf/screens';
import { NavHeader } from '@pf/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const { HOME } = HomeRoutes;
const { BLOG_DETAILS } = BlogRoutes;

export interface HomeScreenProps<Screen extends keyof HomeNavigatorParams> {
  navigation: StackNavigationProp<HomeNavigatorParams, Screen>;
  route: RouteProp<HomeNavigatorParams, Screen>;
}

const HomeNavigator: React.FC = (props: Partial<StackNavigatorProps>) => {
  return (
    <Stack.Navigator initialRouteName={HOME} screenOptions={{ headerShown: true }} {...props}>
      <Stack.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          header: props => <NavHeader {...props} />,
        }}
      />
      <Stack.Screen
        name={BLOG_DETAILS}
        component={BlogDetailsScreen}
        options={{
          header: props => <NavHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
