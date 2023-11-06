import React from "react";
import { View, ImageBackground, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { DEFAULT_BG } from "assets/images";
import { StatusBarHeight } from "~constants/statusBarHeight";
const BgImageLayout = ({ background = DEFAULT_BG, children }) => {
  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={background}
      resizeMode={"cover"}
    >
      <StatusBar style="light" />
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height - StatusBarHeight,
          marginTop: StatusBarHeight,
        }}
      >
        {children}
      </View>
    </ImageBackground>
  );
};

export default BgImageLayout;
