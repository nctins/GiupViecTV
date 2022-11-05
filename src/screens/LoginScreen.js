import React from "react";
import { BgImageLayout } from "~components/Layout";
import { LOGIN_BG } from "assets/images";
import Button from "~components/Button";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";
import { View } from "react-native";

const LoginScreen = ({navigation}) => {
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
          />
          <TextInput
            placeholder="Nhập mật khẩu"
            title={"Mật khẩu"}
            titleStyle="blackTitle"
            isPassword
          />
          <Typography variant="Text" style={{ alignSelf: "flex-end" }}>
            Quên mật khẩu?
          </Typography>
        </View>
        <Button variant="primary" size="sm" onPress={() => {navigation.push('HomeScreen', { params: 'example' })}}>
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
