import { DatePickerModal } from '@pf/components';
import { add, sub } from 'date-fns';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Subtitle } from '../../styles';
import { SettingsInput } from '../SettingsInput';
import { getInitialValue } from './getInitialValue';
import { Container, Wrapper } from './styles';

interface Props {
  value?: string;
  onChange?: (birthday: string) => void;
}

export const CalendarInput: React.FC<Props> = ({ value, onChange }) => {
  const dateFromValue = useMemo(() => new Date(value as string), [value]);
  const [date, setDate] = useState(dateFromValue);
  const MIN_DATE = useMemo(() => sub(dateFromValue, { years: 2 }), [dateFromValue]);
  const MAX_DATE = useMemo(() => add(dateFromValue, { years: 2 }), [dateFromValue]);
  const displayDate = useRef(getInitialValue(value || ''));
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const toggleDatePicker = useCallback(() => {
    setIsDatePickerVisible(prevState => !prevState);
  }, []);

  const handleOnChange = useCallback(() => {
    displayDate.current = {
      year: `${date.getFullYear()}`,
      month: `${date.getMonth() + 1}`.padStart(2, '0'),
      day: `${date.getDate()}`.padStart(2, '0'),
    };
    const newValue = [displayDate.current.year, displayDate.current.month, displayDate.current.day].join('-');
    onChange?.(newValue);
  }, [date, onChange]);

  const handleDateConfirmation = useCallback(() => {
    handleOnChange();
    toggleDatePicker();
  }, [handleOnChange, toggleDatePicker]);

  const handleDateCancellation = useCallback(() => {
    toggleDatePicker();
  }, [toggleDatePicker]);

  const handleOnDateChange = useCallback((date: Date) => setDate(date), []);

  return (
    <Container>
      <Subtitle content="Poslednji početak menstruacije?" />
      <Wrapper onPress={toggleDatePicker}>
        <SettingsInput
          placeholder="Dan početka menstruacije"
          value={`${displayDate.current.day}.${displayDate.current.month}.${displayDate.current.year}`}
          pointerEvents="none"
          editable={false}
        />
      </Wrapper>
      <DatePickerModal
        date={date}
        isVisible={isDatePickerVisible}
        hide={toggleDatePicker}
        onDateChange={handleOnDateChange}
        onPressCancel={handleDateCancellation}
        onPressConfirm={handleDateConfirmation}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
      />
    </Container>
  );
};
