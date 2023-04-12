import { StyleSheet } from "react-native";

const styles = (theme) =>
  StyleSheet.create({
    primary: {
      backgroundColor: theme.colors.Azure,
      color: theme.colors.Gray[0],
    },
    secondary: {
      backgroundColor: theme.colors.Gray[0],
      color: theme.colors.BackgroundBlue,
    },
    cancel:{
      backgroundColor: theme.colors.StrawberryRed,
      color: theme.colors.Gray[0],
    },
    lg: {
      minWidth: 304,
      padding: 8,
    },
    md: {
      minWidth: 250,
      padding: 8,
    },
    sm: {
      minWidth: 175,
      padding: 5,
    },
    modalSize: {
      minWidth: 70,
      padding: 5,
    },
    modalBtn: {
      minWidth: 115,
      padding: 7,
    },
    shadow: theme.shadow,
    typography_style: {
      textAlign:"center",
      minHeight: 24,
      padding: 5,
    }
  });

export default styles;
