import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "~contexts/ThemeContext";
import { AuthProvider } from "~contexts/AuthContext";
import { AxiosProvider } from "~contexts/AxiosContext";
import { SocketProvider } from "~contexts/SocketContext";
import InitNavigator from "~navigation/InitNavigator";
import SafeViewProvider from "~contexts/SafeViewProvider";
import { NotifcationProvider } from '~contexts/NotificationContext';

export default function App() {
  useEffect(()=>{
    // Notifications.registerForPushNotifications()
  },[])
  const responseListener = React.useRef();

  return (
    <AuthProvider>
      <ThemeProvider>
        <AxiosProvider>
          <SocketProvider>
            <SafeViewProvider>
              <NotifcationProvider>
                <NavigationContainer>
                  <InitNavigator />
                </NavigationContainer>
              </NotifcationProvider>
            </SafeViewProvider>
          </SocketProvider>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
