import { Image } from "react-native";
import { LOGO } from "assets/images";
import styles from "./styles";

const LogoIcon = ({ size = "sm", ...otherProps }) => {
  return (
    <Image
      source={LOGO}
      style={{ width: styles[size], height: styles[size] }}
      {...otherProps}
    />
  );
};

export default LogoIcon;
