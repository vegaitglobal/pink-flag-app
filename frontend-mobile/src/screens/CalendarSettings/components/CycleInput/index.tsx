import { PickerOption } from '@pf/components';
import { EMPTY_STRING } from '@pf/constants';
import { useCustomPicker } from '@pf/hooks';
import React, { useCallback, useRef } from 'react';
import { Subtitle } from '../../styles';
import { SettingsInput } from '../SettingsInput';
import { cycleOptions, CYCLE_DEFAULT } from './constants';
import { getValueIndex } from './getValueIndex';
import { Container, Wrapper } from './styles';

interface Props {
  value?: string;
  onChange?: (cycleLength: number) => void;
}

export const CycleInput: React.FC<Props> = ({ value, onChange }) => {
  const cycleLength = useRef(value || EMPTY_STRING);
  const initialOption = getValueIndex(cycleLength.current, cycleOptions, CYCLE_DEFAULT);

  const onCycleLengthSubmit = useCallback(
    (selectedValue: PickerOption<number>): void => {
      cycleLength.current = selectedValue.label;
      onChange?.(selectedValue.value);
    },
    [onChange],
  );

  const { CustomPickerComponent: CyclePicker, togglePickerModal: toggleCyclePicker } = useCustomPicker({
    options: cycleOptions,
    initialValueIndex: initialOption,
    onSubmit: onCycleLengthSubmit,
    modalTitle: 'Izaberi dužinu ciklusa',
  });

  return (
    <Container>
      <Subtitle content="Poslednja dužina ciklusa u danima?" />
      <Wrapper onPress={toggleCyclePicker}>
        <SettingsInput placeholder="U danima" value={cycleLength.current} pointerEvents="none" editable={false} />
      </Wrapper>
      {CyclePicker}
    </Container>
  );
};
