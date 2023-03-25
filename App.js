import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import InitNavigator from '~navigation/InitNavigator';
import { AuthProvider } from '~contexts/AuthContext';
import { AxiosProvider } from '~contexts/AxiosContext';
import { SocketProvider } from '~contexts/SocketContext';
import GoogleMap from '~screens/GoogleMapScreen';
import SafeViewProvider from '~contexts/SafeViewProvider';
// import Notifications from '~utils/Notification';

// Notifications.setNotificationHandler();

export default function App() {
  // useEffect(()=>{
  //   Notifications.registerForPushNotifications()
  // },[])

  return (
    <AuthProvider>
      <ThemeProvider>
        <AxiosProvider>
          <SocketProvider>
            <SafeViewProvider>
              <NavigationContainer>
                <InitNavigator />
              </NavigationContainer>
            </SafeViewProvider>
          </SocketProvider>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

