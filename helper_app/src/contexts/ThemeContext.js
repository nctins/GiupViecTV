import React, { createContext } from "react";
import * as colors from "~constants/colors";
import * as typography from "~constants/typography";

const ThemeContext = createContext(null);
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {
  const theme = {
    colors,
    typography,
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 8,
    },
  };
  return <Provider value={theme}>{children}</Provider>;
};

export { ThemeContext, ThemeProvider };
