import userReducer from '@pf/reducers/userReducer';
import settingsReducer from '@pf/reducers/settingsReducer';
import { rootApi } from '@pf/services';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});
