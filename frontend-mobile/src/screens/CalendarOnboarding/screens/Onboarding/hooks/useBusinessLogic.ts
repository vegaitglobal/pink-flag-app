/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppDispatch } from '@pf/hooks';
import { setBirthday, setCycleLength, setMenstruationLength, setUserName } from '@pf/reducers/userReducer';
import { useCallback, useEffect, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { BIRTHDAY_INPUT_INDEX, CALENDAR_INPUT_INDEX, NAME_INPUT_INDEX, PERIOD_INPUT_INDEX } from '../constants';
import { useFinishOnboarding } from './useFinishOnboarding';
import { AuthenticatedUser } from '@pf/constants';

export const useBusinessLogic = (authenticatedUser?: AuthenticatedUser) => {
  const dispatch = useAppDispatch();
  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [buttonStates, setButtonStates] = useState([false, true, true, true, true]);
  const notFirstPage = currentPage !== 0;
  const { finishOnboarding } = useFinishOnboarding(authenticatedUser);

  const nameInput = useRef<string | undefined>('');
  const birthdayInput = useRef<string | undefined>('');
  const periodInput = useRef<string | undefined>('');
  const calendarInput = useRef<string | undefined>('');

  useEffect(() => {
    if (authenticatedUser?.name) {
      const VALIDATE_NAME = false;
      nameInput.current = authenticatedUser?.name;
      setButtonStates([false, VALIDATE_NAME, true, true, true]);
    }
  }, [authenticatedUser?.name]);

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
      finishOnboarding(calendarInput.current);
      return;
    }

    const nextPage = currentPage + 1;
    pagerViewRef.current?.setPage(nextPage);
    setCurrentPage(nextPage);
  }, [currentPage, dispatch, finishOnboarding]);

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

  return { onInputChange, notFirstPage, currentPage, buttonStates, handleOnButtonPress, pagerViewRef };
};
