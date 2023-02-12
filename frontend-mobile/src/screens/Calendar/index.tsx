/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarExplanation, Footer, Reminders, UserGreeting } from '@pf/components';
import { Container, Content, ExplanationWrapper, getStyles, StyledPinkFlagCalendar } from './styles';
import GreetingData from '../../assets/data/greeting.json';
import { useTheme } from '@emotion/react';
import { CalendarNavigatorScreenProps, CalendarRoutes, EMPTY_STRING, RootRoutes } from '@pf/constants';
import { useAppSelector } from '@pf/hooks';
import { selectUser } from '@pf/reducers/userReducer';
import { selectIsCalendarActivated } from '@pf/reducers/settingsReducer';
import { getMarkedDates } from './utils';

const NAVIGATION_DELAY = 500;
const { CALENDAR } = CalendarRoutes;
const { CALENDAR_ONBOARDING } = RootRoutes;
type Props = CalendarNavigatorScreenProps<typeof CALENDAR>;

export const CalendarScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const theme = useTheme();
  const [monthOffset, setMonthOffset] = useState(0);
  const inlineStyles = useMemo(() => getStyles(theme), [theme]);
  const isCalendarActivated = useAppSelector(selectIsCalendarActivated);
  const { name: userName, cycleLength, menstruationLength, menstruationStartDate } = useAppSelector(selectUser);
  const displayedName = isCalendarActivated ? userName : EMPTY_STRING;
  const markedDates = useMemo(
    () => getMarkedDates(cycleLength, menstruationLength, menstruationStartDate, monthOffset),
    [cycleLength, menstruationLength, menstruationStartDate, monthOffset],
  );

  const handleOnPreviousPress = useCallback((calendarMethod: () => void) => {
    calendarMethod();
    setMonthOffset(currentMonth => currentMonth - 1);
  }, []);

  const handleOnNextPress = useCallback((calendarMethod: () => void) => {
    calendarMethod();
    setMonthOffset(currentMonth => currentMonth + 1);
  }, []);

  const handleOnCalendarTitlePress = useCallback(() => {
    setMonthOffset(0);
  }, []);

  useEffect(() => {
    if (!isCalendarActivated) {
      setTimeout(() => navigate(CALENDAR_ONBOARDING), NAVIGATION_DELAY);
    }
  }, [isCalendarActivated, navigate]);

  return (
    <Container
      style={inlineStyles.container}
      contentContainerStyle={inlineStyles.content}
      showsVerticalScrollIndicator={false}>
      <Content>
        <UserGreeting name={displayedName} description={GreetingData.description} />
        <Reminders />
        <StyledPinkFlagCalendar
          isDisabled={!isCalendarActivated}
          markedDates={markedDates}
          onPressArrowLeft={handleOnPreviousPress}
          onPressArrowRight={handleOnNextPress}
          onCalendarTitlePress={handleOnCalendarTitlePress}
        />
        <ExplanationWrapper>
          <CalendarExplanation />
        </ExplanationWrapper>
      </Content>
      <Footer />
    </Container>
  );
};
