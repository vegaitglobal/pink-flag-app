import { CustomInput, PickerOption } from '@pf/components';
import { EMPTY_STRING } from '@pf/constants';
import { useCustomPicker } from '@pf/hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { SvgBackground } from '../../components';
import { cycleOptions, CYCLE_DEFAULT, periodOptions, PERIOD_DEFAULT, SCROLL_TIMEOUT, THIS_PAGE } from './constants';
import { Container, StyledTitle, StyledDescription, styles, Separator, ButtonWrapper } from './styles';

interface Props {
  onInputChange: (isValid: boolean, value?: string) => void;
  currentPageIndex: number;
}

export const PeriodInputScreen: React.FC<Props> = ({ onInputChange, currentPageIndex }) => {
  const cycleLength = useRef(EMPTY_STRING);
  const menstruationLength = useRef(EMPTY_STRING);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (currentPageIndex === THIS_PAGE) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd(), SCROLL_TIMEOUT);
    }
  }, [currentPageIndex]);

  const handleSelection = useCallback(() => {
    if (cycleLength.current && menstruationLength.current) {
      const isValid = true;
      const value = `MenstruationLength-${menstruationLength.current};CycleLength-${cycleLength.current}`;
      onInputChange(isValid, value);
      return;
    }

    const isValid = false;
    onInputChange(isValid);
  }, [onInputChange]);

  const onPeriodLengthSubmit = useCallback(
    (selectedValue: PickerOption<number>): void => {
      menstruationLength.current = selectedValue.label;
      handleSelection();
    },
    [handleSelection],
  );

  const onPeriodLengthReject = useCallback((): void => {
    menstruationLength.current = EMPTY_STRING;
    handleSelection();
  }, [handleSelection]);

  const onCycleLengthSubmit = useCallback(
    (selectedValue: PickerOption<number>): void => {
      cycleLength.current = selectedValue.label;
      handleSelection();
    },
    [handleSelection],
  );

  const onCycleLengthReject = useCallback((): void => {
    cycleLength.current = EMPTY_STRING;
    handleSelection();
  }, [handleSelection]);

  const { CustomPickerComponent: PeriodPicker, togglePickerModal: togglePeriodPicker } = useCustomPicker({
    options: periodOptions,
    initialValueIndex: PERIOD_DEFAULT,
    onSubmit: onPeriodLengthSubmit,
    onReject: onPeriodLengthReject,
    modalTitle: 'Izaberi dužinu menstruacije',
  });

  const { CustomPickerComponent: CyclePicker, togglePickerModal: toggleCyclePicker } = useCustomPicker({
    options: cycleOptions,
    initialValueIndex: CYCLE_DEFAULT,
    onSubmit: onCycleLengthSubmit,
    onReject: onCycleLengthReject,
    modalTitle: 'Izaberi dužinu ciklusa',
  });

  return (
    <Container contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
      <SvgBackground />
      <StyledDescription content="Kako bi kalendar bio što precizniji neophodno je da uneseš sledeće podatke:" />
      <StyledTitle content="Dužina menstruacije" />
      <ButtonWrapper onPress={togglePeriodPicker}>
        <CustomInput placeholder="U danima" value={menstruationLength.current} pointerEvents="none" editable={false} />
      </ButtonWrapper>
      <Separator />
      <StyledTitle content="Dužina ciklusa" />
      <ButtonWrapper onPress={toggleCyclePicker}>
        <CustomInput placeholder="U danima" value={cycleLength.current} pointerEvents="none" editable={false} />
      </ButtonWrapper>
      {PeriodPicker}
      {CyclePicker}
    </Container>
  );
};
