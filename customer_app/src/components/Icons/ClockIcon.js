import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const ClockIcon = ({ size = "md", color = "Gray.4", ...otherProps }) => {
  const colors = useTheme().colors;
  return (
    <AntDesign
      name="clockcircleo"
      size={styles[size]||size}
      color={ObjMapper.getKeyValue(colors, color)}
      {...otherProps}
    />
  );
};

export default ClockIcon;
