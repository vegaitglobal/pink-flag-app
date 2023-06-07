import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { AppTheme } from '@pf/theme';
import { Provider } from 'react-redux';
import { persistor, store } from '@pf/store';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from '@pf/navigation';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={AppTheme}>
            <Navigation />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
