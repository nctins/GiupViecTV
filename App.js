import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import { ThemeProvider } from '~contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigator/>
    </ThemeProvider>
  );
}

