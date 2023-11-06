import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const ClockRemoveIcon = ({ size = "md", color = "Gray.4", ...otherProps }) => {
  const colors = useTheme().colors;
  return (
    <MaterialCommunityIcons
      name="clock-remove-outline"
      size={styles[size]||size}
      color={ObjMapper.getKeyValue(colors, color)}
      {...otherProps}
    />
  );
};

export default ClockRemoveIcon;
