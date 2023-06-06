import { resetAction, UserResponse, UserState } from '@pf/constants';
import { usersApi } from '@pf/services';
import { RootState } from '@pf/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleUserUpdate } from './utils';

const initialState: UserState = {
  id: undefined,
  email: undefined,
  photo: undefined,
  name: undefined,
  birthday: undefined,
  menstruationLength: undefined,
  cycleLength: undefined,
  menstruationStartDate: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => ({ ...state, id: undefined, email: undefined, photo: undefined }),
    setUserName: (state, action: PayloadAction<string>): UserState => ({ ...state, name: action.payload }),
    setBirthday: (state, action: PayloadAction<string>): UserState => ({ ...state, birthday: action.payload }),
    setMenstruationLength: (state, action: PayloadAction<number>): UserState => ({
      ...state,
      menstruationLength: action.payload,
    }),
    setCycleLength: (state, action: PayloadAction<number>): UserState => ({
      ...state,
      cycleLength: action.payload,
    }),
    setMenstruationStartDate: (state, action: PayloadAction<string>): UserState => ({
      ...state,
      menstruationStartDate: action.payload,
    }),
    updateUser: (state, action: PayloadAction<UserState>): UserState => ({
      ...state,
      ...action.payload,
    }),
    logoutUser: (state): UserState => ({
      ...state,
      id: undefined,
      email: undefined,
      photo: undefined,
    }),
  },
  extraReducers: builder => {
    builder.addCase(resetAction, () => initialState);

    builder.addMatcher(usersApi.endpoints.getUser.matchFulfilled, (state, action: PayloadAction<UserResponse>) =>
      handleUserUpdate(state, action),
    );
  },
});

export const {
  setUserName,
  setBirthday,
  setMenstruationLength,
  setCycleLength,
  setMenstruationStartDate,
  updateUser,
  clearUser,
  logoutUser,
} = userSlice.actions;

export const selectUser = (state: RootState): UserState => state.user;
export const selectMenstruationLength = (state: RootState): number | undefined => selectUser(state).menstruationLength;
export const selectUserName = (state: RootState): string => selectUser(state).name || '';
export const selectUserCredentials = (state: RootState): { id?: string; email?: string } => {
  const { id, email } = selectUser(state);
  return {
    id,
    email,
  };
};

export default userSlice.reducer;
