import { Image } from "react-native";
import { VNPAY_LOGO } from "assets/images";
import styles from "./styles";

const VNPayIcon = ({ size = "sm", ...otherProps }) => {
  return (
    <Image
      source={VNPAY_LOGO}
      style={{ width: styles[size], height: styles[size] }}
      {...otherProps}
    />
  );
};

export default VNPayIcon;
