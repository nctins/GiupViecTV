import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "~contexts/ThemeContext";
import { AuthProvider } from "~contexts/AuthContext";
import { AxiosProvider } from "~contexts/AxiosContext";
import { SocketProvider } from "~contexts/SocketContext";
import InitNavigator from "~navigation/InitNavigator";
// import Notifications from "~utils/Notification";

// Notifications.setNotificationHandler();

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
            {/* <NotificationProvider> */}
              <NavigationContainer>
                <InitNavigator />
              </NavigationContainer>
            {/* </NotificationProvider> */}
          </SocketProvider>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
