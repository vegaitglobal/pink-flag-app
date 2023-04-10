import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '@pf/navigation';
import { ThemeProvider } from '@emotion/react';
import { AppTheme } from '@pf/theme';
import { Provider } from 'react-redux';
import { persistor, store } from '@pf/store';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { usePushNotificationsListener } from './hooks';

const App: React.FC = () => {
  usePushNotificationsListener();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={AppTheme}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
