import { PickerOption } from '@pf/components';
import { EMPTY_STRING } from '@pf/constants';
import { useCustomPicker } from '@pf/hooks';
import React, { useCallback, useRef } from 'react';
import { Subtitle } from '../../styles';
import { SettingsInput } from '../SettingsInput';
import { periodOptions, PERIOD_DEFAULT } from './constants';
import { getValueIndex } from './getValueIndex';
import { Container, Wrapper } from './styles';

interface Props {
  value?: string;
  onChange?: (menstruationLength: number) => void;
}

export const MenstruationInput: React.FC<Props> = ({ value, onChange }) => {
  const menstruationLength = useRef(value || EMPTY_STRING);
  const initialOption = getValueIndex(menstruationLength.current, periodOptions, PERIOD_DEFAULT);

  const onPeriodLengthSubmit = useCallback(
    (selectedValue: PickerOption<number>): void => {
      menstruationLength.current = selectedValue.label;
      onChange?.(selectedValue.value);
    },
    [onChange],
  );

  const { CustomPickerComponent: PeriodPicker, togglePickerModal: togglePeriodPicker } = useCustomPicker({
    options: periodOptions,
    initialValueIndex: initialOption,
    onSubmit: onPeriodLengthSubmit,
    modalTitle: 'Izaberi dužinu menstruacije',
  });

  return (
    <Container>
      <Subtitle content="Poslednja dužina menstruacije u danima?" />
      <Wrapper onPress={togglePeriodPicker}>
        <SettingsInput
          placeholder="U danima"
          value={menstruationLength.current}
          pointerEvents="none"
          editable={false}
        />
      </Wrapper>
      {PeriodPicker}
    </Container>
  );
};
