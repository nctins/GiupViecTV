import { startTransition } from "react";
import { StyleSheet } from "react-native";

const styles = (theme) =>
  StyleSheet.create({
    md: {
      width: 270,
      padding: 10,
    },
    sm: {
      height: 25,
      padding: 5,
    },
    fill: {
      backgroundColor: theme.colors.Gray[0],
      borderRadius: 5,
      marginBottom: 10,
      ...theme.shadow,
      ...theme.typography.Text,
    },
    title: {
      color: theme.colors.Gray[0],
      paddingBottom: 3,
    },
    placeholder: {
      color: theme.colors.Gray[3],
    },
    blackTitle: {
      color: theme.colors.Gray[8],
      paddingBottom: 3,
    },
  });

export default styles;
