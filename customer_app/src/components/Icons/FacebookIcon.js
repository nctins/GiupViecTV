import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from "./styles";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const FacebookIcon = ({ size = "md", color = "Azure", ...otherProps }) => {
  const colors = useTheme().colors;
  return (
    <FontAwesome5
      name="facebook"
      size={styles[size]||size}
      color={ObjMapper.getKeyValue(colors, color)}
      {...otherProps}
    />
  );
};

export default FacebookIcon;
