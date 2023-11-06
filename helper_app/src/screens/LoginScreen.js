import React, { useContext, useState } from "react";
import { BgImageLayout } from "~components/Layout";
import { LOGIN_BG } from "assets/images";
import Button from "~components/Button";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";
import { Pressable, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import * as SecureStore from "expo-secure-store";
import Toast from "~utils/Toast";
import LoadingScreen from "./LoadingScreen";
import useNotificationContext from "~hooks/useNotificationContext";

const LoginScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoadding] = useState(false);

  const setToken = async (value) => {
    await SecureStore.setItemAsync("helper_auth_info", value);
  };

  const {notificationToken} = useNotificationContext();
  
  const onLogin = async () => {
    setIsLoadding(true);
    publicAxios
      .post("auth/helper/signin", {
        email: email,
        password: password,
        notificationToken: notificationToken,
      })
      .then(async (response) => {
        setIsLoadding(false);
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
        Toast.createToast("Xin chào, " + user.name);
        navigation.push('HomeScreen', { params: 'example' })
      })
      .catch(async (error) => {
        setIsLoadding(false);
        if (error.response) {
          // console.log(error.response.data);
          let msg = error.response.data.msg;
          let rsMsg = "";
          if(Array.isArray(msg)){
            msg.map((e) => {
              e = e.split(":");
              rsMsg += e[1].concat("\n");
            });
          }else{
            rsMsg = msg;
          }
          Alert.alert(
            "Thông báo!",
            rsMsg,
            [
              { text: "OK"}
            ]
          );
        }
      });
  };

  return (
    <KeyboardAvoidingView >
    <BgImageLayout background={LOGIN_BG}>
    <TouchableWithoutFeedback style={{flex:1}} onPress={() => {Keyboard.dismiss();}}>
    <View style={{flex:1}}>
      {isLoading ? <LoadingScreen /> : null}
      <View style={{ flex: 3 }}></View>
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <Typography variant="H4" color="Gray.8" style={{ marginBottom: 10 }}>
          Đăng nhập
        </Typography>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{ marginBottom: 20, fontSize: 15, }}
            placeholder="Nhập email"
            title={"Email"}
            titleStyle="blackTitle"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{ marginBottom: 15, fontSize: 15, }}
            placeholder="Nhập mật khẩu"
            title={"Mật khẩu"}
            titleStyle="blackTitle"
            isPassword
            value={password}
            onChangeText={(text)=>setPassword(text)}
          />
          <Pressable onPress={()=>{navigation.navigate("ForgotPassScreen")}}>
            <Typography variant="Text" style={{ alignSelf: "flex-end" }}>
              Quên mật khẩu?
            </Typography>
          </Pressable>
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
    </View>
    </TouchableWithoutFeedback>
    </BgImageLayout>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
