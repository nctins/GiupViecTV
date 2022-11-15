import React, { useContext, useState } from "react";

import { BgImageLayout } from "~components/Layout";
import { LOGIN_BG } from "assets/images";
import Button from "~components/Button";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";
import { View } from "react-native";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import * as SecureStore from "expo-secure-store";

const LoginScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setToken = async (value) => {
    await SecureStore.setItemAsync("auth_info", value);
  };
  
  const onLogin = async () => {
    publicAxios
      .post("http://10.0.2.2:6969/auth/customer/signin", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        const { token, refreshToken, user } = response.data;
        authContext.setAuthState({
          token,
          refreshToken,
          authenticated: true,
          user
        });
        await setToken(JSON.stringify({ token, refreshToken, user }));
        setEmail("");
        setPassword("");
        navigation.push('HomeScreen', { params: 'example' })
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };

  return (
    <BgImageLayout background={LOGIN_BG}>
      <View style={{ flex: 3 }}></View>
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <Typography variant="H4" color="Gray.8" style={{ marginBottom: 10 }}>
          Đăng nhập
        </Typography>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{ marginBottom: 20 }}
            placeholder="Nhập email"
            title={"Email"}
            titleStyle="blackTitle"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Nhập mật khẩu"
            title={"Mật khẩu"}
            titleStyle="blackTitle"
            isPassword
            value={password}
            onChangeText={(text)=>setPassword(text)}
          />
          <Typography variant="Text" style={{ alignSelf: "flex-end" }}>
            Quên mật khẩu?
          </Typography>
        </View>
        <Button variant="primary" size="sm" onPress={() => onLogin()}>
          Đăng nhập
        </Button>
      </View>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Typography>
          Bạn chưa có tài khoản? 
          <Typography variant="TextBold" onPress={() => {navigation.push('Step1', { params: 'example' })}}> Đăng ký ngay!</Typography>
        </Typography>
      </View>
    </BgImageLayout>
  );
};

export default LoginScreen;
