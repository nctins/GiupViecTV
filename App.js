import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '~contexts/ThemeContext';
import UpdateInfoScreen from '~screens/Account/UpdateInfoScreen';
import ChangePasswordScreen from '~screens/Account/ChangePasswordScreen';
import FeedbackScreen from '~screens/Account/FeedbackScreen';
import AccountLinkScreen from '~screens/Account/AcountLinkScreen';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* <RootNavigator /> */}
        <AccountLinkScreen />
      </NavigationContainer>
    </ThemeProvider>
  );
}

