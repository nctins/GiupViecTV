import React from "react";
import { Text } from "react-native";
import useTheme from "~hooks/useTheme";

const Typography = (props) => {
  const theme = useTheme();
  const typography = theme.typography;
  const { variant, style, ...otherProps } = props;
  const textStyle = variant ? typography[variant] : typography.Text;
  return (
    <Text style={[textStyle, style]} {...otherProps}> {props.children} </Text>
  );
};

export default Typography;
