import { UserState } from '@pf/constants';
import { MutableRefObject, useCallback, useRef } from 'react';

type ReturnType = {
  changes: UserState;
  notificationsState: MutableRefObject<boolean | undefined>;
  handleNameChange: (text: string) => void;
  handleBirthdayChange: (birthday: string) => void;
  handleMenstruationLengthChange: (menstruationLength: number) => void;
  handleCycleLengthChange: (cycleLength: number) => void;
  handleOnNotificationsChange: (switchValue: boolean) => void;
  handleMenstruationStartChange: (menstruationStart: string) => void;
};

export const useChangeHandlers = (): ReturnType => {
  const changes = useRef<UserState>({});
  const switchState = useRef<boolean | undefined>(undefined);

  const handleNameChange = useCallback((name: string) => {
    changes.current.name = name;
  }, []);

  //! Format: `2013-01-18`
  const handleBirthdayChange = useCallback((birthday: string) => {
    changes.current.birthday = birthday;
  }, []);

  const handleMenstruationStartChange = useCallback((menstruationStart: string) => {
    changes.current.menstruationStartDate = menstruationStart;
  }, []);

  const handleMenstruationLengthChange = useCallback((menstruationLength: number) => {
    changes.current.menstruationLength = menstruationLength;
  }, []);

  const handleCycleLengthChange = useCallback((cycleLength: number) => {
    changes.current.cycleLength = cycleLength;
  }, []);

  const handleOnNotificationsChange = useCallback((switchValue: boolean) => {
    switchState.current = switchValue;
  }, []);

  return {
    changes: changes.current,
    notificationsState: switchState,
    handleNameChange,
    handleBirthdayChange,
    handleMenstruationLengthChange,
    handleCycleLengthChange,
    handleOnNotificationsChange,
    handleMenstruationStartChange,
  };
};
