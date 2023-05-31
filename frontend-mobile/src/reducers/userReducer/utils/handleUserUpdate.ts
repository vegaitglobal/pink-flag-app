import { UserResponse, UserState } from '@pf/constants';
import { PayloadAction } from '@reduxjs/toolkit';

export const handleUserUpdate = (state: UserState, { payload }: PayloadAction<UserResponse>): void => {
  const { name, email, cycle_length, date_of_birth, menstruation_length, menstruation_start_date } = payload;

  state.name = name;
  state.email = email;
  state.cycleLength = cycle_length;
  state.birthday = date_of_birth;
  state.menstruationLength = menstruation_length;
  state.menstruationStartDate = menstruation_start_date;
};
