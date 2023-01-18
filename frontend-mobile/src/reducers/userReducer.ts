import { resetAction, UserState } from '@pf/constants';
import { RootState } from '@pf/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  name: undefined,
  birthday: undefined,
  menstruationLength: undefined,
  cycleLength: undefined,
  lastMenstruationDate: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
    setLastMenstruationDate: (state, action: PayloadAction<string>): UserState => ({
      ...state,
      lastMenstruationDate: action.payload,
    }),
    updateUser: (state, action: PayloadAction<UserState>): UserState => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(resetAction, () => initialState);
  },
});

export const { setUserName, setBirthday, setMenstruationLength, setCycleLength, setLastMenstruationDate, updateUser } =
  userSlice.actions;

export const selectUser = (state: RootState): UserState => state.user;

export const selectUserName = (state: RootState): string | undefined => selectUser(state).name;

export default userSlice.reducer;
