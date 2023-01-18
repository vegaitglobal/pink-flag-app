import { DatePickerModal } from '@pf/components';
import React, { useCallback, useRef, useState } from 'react';
import { Subtitle } from '../../styles';
import { getInitialValue } from './getInitialValue';
import { Container, InputContainer, Spacing, StyledSettingsInput, Wrapper, YearWrapper } from './styles';

const SEPARATOR = '-';

interface Props {
  value?: string;
  onChange?: (birthday: string) => void;
}

export const BirthdayInput: React.FC<Props> = ({ value, onChange }) => {
  const dateFromValue = new Date(value as string);
  const [date, setDate] = useState(dateFromValue);
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
    const newValue = [displayDate.current.year, displayDate.current.month, displayDate.current.day].join(SEPARATOR);
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
      <Subtitle content="Kada si rođena?" />
      <InputContainer>
        <Wrapper onPress={toggleDatePicker}>
          <StyledSettingsInput
            placeholder="Dan"
            value={displayDate.current.day}
            pointerEvents="none"
            editable={false}
          />
        </Wrapper>
        <Spacing />
        <Wrapper onPress={toggleDatePicker}>
          <StyledSettingsInput
            placeholder="Mesec"
            value={displayDate.current.month}
            pointerEvents="none"
            editable={false}
          />
        </Wrapper>
        <Spacing />
        <YearWrapper onPress={toggleDatePicker}>
          <StyledSettingsInput
            placeholder="Godina"
            value={displayDate.current.year}
            pointerEvents="none"
            editable={false}
          />
        </YearWrapper>
      </InputContainer>
      <DatePickerModal
        date={date}
        isVisible={isDatePickerVisible}
        hide={toggleDatePicker}
        onDateChange={handleOnDateChange}
        onPressCancel={handleDateCancellation}
        onPressConfirm={handleDateConfirmation}
      />
    </Container>
  );
};
