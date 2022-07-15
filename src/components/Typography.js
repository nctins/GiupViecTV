import React from "react";
import { Text } from "react-native";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const Typography = ({ variant = "Text", color="Gray.8", style, children, ...otherProps }) => {
  const theme = useTheme();
  const typography = theme.typography;
  return (
    <Text style={[typography[variant],{color: ObjMapper.getKeyValue(theme.colors,color)}, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default Typography;
