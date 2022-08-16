import React from 'react';
import RootNavigator from '~navigation/RootNavigator';

import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from '~contexts/ThemeContext';
import StartScreen from '~screens/StartScreen';
import MessageDetail from '~screens/Message/MessageDetail';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

