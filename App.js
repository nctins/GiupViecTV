import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import InitNavigator from '~navigation/InitNavigator';
import { AuthProvider } from '~contexts/AuthContext';
import { AxiosProvider } from '~contexts/AxiosContext';
import { SocketProvider } from '~contexts/SocketContext';
import GoogleMap from '~screens/GoogleMapScreen';
import TestAddress from '~screens/TestAddress';
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
            <NavigationContainer>
              <InitNavigator />
            </NavigationContainer>
          </SocketProvider>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

