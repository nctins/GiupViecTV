import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import { AuthProvider } from '~contexts/AuthContext';
import { AxiosProvider } from '~contexts/AxiosContext';
import { SocketProvider } from '~contexts/SocketContext';
import InitNavigator from '~navigation/InitNavigator';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AxiosProvider>
          <SocketProvider>
            <NavigationContainer>
              <InitNavigator />
            </NavigationContainer>
          </SocketProvider>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

