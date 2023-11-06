import React from "react";
import { Entypo } from '@expo/vector-icons'; 
import styles from "./styles";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const MinusIcon = ({ size = "md", color = "Gray.4", ...otherProps }) => {
  const colors = useTheme().colors;
  return (
    <Entypo 
      name="minus"
      size={styles[size]}
      color={ObjMapper.getKeyValue(colors, color)}
      {...otherProps}
    />
  );
};

export default MinusIcon;
