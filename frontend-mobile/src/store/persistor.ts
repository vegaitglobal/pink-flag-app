import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootApi } from '@pf/services';
import { rootReducer } from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [rootApi.reducerPath],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
