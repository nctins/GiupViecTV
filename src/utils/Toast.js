import { ToastAndroid } from "react-native";

const Toast = {};
Toast.createToast = (msg) => {
  ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0,
    250
  );
};

export default Toast;
