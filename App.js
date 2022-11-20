import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import { AuthProvider } from '~contexts/AuthContext';
import { AxiosProvider } from '~contexts/AxiosContext';
import { SocketProvider } from '~contexts/SocketContext';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AxiosProvider>
          <SocketProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </SocketProvider>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

