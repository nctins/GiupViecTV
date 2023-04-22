import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import useTheme from "~hooks/useTheme";
import * as ObjMapper from "object-mapper";

const OrderCancelIcon = ({ size = "md", color = "Gray.4", ...otherProps }) => {
  const colors = useTheme().colors;
  return (
    <MaterialIcons
      name="event-busy"
      size={styles[size]||size}
      color={ObjMapper.getKeyValue(colors, color)}
      {...otherProps}
    />
  );
};

export default OrderCancelIcon;
