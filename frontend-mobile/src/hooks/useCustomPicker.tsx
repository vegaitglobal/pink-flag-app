/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { CustomPicker, PickerOption } from '@pf/components';
import { Picker } from '@react-native-picker/picker';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const FIRST_ELEMENT = 0;

interface Params {
  options: PickerOption<any>[];
  initialValueIndex?: number;
  onSelect?: (selectedOption: PickerOption<any>) => void;
  onSubmit?: (selectedOption: PickerOption<any>) => void;
  onReject?: () => void;
  modalTitle?: string;
}

type ReturnType = {
  selectedFilter: PickerOption<unknown>;
  CustomPickerComponent: EmotionJSX.Element;
  togglePickerModal: () => void;
};

export const useCustomPicker = ({
  options,
  initialValueIndex,
  onSelect,
  modalTitle,
  onSubmit,
  onReject,
}: Params): ReturnType => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const androidPickerRef = useRef<Picker<any>>(null);
  const initialIndex = useMemo(() => initialValueIndex || FIRST_ELEMENT, [initialValueIndex]);
  const [selectedFilter, setSelectedFilter] = useState<PickerOption<any>>(options[initialIndex]);

  const togglePickerModal = useCallback(() => {
    setIsPickerVisible(prevState => !prevState);
  }, []);

  const handleOnSelect = useCallback(
    (itemIndex: number) => {
      const selectedOption = options[itemIndex];
      setSelectedFilter(selectedOption);

      onSelect?.(selectedOption);
    },
    [onSelect, options],
  );

  const handleOnSubmit = useCallback(
    (itemIndex: number) => {
      const selectedOption = options[itemIndex || initialIndex];
      onSubmit?.(selectedOption);
    },
    [initialIndex, onSubmit, options],
  );

  const handleOnReject = useCallback(() => {
    setSelectedFilter(options[initialIndex]);
    onReject?.();
  }, [initialIndex, onReject, options]);

  const CustomPickerComponent = (
    <CustomPicker
      modalTitle={modalTitle}
      selectedValue={selectedFilter.value}
      initialValueIndex={initialIndex}
      onSelect={handleOnSelect}
      options={options}
      isVisible={isPickerVisible}
      hide={togglePickerModal}
      onSubmit={handleOnSubmit}
      onReject={handleOnReject}
      ref={androidPickerRef}
    />
  );

  return {
    selectedFilter,
    CustomPickerComponent,
    togglePickerModal,
  };
};
