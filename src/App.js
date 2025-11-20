import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { store } from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import { loadUserFromStorage } from './redux/authSlice';
import { loadThemeFromStorage } from './redux/themeSlice';

function AppContent() {
  useEffect(() => {
    // Load user and theme from AsyncStorage on app startup
    store.dispatch(loadUserFromStorage());
    store.dispatch(loadThemeFromStorage());
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#11788C" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
