import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import ServiceScreen from '~screens/Service/ServiceScreen';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* <RootNavigator /> */}
        <ServiceScreen/>
      </NavigationContainer>
    </ThemeProvider>
  );
}

