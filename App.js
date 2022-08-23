import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import LoginScreen from '~screens/LoginScreen';

export default function App() {
  return (
    <ThemeProvider>
      {/* <NavigationContainer> */}
        {/* <RootNavigator /> */}
        <LoginScreen/>
      {/* </NavigationContainer> */}
    </ThemeProvider>
  );
}

