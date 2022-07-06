import React, { createContext } from "react";
import * as colors from "~constants/colors";
import * as typography from "~constants/typography";

const ThemeContext = createContext(null);
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {
  const theme = {
    colors,
    typography,
  };
  return <Provider value={theme}>{children}</Provider>;
};

export { ThemeContext, ThemeProvider };
