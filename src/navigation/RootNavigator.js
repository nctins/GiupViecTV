import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useTheme from "~hooks/useTheme";
import Typography from "~components/Typography";

const RootComponent = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <View style={styles.container}>
      <Typography variant="H1" >hello</Typography>
      <Typography variant="H2" >hello</Typography>
      <Typography variant="H3" >hello</Typography>
      <Typography variant="H4" style={{color: theme.colors.BackgroundBlue}} >hello</Typography>
      <Typography variant="H5" >hello</Typography>
      <Typography variant="H6" >hello</Typography>
      <Typography variant="H7" >hello</Typography>
      <Typography>hello</Typography>
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
