/* eslint-disable @typescript-eslint/no-floating-promises */
import { useAppDispatch } from '@pf/hooks';
import { setCalendarActivation } from '@pf/reducers/settingsReducer';
import {
  setBirthday,
  setCycleLength,
  setMenstruationStartDate,
  setMenstruationLength,
  setUserName,
} from '@pf/reducers/userReducer';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { ScrollIndicator } from './components';
import {
  NameInputScreen,
  OverviewScreen,
  BirthdayInputScreen,
  PeriodInputScreen,
  CalendarInputScreen,
} from './screens';
import { Container, StyledPagerView, IndicatorContainer, Footer, StyledPrimaryButton } from './styles';
import notifee from '@notifee/react-native';
import {
  BIRTHDAY_INPUT_INDEX,
  ButtonContents,
  CALENDAR_INPUT_INDEX,
  FINISHED,
  NAME_INPUT_INDEX,
  PAGE_MARGIN,
  PERIOD_INPUT_INDEX,
  SLIDE_COUNT,
} from './constants';

export const OnboardingScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation();
  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [buttonStates, setButtonStates] = useState([false, true, true, true, true]);
  const notFirstPage = currentPage !== 0;

  const nameInput = useRef<string | undefined>('');
  const birthdayInput = useRef<string | undefined>('');
  const periodInput = useRef<string | undefined>('');
  const calendarInput = useRef<string | undefined>('');

  const handleOnButtonPress = useCallback((): void => {
    if (currentPage === NAME_INPUT_INDEX && nameInput.current) {
      dispatch(setUserName(nameInput.current));
    }

    if (currentPage === BIRTHDAY_INPUT_INDEX && birthdayInput.current) {
      dispatch(setBirthday(birthdayInput.current));
    }

    if (currentPage === PERIOD_INPUT_INDEX && periodInput.current) {
      //! Received value: MenstruationLength-5;CycleLength-2
      const inputValue = periodInput.current;
      const menstruationLength = +inputValue?.split(';')[0].split('-')[1];
      const cycleLength = +inputValue?.split(';')[1].split('-')[1];

      dispatch(setMenstruationLength(menstruationLength));
      dispatch(setCycleLength(cycleLength));
    }

    if (currentPage === CALENDAR_INPUT_INDEX && calendarInput.current) {
      dispatch(setMenstruationStartDate(calendarInput.current));
      dispatch(setCalendarActivation(FINISHED));
      goBack();
      notifee.requestPermission();
      return;
    }

    const nextPage = currentPage + 1;
    pagerViewRef.current?.setPage(nextPage);
    setCurrentPage(nextPage);
  }, [currentPage, dispatch, goBack]);

  const onInputChange = useCallback(
    (isValid: boolean, value?: string) => {
      const newStates = [...buttonStates];
      newStates[currentPage] = !isValid;
      setButtonStates(newStates);

      if (currentPage === NAME_INPUT_INDEX) {
        nameInput.current = value;
      }

      if (currentPage === BIRTHDAY_INPUT_INDEX) {
        birthdayInput.current = value;
      }

      if (currentPage === PERIOD_INPUT_INDEX) {
        periodInput.current = value;
      }

      if (currentPage === CALENDAR_INPUT_INDEX) {
        calendarInput.current = value;
      }
    },
    [buttonStates, currentPage],
  );

  return (
    <Container>
      <StyledPagerView pageMargin={PAGE_MARGIN} scrollEnabled={false} ref={pagerViewRef}>
        <OverviewScreen />
        <NameInputScreen onInputChange={onInputChange} />
        <BirthdayInputScreen onInputChange={onInputChange} />
        <PeriodInputScreen onInputChange={onInputChange} currentPageIndex={currentPage} />
        <CalendarInputScreen onInputChange={onInputChange} />
      </StyledPagerView>
      <Footer>
        {notFirstPage && (
          <IndicatorContainer>
            {Array.from(Array(SLIDE_COUNT).keys()).map((key, index) => (
              <ScrollIndicator isFilled={currentPage === index + 1} key={key} />
            ))}
          </IndicatorContainer>
        )}
        <StyledPrimaryButton
          content={ButtonContents[currentPage]}
          disabled={buttonStates[currentPage]}
          onPress={handleOnButtonPress}
        />
      </Footer>
    </Container>
  );
};
