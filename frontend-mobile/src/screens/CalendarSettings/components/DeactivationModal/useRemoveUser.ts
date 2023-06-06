/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppSelector } from '@pf/hooks';
import { selectUserCredentials } from '@pf/reducers/userReducer';
import { useDeleteUserMutation } from '@pf/services';
import { useCallback } from 'react';

export const useRemoveUser = () => {
  const { id: userId, email } = useAppSelector(selectUserCredentials);
  const [deleteUser] = useDeleteUserMutation();

  const removeRemoteUser = useCallback(async () => {
    if (!userId || !email) {
      return;
    }

    await deleteUser({ userId, email });
  }, [deleteUser, email, userId]);

  return removeRemoteUser;
};
