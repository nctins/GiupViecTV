import React, { useContext, useState } from "react";
import { BgImageLayout } from "~components/Layout";
import { SIGNUP_BG } from "assets/images";
import { StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput } from "~components/Inputs";
import Button, { IconButton } from "~components/Button";
import { BackIcon } from "~components/Icons";
import Typography from "~components/Typography";
import useTheme from "~hooks/useTheme";
import ObjMapper from "object-mapper";
import useThemeStyles from "~hooks/useThemeStyles";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import LoadingScreen from "~screens/LoadingScreen";

const Step2 = ({route,navigation}) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const theme = useTheme();
  const styled = useThemeStyles(styles);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { email, phone, name } = route.params;   
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async () => {
    if(password !== passwordConfirm){
      Alert.alert(
        "Đăng ký tài khoản không thành công!",
        "Xác nhận mật khẩu không đúng!",
        [
          { text: "OK"}
        ]
      );
      setPasswordConfirm("");
      return;
    }
    setIsLoading(true);
    publicAxios
      .post("auth/customer/signup", {
        email: email,
        phone: phone,
        name: name,
        password: password,
      })
      .then(async (response) => {
        setIsLoading(false);
        console.log("sign Up");
        console.log(response.data);
        navigation.popToTop();
      })
      .catch(async (error) => {
        setIsLoading(false);
        if (error.response) {
          let {msg} = error.response.data;
          if(Array.isArray(msg) && msg.length > 0){
            let msgAlert = "";
            msg.map(e => {
              msgAlert = msgAlert + e.replace("body","") + '\n';
            })
            Alert.alert(
              "Đăng ký tài khoản không thành công!",
              msgAlert,
              [
                { text: "OK", onPress: () => navigation.pop() }
              ]
            );
          }else{
            Alert.alert(
              "Đăng ký tài khoản không thành công!",
              msg,
              [
                { text: "OK"}
              ]
            );
          }
        }
      });
  };

  return (
    <BgImageLayout background={SIGNUP_BG}>
    <TouchableWithoutFeedback style={{flex:1}} onPress={() => {Keyboard.dismiss();}}>
      <View style={{flex:1}}>
        {isLoading ? <LoadingScreen /> : null}
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <IconButton style={{ margin: 20 }} icon={<BackIcon color="Gray.0" onPress={() => {navigation.pop()}} />} />
        </View>
        <View style={[{ flex: 5 }, styled.centerBox]}>
          <View>
            <Typography style={styled.label}>Password:</Typography>
            <TextInput 
              secureTextEntry={true}
              placeholder="Nhập mật khẩu" 
              title={"Mật khẩu"} 
              value = {password}
              onChangeText={(value) => {setPassword(value)}}
            />
          </View>
          <View>
            <Typography style={styled.label}>Confim Password:</Typography>
            <TextInput
              secureTextEntry={true}
              placeholder="Nhập lại mật khẩu"
              title={"Xác nhận mật khẩu"}
              value={passwordConfirm}
              onChangeText={(value) => {setPasswordConfirm(value)}}
            />
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <View style={[{ flex: 3 }, styled.centerBox]}>
            <Button size="lg" isShadow onPress={onSignUp}>
              Tiếp theo
            </Button>
          </View>
          <View style={{ flex: 2, alignItems:"center" }}>
            <Typography variant="SubTitle" color="Gray.6">
              Điều khoản và Chính sách
            </Typography>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </BgImageLayout>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    circleIcon: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: ObjMapper.getKeyValue(theme.colors, "Gray.0"),
      borderRadius: 100,
      width: 60,
      height: 60,
      marginTop: 10,
      ...theme.shadow,
    },
    cardTitle: {
      alignSelf: "center",
      color: ObjMapper.getKeyValue(theme.colors, "Gray.9"),
      marginTop: 10,
    },
    card: {
      width: 255,
      height: 120,
      borderRadius: 12,
      backgroundColor: ObjMapper.getKeyValue(theme.colors, "Gray.2"),
    },
    centerBox: {
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      color: ObjMapper.getKeyValue(theme.colors, "Gray.0"),
      marginBottom: 5
    }
  });

export default Step2;
