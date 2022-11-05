import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import ServiceScreen from '~screens/Service/ServiceScreen';
import PaymentScreen from '~screens/Service/PaymentScreen';
import InitNavigator from '~navigation/InitNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* <RootNavigator /> */}
        <InitNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

