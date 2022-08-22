import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import StartScreen from '~screens/StartScreen';

export default function App() {
  return (
    <ThemeProvider>
      {/* <NavigationContainer> */}
        {/* <RootNavigator /> */}
        <StartScreen/>
      {/* </NavigationContainer> */}
    </ThemeProvider>
  );
}

