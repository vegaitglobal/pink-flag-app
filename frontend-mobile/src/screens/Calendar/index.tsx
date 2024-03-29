import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarExplanation, Footer, UserGreeting } from '@pf/components';
import { Container, Content, ExplanationWrapper, getStyles, StyledPinkFlagCalendar } from './styles';
import GreetingData from '../../assets/data/greeting.json';
import { useTheme } from '@emotion/react';
import { CalendarNavigatorScreenProps, CalendarRoutes, EMPTY_STRING, RootRoutes } from '@pf/constants';
import { useAppSelector } from '@pf/hooks';
import { selectUser } from '@pf/reducers/userReducer';
import { selectIsCalendarActivated } from '@pf/reducers/settingsReducer';
import { getMarkedDates } from './utils';
import { addMonths, subMonths } from 'date-fns';
import { useLastMenstruationDateUpdate } from './hooks';
import { Reminders } from './components';
import { ScrollView } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

const NAVIGATION_DELAY = 500;
const INITIAL_DATE = new Date();
const { CALENDAR } = CalendarRoutes;
const { CALENDAR_ONBOARDING } = RootRoutes;
const CALENDAR_POSITION = 129;
const SCROLL_TO_DELAY = 300;
type Props = CalendarNavigatorScreenProps<typeof CALENDAR>;

export const CalendarScreen: React.FC<Props> = ({ navigation: { navigate }, route }) => {
  const theme = useTheme();
  const { isOpenedFromNotification } = route.params || {};
  const [currentDate, setCurrentDate] = useState(INITIAL_DATE);
  const inlineStyles = useMemo(() => getStyles(theme), [theme]);
  const isCalendarActivated = useAppSelector(selectIsCalendarActivated);
  const { name: userName, cycleLength, menstruationLength, menstruationStartDate } = useAppSelector(selectUser);
  const displayedName = isCalendarActivated ? userName : EMPTY_STRING;
  const markedDates = useMemo(
    () => getMarkedDates(currentDate, cycleLength, menstruationLength, menstruationStartDate),
    [cycleLength, menstruationLength, menstruationStartDate, currentDate],
  );
  const listRef = useRef<ScrollView>(null);

  useLastMenstruationDateUpdate(menstruationStartDate, cycleLength);

  const handleOnPreviousPress = useCallback((calendarMethod: () => void) => {
    calendarMethod();
    setCurrentDate(currentMonth => subMonths(currentMonth, 1));
  }, []);

  const handleOnNextPress = useCallback((calendarMethod: () => void) => {
    calendarMethod();
    setCurrentDate(currentMonth => addMonths(currentMonth, 1));
  }, []);

  const handleOnCalendarTitlePress = useCallback(() => {
    setCurrentDate(INITIAL_DATE);
  }, []);

  useEffect(() => {
    if (!isCalendarActivated) {
      setTimeout(() => navigate(CALENDAR_ONBOARDING), NAVIGATION_DELAY);
    }
  }, [isCalendarActivated, navigate]);

  useEffect(() => {
    if (isOpenedFromNotification) {
      setTimeout(() => listRef?.current?.scrollTo({ y: CALENDAR_POSITION }), SCROLL_TO_DELAY);
    }
  }, [isOpenedFromNotification]);

  return (
    <Container
      ref={listRef}
      style={inlineStyles.container}
      contentContainerStyle={inlineStyles.content}
      showsVerticalScrollIndicator={false}>
      <Content>
        <UserGreeting name={displayedName} description={GreetingData.description} />
        <Reminders
          cycleLength={cycleLength}
          menstruationLength={menstruationLength}
          menstruationStartDate={menstruationStartDate}
        />
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
