/* eslint-disable @typescript-eslint/no-unused-vars */
import { CalendarMarkerStyles, PinkFlagCalendar } from '@pf/components';
import { ValueOf } from '@pf/constants';
import { useAppSelector } from '@pf/hooks';
import { selectMenstruationLength } from '@pf/reducers/userReducer';
import React, { useCallback, useRef, useState } from 'react';
import { DateData } from 'react-native-calendars';
import { Container, StyledTitle, Wrapper } from './styles';

const NOW = new Date().toString();
const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

interface Props {
  onInputChange: (isValid: boolean, value?: string) => void;
}

export const CalendarInputScreen: React.FC<Props> = ({ onInputChange }) => {
  const markedDates = useRef<{ [key: string]: ValueOf<typeof CalendarMarkerStyles> }>({});
  const menstruationLength = useAppSelector(selectMenstruationLength);

  const checkCalendarValidity = useCallback(() => {
    if (isEmptyObject(markedDates.current)) {
      const isValid = false;
      onInputChange(isValid);
      return;
    }

    const selectedDates = Object.keys(markedDates.current).sort();
    const firstDate = selectedDates[0];

    const isValid = true;
    onInputChange(isValid, firstDate);
  }, [markedDates, onInputChange]);

  const handleOnDayPress = useCallback(
    (date: DateData) => {
      const hasSelectedDate = Object.prototype.hasOwnProperty.call(markedDates.current, date.dateString);
      if (hasSelectedDate) {
        const { [date.dateString]: _, ...rest } = markedDates.current;
        markedDates.current = rest;
        checkCalendarValidity();
        return;
      }

      const markedDatesAmount = Object.keys(markedDates.current).length + 1;
      if (menstruationLength !== undefined && markedDatesAmount > menstruationLength) {
        return;
      }

      markedDates.current = {
        ...markedDates.current,
        [date.dateString]: CalendarMarkerStyles['MenstruationMarker'],
      };
      checkCalendarValidity();
    },
    [checkCalendarValidity, menstruationLength],
  );

  return (
    <Container>
      <StyledTitle content="Označi dane kada si poslednji put imala menstruaciju" />
      <Wrapper>
        <PinkFlagCalendar markedDates={markedDates.current} maxDate={NOW} onDayPress={handleOnDayPress} />
      </Wrapper>
    </Container>
  );
};
