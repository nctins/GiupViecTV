import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from "./styles";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const GoogleIcon = ({ size = "md", color = "StrawberryRed", ...otherProps }) => {
  const colors = useTheme().colors;
  return (
    <FontAwesome5
      name="google-plus-g"
      size={styles[size]}
      color={ObjMapper.getKeyValue(colors, color)}
      {...otherProps}
    />
  );
};

export default GoogleIcon;
