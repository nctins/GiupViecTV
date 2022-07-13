import React from "react";
import { TextInput as DefaultTextInput, View, Text } from "react-native";
import Typography from "~components/Typography";
import useThemeStyles from "~hooks/useThemeStyles";
import styles from "./styles";

const TextInput = ({
  variant = "md",
  theme = "fill",
  isPassword = false,
  title,
  style,
  ...otherProps
}) => {
  const styled = useThemeStyles(styles);
  return (
    <View>
      <Typography style={[styled.title]}>{title}</Typography>
      <DefaultTextInput
        style={[styled[variant], styled[theme], style]}
        secureTextEntry={isPassword}
        placeholderTextColor={styled.placeholder.color}
        {...otherProps}
      />
    </View>
  );
};

export default TextInput;
