/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppDispatch, useAppSelector } from '@pf/hooks';
import { setCalendarActivation } from '@pf/reducers/settingsReducer';
import { selectUser, setMenstruationStartDate, updateUser } from '@pf/reducers/userReducer';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import notifee from '@notifee/react-native';
import { AuthenticatedUser } from '@pf/constants';
import { useCreateUserMutation } from '@pf/services';

const FINISHED = true;

export const useFinishOnboarding = (authenticatedUser?: AuthenticatedUser) => {
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation();
  const [createUser] = useCreateUserMutation();
  const { birthday, cycleLength, menstruationLength } = useAppSelector(selectUser);

  const handleAuthenticatedUserLogin = useCallback(
    async (menstruationStartDate?: string) => {
      const { id, name, email, photo } = authenticatedUser || {};
      if (!id || !email || !name || !cycleLength || !menstruationLength || !birthday || !menstruationStartDate) {
        return;
      }

      await createUser({
        userId: id,
        google_id: id,
        name,
        email,
        cycle_length: cycleLength,
        date_of_birth: birthday,
        menstruation_length: menstruationLength,
        menstruation_start_date: menstruationStartDate,
      });
      dispatch(updateUser({ id, photo, email }));
    },
    [authenticatedUser, birthday, createUser, cycleLength, dispatch, menstruationLength],
  );

  const finishOnboarding = useCallback(
    (menstruationStartDate: string) => {
      dispatch(setMenstruationStartDate(menstruationStartDate));
      dispatch(setCalendarActivation(FINISHED));
      handleAuthenticatedUserLogin(menstruationStartDate);
      goBack();
      notifee.requestPermission();
    },
    [dispatch, goBack, handleAuthenticatedUserLogin],
  );

  return { finishOnboarding };
};
