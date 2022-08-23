import React from 'react';
import RootNavigator from '~navigation/RootNavigator';

import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from '~contexts/ThemeContext';
import MessageDetail from '~screens/Message/MessageDetail';
import HomeScreen from '~screens/HomeScreen';
import CouponDetail from '~screens/CouponDetail';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <CouponDetail />
      </NavigationContainer>
    </ThemeProvider>
  );
}

