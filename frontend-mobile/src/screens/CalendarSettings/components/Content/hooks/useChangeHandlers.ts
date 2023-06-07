import { UserState } from '@pf/constants';
import { useAppSelector } from '@pf/hooks';
import { selectAreCalendarNotificationsEnabled } from '@pf/reducers/settingsReducer';
import { selectUser } from '@pf/reducers/userReducer';
import { useCallback, useRef, useState } from 'react';

type Changes = UserState & { switchState?: boolean };
type ChangesKeys = keyof Changes;
type PossibleValue = string | number | boolean;
const selectOnce = () => true;

type ReturnType = {
  changes: Changes;
  handleNameChange: (text: string) => void;
  handleBirthdayChange: (birthday: string) => void;
  handleMenstruationLengthChange: (menstruationLength: number) => void;
  handleCycleLengthChange: (cycleLength: number) => void;
  handleOnNotificationsChange: (switchValue: boolean) => void;
  handleMenstruationStartChange: (menstruationStart: string) => void;
};

export const useChangeHandlers = (): ReturnType => {
  const changes = useRef<Changes>({});
  const [, triggerRefresh] = useState(false);
  const user = useAppSelector(selectUser, selectOnce);
  const areNotificationsEnabled = useAppSelector(selectAreCalendarNotificationsEnabled, selectOnce);

  const handleChange = useCallback((property: ChangesKeys, newValue: PossibleValue, oldValue?: PossibleValue) => {
    if (newValue === oldValue) {
      delete changes.current[property];
      triggerRefresh(prevState => !prevState);
      return;
    }

    (changes.current[property] as PossibleValue | undefined) = newValue;
    triggerRefresh(prevState => !prevState);
  }, []);

  const handleNameChange = useCallback(
    (name: string) => {
      handleChange('name', name, user.name);
    },
    [handleChange, user.name],
  );

  //! Format: `2013-01-18`
  const handleBirthdayChange = useCallback(
    (birthday: string) => {
      handleChange('birthday', birthday, user.birthday);
    },
    [handleChange, user.birthday],
  );

  const handleMenstruationStartChange = useCallback(
    (menstruationStart: string) => {
      handleChange('menstruationStartDate', menstruationStart, user.menstruationStartDate);
    },
    [handleChange, user.menstruationStartDate],
  );

  const handleMenstruationLengthChange = useCallback(
    (menstruationLength: number) => {
      handleChange('menstruationLength', menstruationLength, user.menstruationLength);
    },
    [handleChange, user.menstruationLength],
  );

  const handleCycleLengthChange = useCallback(
    (cycleLength: number) => {
      handleChange('cycleLength', cycleLength, user.cycleLength);
    },
    [handleChange, user.cycleLength],
  );

  const handleOnNotificationsChange = useCallback(
    (switchValue: boolean) => {
      handleChange('switchState', switchValue, areNotificationsEnabled);
    },
    [areNotificationsEnabled, handleChange],
  );

  return {
    changes: changes.current,
    handleNameChange,
    handleBirthdayChange,
    handleMenstruationLengthChange,
    handleCycleLengthChange,
    handleOnNotificationsChange,
    handleMenstruationStartChange,
  };
};
