import React from 'react';
import { BottomModal } from '../BottomModal';
import { PickerContainer, StyledDatePicker, StyledPrimaryButton } from './styles';
import { LOCALE, MAX_DATE, MIN_DATE } from './constants';
import { TransparentButton } from '../TransparentButton';

interface Props {
  date: Date;
  isVisible: boolean;
  hide: () => void;
  onPressConfirm: () => void;
  onPressCancel: () => void;
  onDateChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePickerModal: React.FC<Props> = ({
  date,
  isVisible,
  hide,
  onPressCancel,
  onPressConfirm,
  onDateChange,
  minDate,
  maxDate,
}) => {
  return (
    <BottomModal headerTitle="Izaberi datum" isVisible={isVisible} hide={hide}>
      <PickerContainer>
        <StyledDatePicker
          title={null}
          androidVariant="nativeAndroid"
          mode="date"
          locale={LOCALE}
          minimumDate={minDate || MIN_DATE}
          maximumDate={maxDate || MAX_DATE}
          date={date}
          onDateChange={onDateChange}
        />
        <StyledPrimaryButton content="Potvrdi" onPress={onPressConfirm} />
        <TransparentButton content="Odustani" onPress={onPressCancel} />
      </PickerContainer>
    </BottomModal>
  );
};
