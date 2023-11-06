import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const ClockEditIcon = ({ size = "md", color = "Gray.4", ...otherProps }) => {
  const colors = useTheme().colors;
  return (
    <MaterialCommunityIcons
      name="clock-edit"
      size={styles[size]||size}
      color={ObjMapper.getKeyValue(colors, color)}
      {...otherProps}
    />
  );
};

export default ClockEditIcon;
