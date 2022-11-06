import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import InitNavigator from '~navigation/InitNavigator';
import { AuthProvider } from '~contexts/AuthContext';
import { AxiosProvider } from '~contexts/AxiosContext';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AxiosProvider>
          <NavigationContainer>
            <InitNavigator />
          </NavigationContainer>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

