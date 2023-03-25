import React, { useState } from "react";
import { TextInput as DefaultTextInput, View, Text } from "react-native";
import Typography from "~components/Typography";
import useThemeStyles from "~hooks/useThemeStyles";
import styles from "./styles";

const TextInput = ({
  variant = "md",
  theme = "fill",
  isPassword = false,
  title,
  titleStyle = "title",
  style,
  ...otherProps
}) => {
  const styled = useThemeStyles(styles);
  const initSelection = {start: 0,end: 0};
  const endSelection = {start: 1000,end: 1000};
  const [selection,setSelection] = useState(initSelection);

  if(title != ""|| title != null){
    return (
      <View>
        <DefaultTextInput
          style={[styled[variant], styled[theme], style]}
          secureTextEntry={isPassword}
          placeholderTextColor={styled.placeholder.color}
          selection={selection}
          onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
          onBlur={() => setSelection(initSelection)}
          onFocus={() => setSelection(endSelection)}
          {...otherProps}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Typography style={[styled[titleStyle]]}>{title}</Typography>
        <DefaultTextInput
          style={[styled[variant], styled[theme], style]}
          secureTextEntry={isPassword}
          placeholderTextColor={styled.placeholder.color}
          selection={selection}
          onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
          onBlur={() => setSelection(initSelection)}
          onFocus={() => setSelection(endSelection)}
          
          {...otherProps}
        />
      </View>
    );
  }
};

export default TextInput;
