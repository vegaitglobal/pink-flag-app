/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppDispatch, useAppSelector } from '@pf/hooks';
import { selectUser, updateUser } from '@pf/reducers/userReducer';
import { useCreateUserMutation, useLazyGetUserQuery, useUpdateUserMutation } from '@pf/services';
import { useCallback } from 'react';

export const useSettingsLogin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [getUser, { isLoading: isUserCheckLoading }] = useLazyGetUserQuery();
  const [createUser, { isLoading: isUserCreationLoading }] = useCreateUserMutation();
  const [updateRemoteUser, { isLoading: isUserUpdateLoading }] = useUpdateUserMutation();

  const handleLoginFromSettings = useCallback(
    async (userId?: string, email?: string, photo?: string) => {
      if (!userId || !email) {
        return;
      }

      const { name, birthday, cycleLength, menstruationLength, menstruationStartDate } = user;
      if (!name || !cycleLength || !menstruationLength || !birthday || !menstruationStartDate) {
        return;
      }

      let isUserRegistered = true;
      try {
        await getUser({ userId, email }).unwrap();
      } catch (_) {
        isUserRegistered = false;
      } finally {
        const mutation = isUserRegistered ? updateRemoteUser : createUser;
        await mutation({
          name,
          email,
          google_id: userId,
          cycle_length: cycleLength,
          menstruation_length: menstruationLength,
          date_of_birth: birthday,
          menstruation_start_date: menstruationStartDate,
          userId,
        }).unwrap();
        dispatch(updateUser({ id: userId, photo, email }));
      }
    },
    [createUser, dispatch, getUser, updateRemoteUser, user],
  );

  return { handleLoginFromSettings, isLoading: isUserCheckLoading || isUserCreationLoading || isUserUpdateLoading };
};
