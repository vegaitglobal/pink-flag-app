/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useLazyGetUserQuery } from '@pf/services';
import { useCallback } from 'react';
import { useAppDispatch } from './useRedux';
import { logoutUser, updateUser } from '@pf/reducers/userReducer';
import { setCalendarActivation } from '@pf/reducers/settingsReducer';

const USER_FOUND = true;
const USER_NOT_FOUND = false;

export const useUserDataAlignment = () => {
  const dispatch = useAppDispatch();
  const [getUser] = useLazyGetUserQuery();

  const syncWithRemoteUser = useCallback(
    async (userId?: string, email?: string, photo?: string) => {
      if (!userId || !email) {
        return USER_NOT_FOUND;
      }

      try {
        await getUser({ userId, email }).unwrap();
        const updateParams = photo ? { id: userId, photo } : { id: userId };
        dispatch(updateUser(updateParams));
        dispatch(setCalendarActivation(true));
        return USER_FOUND;
      } catch (_) {
        dispatch(logoutUser());
        return USER_NOT_FOUND;
      }
    },
    [dispatch, getUser],
  );

  return { syncWithRemoteUser };
};
