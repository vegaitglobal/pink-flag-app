import React, { useCallback } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarNavigatorParams, CalendarRoutes, RootNavigatorParams, RootRoutes } from '@pf/constants';
import { CalendarScreen } from '@pf/screens';
import { NavHeader } from '@pf/components';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@pf/hooks';
import { selectIsCalendarActivated } from '@pf/reducers/settingsReducer';

const Stack = createNativeStackNavigator<CalendarNavigatorParams>();
type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const { CALENDAR_SETTINGS } = RootRoutes;
const { CALENDAR } = CalendarRoutes;

const CalendarNavigator: React.FC = (props: Partial<StackNavigatorProps>) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootNavigatorParams>>();
  const isCalendarActivated = useAppSelector(selectIsCalendarActivated);
  const handleOnSettingsPress = useCallback(() => navigate(CALENDAR_SETTINGS), [navigate]);

  return (
    <Stack.Navigator initialRouteName={CALENDAR} screenOptions={{ headerShown: true }} {...props}>
      <Stack.Screen
        name={CALENDAR}
        component={CalendarScreen}
        options={{
          header: props => (
            <NavHeader onSettingsPress={handleOnSettingsPress} isSettingsVisible={isCalendarActivated} {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
