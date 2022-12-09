import React, { useContext, useState } from "react";

import { BgImageLayout } from "~components/Layout";
import { LOGIN_BG } from "assets/images";
import Button from "~components/Button";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";
import { Alert, View } from "react-native";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import * as SecureStore from "expo-secure-store";
import Validation from "~utils/Validation";

const ForgotPassScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [input_email, setInputEmail] = useState(true);
  const [access_token, setAccessToken] = useState(null);
  const [new_password, setNewPassword] = useState("");

  const onSubmitEmail = () => {
    if (!Validation.isEmail(email)) {
      Alert.alert("Lỗi", "Địa chỉ email không chính xác");
      return;
    }
    publicAxios
      .post("auth/helper/forgot-password", { email: email })
      .then((res) => {
        Alert.alert("", "Mã xác thực tới email của bạn", [
          { text: "OK", onPress: () => setInputEmail(false) },
        ]);
      })
      .catch((err) => {
        console.log(err.response.data);
        Alert.alert("Lỗi", err.response.data.msg);
      });
  };

  const onSubmitOtp = () => {
    if (otp == "") {
      Alert.alert("Lỗi", "Mã xác thực không đúng.");
      return;
    }
    publicAxios
      .post("auth/helper/forgot-password/verify", { email, otp })
      .then((res) => {
        setAccessToken(res.data.token);
      })
      .catch((err) => {
        Alert.alert("Lỗi", err.response.data.msg);
      });
  };

  const onChangePassword = () => {
    console.log({ email, otp, new_password });
    if (new_password.length < 6) {
      Alert.alert("", "Mật khẩu phải ít nhất 6 ký tự");
    }
    publicAxios.post(
      "auth/change-password",
      { password: new_password },
      { headers: { "x-access-token": access_token } }
    ).then((res)=>{
      Alert.alert("", res.data.msg, [{text: "OK", onPress: ()=>{
        navigation.navigate("LoginScreen");
      }}]);
    }).catch((err)=>{
      Alert.alert("", err.response.data.msg);
    });
  };

  const displayTitle = () => {
    if (access_token) {
      return "Vui lòng nhập mật khẩu mới.";
    }
    if (input_email) {
      return "Vui lòng nhập Email để lấy lại mật khẩu.";
    } else {
      return "Vui lòng nhập mã xác thực.";
    }
  };

  const displayInput = () => {
    if (access_token) {
      return (
        <TextInput
          style={{ margin: 20 }}
          placeholder="Mật khẩu mới"
          title={"Mật khẩu mới"}
          titleStyle="blackTitle"
          value={new_password}
          isPassword
          onChangeText={(text) => setNewPassword(text)}
        />
      );
    }
    if (input_email) {
      return (
        <TextInput
          style={{ margin: 20 }}
          placeholder="Nhập email"
          title={"Email"}
          titleStyle="blackTitle"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      );
    } else {
      return (
        <TextInput
          style={{ margin: 20 }}
          placeholder="Nhập mã xác thực"
          title={"Mã xác thực"}
          titleStyle="blackTitle"
          value={otp}
          onChangeText={(text) => setOtp(text)}
          keyboardType="numeric"
        />
      );
    }
  };

  return (
    <BgImageLayout background={LOGIN_BG}>
      <View style={{ flex: 3 }}></View>
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <Typography variant="H7" color="Gray.8" style={{ marginBottom: 10 }}>
          {displayTitle()}
        </Typography>
        <View style={{ marginBottom: 20 }}>{displayInput()}</View>
        <Button
          variant="primary"
          size="sm"
          onPress={() => {
            if (access_token) {
              onChangePassword();
              return;
            }
            if (input_email) {
              onSubmitEmail();
              return;
            } else {
              onSubmitOtp();
              return;
            }
          }}
        >
          Tiếp tục
        </Button>
      </View>
      <View style={{ flex: 2 }}></View>
    </BgImageLayout>
  );
};

export default ForgotPassScreen;
