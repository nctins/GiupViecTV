import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import CartDetail from '~screens/CartDetail';
import CouponDetail from '~screens/CouponDetail';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

