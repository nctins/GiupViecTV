import React, { useContext, useState } from "react";
import { BgImageLayout } from "~components/Layout";
import { LOGIN_BG } from "assets/images";
import Button from "~components/Button";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";
import { Pressable, View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import * as SecureStore from "expo-secure-store";
import LoadingScreen from "./LoadingScreen";
import Toast from "~utils/Toast";
import SafeView from "~components/SafeView";
import StatusBar from "~components/StatusBar";

const LoginScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setToken = async (value) => {
    await SecureStore.setItemAsync("customer_auth_info", value);
  };
  
  const onLogin = async () => {
    setIsLoading(true);
    publicAxios
      .post("auth/customer/signin", {
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
        setIsLoading(false);
        Toast.createToast("Xin chào, " + user.name);
        navigation.push('HomeScreen', { params: 'example' })
      })
      .catch(async (error) => {
        setIsLoading(false);
        if (error.response) {
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
    <BgImageLayout background={LOGIN_BG}>
      <StatusBar/>
      <SafeView>
        <TouchableWithoutFeedback style={{flex:1}} onPress={() => {Keyboard.dismiss();}}>
        <View style={{flex:1}}>
          {isLoading ? <LoadingScreen /> : null}
          <View style={{ flex: 3 }}></View>
          <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
            <Typography variant="H3" color="BackgroundBlue" style={{ marginBottom: 25 }}>
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
                style={{ marginBottom: 10, fontSize: 15, }}
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
      </SafeView>
    </BgImageLayout>
  );
};

export default LoginScreen;
