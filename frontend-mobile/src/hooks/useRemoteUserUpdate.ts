import { EMPTY_STRING, UserState } from '@pf/constants';
import { useAppSelector } from '@pf/hooks';
import { selectUser } from '@pf/reducers/userReducer';
import { useUpdateUserMutation } from '@pf/services';
import { useCallback } from 'react';

const CYCLE_FALLBACK = 28;
const MENSTRUATION_FALLBACK = 5;

export const useRemoteUserUpdate = () => {
  const user = useAppSelector(selectUser);
  const [updateUser] = useUpdateUserMutation();

  const updateRemoteUser = useCallback(
    async (changes: UserState) => {
      const { id: userId, email } = user;
      if (!userId || !email) {
        return;
      }

      const diff = getChangeDifference(user, changes);

      await updateUser({
        userId,
        email,
        google_id: userId,
        name: diff.name || EMPTY_STRING,
        cycle_length: diff.cycleLength || CYCLE_FALLBACK,
        date_of_birth: diff.birthday || EMPTY_STRING,
        menstruation_length: diff.menstruationLength || MENSTRUATION_FALLBACK,
        menstruation_start_date: diff.menstruationStartDate || EMPTY_STRING,
      });
    },
    [user, updateUser],
  );

  return updateRemoteUser;
};

export const getChangeDifference = (user: UserState, changes: UserState): UserState => {
  return {
    name: changes.name || user.name,
    birthday: changes.birthday || user.birthday,
    cycleLength: changes.cycleLength || user.cycleLength,
    menstruationLength: changes.menstruationLength || user.menstruationLength,
    menstruationStartDate: changes.menstruationStartDate || user.menstruationStartDate,
  };
};
