import { resetAction } from '@pf/constants';
import { RootState } from '@pf/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  calendarActivated: boolean;
  calendarNotificationsEnabled: boolean;
  blogNotificationsEnabled: boolean;
}

const initialState: SettingsState = {
  calendarActivated: false,
  calendarNotificationsEnabled: true,
  blogNotificationsEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCalendarActivation: (state, action: PayloadAction<boolean>): SettingsState => ({
      ...state,
      calendarActivated: action.payload,
    }),
    setCalendarNotificationState: (state, action: PayloadAction<boolean>): SettingsState => ({
      ...state,
      calendarNotificationsEnabled: action.payload,
    }),
    setBlogNotificationState: (state, action: PayloadAction<boolean>): SettingsState => ({
      ...state,
      blogNotificationsEnabled: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(resetAction, () => initialState);
  },
});

export const { setCalendarActivation, setCalendarNotificationState, setBlogNotificationState } = settingsSlice.actions;

export const selectSettings = (state: RootState): SettingsState => state.settings;

export const selectIsCalendarActivated = (state: RootState): boolean | undefined =>
  selectSettings(state).calendarActivated;

export const selectAreCalendarNotificationsEnabled = (state: RootState): boolean | undefined =>
  selectSettings(state).calendarNotificationsEnabled;

export const selectAreBlogNotificationsEnabled = (state: RootState): boolean | undefined =>
  selectSettings(state).blogNotificationsEnabled;

export default settingsSlice.reducer;
