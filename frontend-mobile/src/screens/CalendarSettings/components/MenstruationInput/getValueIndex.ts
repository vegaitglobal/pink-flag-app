import { PickerOption } from '@pf/components';

export const getValueIndex = (value: string, options: PickerOption<number>[], defaultOptionIndex: number): number => {
  const index = options.findIndex(x => x.label === value);
  return index >= 0 ? index : defaultOptionIndex;
};
