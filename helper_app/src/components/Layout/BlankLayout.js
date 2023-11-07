import React from "react";
import { View, Dimensions } from "react-native";
import { StatusBarHeight } from "~constants/statusBarHeight";
import { StatusBar } from "expo-status-bar";
import useTheme from "~hooks/useTheme";
import ObjMapper from 'object-mapper'

const BlankLayout = ({children, color="Gray.0"}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: ObjMapper.getKeyValue(theme.colors, color),
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height,
          marginTop: StatusBarHeight,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default BlankLayout;