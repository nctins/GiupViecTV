import React from "react";
import Typography from "~components/Typography";
import { View } from "react-native";
import useTheme from "~hooks/useTheme";
import ObjMapper from "object-mapper";
import { BlankLayout, BgImageLayout } from "~components/Layout";

const FaceCapture = () => {
  const theme = useTheme();
  return (
    <BlankLayout>
      <View style={{backgroundColor:"#F00", flex:1}}></View>
    </BlankLayout>
  );
};

export default FaceCapture;
