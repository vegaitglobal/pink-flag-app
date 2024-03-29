import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { BlogRoutes, BlogNavigatorParams } from '@pf/constants';
import { BlogDetailsScreen, BlogScreen } from '@pf/screens';
import { NavHeader } from '@pf/components';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<BlogNavigatorParams>();
type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const { BLOG, BLOG_DETAILS } = BlogRoutes;

export interface BlogScreenProps<Screen extends keyof BlogNavigatorParams> {
  navigation: NativeStackNavigationProp<BlogNavigatorParams, Screen>;
  route: RouteProp<BlogNavigatorParams, Screen>;
}

const BlogNavigator: React.FC = (props: Partial<StackNavigatorProps>) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }} {...props} initialRouteName={BLOG}>
      <Stack.Screen
        name={BLOG}
        component={BlogScreen}
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

export default BlogNavigator;
