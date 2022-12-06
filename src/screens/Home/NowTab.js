import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import StateNowComponent from "~components/StateNowComponent";
import useSocket from "~hooks/useSocket";
import { IntantOrderProvider } from "~contexts/IntantOrderContext";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    circleView: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    animationView: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    animation: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: "white",
    },
  });

const NowTab = () => {
  const style = useThemeStyles(styles);
  // const { socket } = useSocket();

  return (
    <IntantOrderProvider>
      <View style={style.default}>
        <StateNowComponent />
      </View>
    </IntantOrderProvider>
  );
};
export default NowTab;
