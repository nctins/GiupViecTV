import React from "react";
import { Button, TouchableOpacity } from "react-native";

const IconButton = ({ style, icon, ...otherProps }) => {
  return (
    <TouchableOpacity style={style} {...otherProps}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;
