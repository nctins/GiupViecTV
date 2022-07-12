import { StyleSheet } from "react-native";

const styles = (theme) =>
  StyleSheet.create({
    primary: {
      backgroundColor: theme.colors.FrostySkies,
      color: theme.colors.Gray[0],
    },
    secondary: {
      backgroundColor: theme.colors.Gray[0],
      color: theme.colors.BackgroundBlue,
    },
    lg: {
      width: 304,
      padding: 15,
    },
    md: {
      width: 250,
      padding: 15,
    },
    sm: {
      width: 200,
      padding: 15,
    },
    shadow: theme.shadow,
  });

export default styles;
