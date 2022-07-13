import { startTransition } from "react";
import { StyleSheet } from "react-native";

const styles = (theme) =>
  StyleSheet.create({
    md: {
      width: 270,
      padding: 10,
    },
    fill: {
      backgroundColor: theme.colors.Gray[0],
      borderRadius: 5,
      ...theme.shadow,
      ...theme.typography.Text,
    },
    title: {
      color: theme.colors.Gray[0],
      paddingBottom: 6,
    },
    placeholder: {
      color: theme.colors.Gray[3],
    },
  });

export default styles;
