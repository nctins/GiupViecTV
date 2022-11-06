import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import { AuthProvider } from '~contexts/AuthContext';
import { AxiosProvider } from '~contexts/AxiosContext';
import LoginScreen from '~screens/LoginScreen';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AxiosProvider>
          <NavigationContainer>
            {/* <RootNavigator /> */}
            <LoginScreen/>
          </NavigationContainer>
        </AxiosProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

