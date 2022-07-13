import React from "react";
import { Text } from "react-native";
import useTheme from "~hooks/useTheme";

const Typography = ({ variant = "Text", style, children, ...otherProps }) => {
  const theme = useTheme();
  const typography = theme.typography;
  return (
    <Text style={[typography[variant], style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default Typography;
