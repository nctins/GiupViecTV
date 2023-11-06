import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import InitNavigator from '~navigation/InitNavigator';
import { AuthProvider } from '~contexts/AuthContext';
import { AxiosProvider } from '~contexts/AxiosContext';
import { SocketProvider } from '~contexts/SocketContext';
import SafeViewProvider from '~contexts/SafeViewProvider';
import { NotifcationProvider } from '~contexts/NotificationContext';

export default function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <AxiosProvider>
          <SocketProvider>
            <NotifcationProvider>
              <SafeViewProvider>
                <NavigationContainer>
                  <InitNavigator />
                </NavigationContainer>
              </SafeViewProvider>
            </NotifcationProvider>
          </SocketProvider>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

