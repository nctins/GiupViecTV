import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useTheme from "~hooks/useTheme";
import Typography from "~components/Typography";
import Button from "~components/Button";

const RootComponent = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Typography variant="H1">hello</Typography>
      <Button isShadow>demo</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RootComponent;
