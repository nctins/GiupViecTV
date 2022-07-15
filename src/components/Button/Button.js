import React from "react";
import { TouchableOpacity } from "react-native";
import Typography from "~components/Typography";
import useThemeStyles from "~hooks/useThemeStyles";
import styles from "./styles";

// Button component
// props: variant(primary/secondary)
// props: size(lg/md/sm)
// default: primary, md
const Button = ({
  children,
  variant = "primary",
  size = "md",
  isShadow = false,
  style,
  radius = 30,
  ...otherProps
}) => {
  const styled = useThemeStyles(styles)
  const borderRadius = {borderRadius: radius}
  const buttonStyle = isShadow
    ? [styled[variant], styled[size], styled["shadow"], style, borderRadius]
    : [styled[variant], styled[size], style, borderRadius];
  const textColor = styled[variant].color;
  
  return (
    <TouchableOpacity style={buttonStyle} {...otherProps}>
      <Typography variant="ButtonLabel" style={{ color: textColor, textAlign:"center" }}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;
