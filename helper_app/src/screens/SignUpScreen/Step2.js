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
import Validation from "~utils/Validation";

const Step2 = ({route,navigation}) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const theme = useTheme();
  const styled = useThemeStyles(styles);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { email, phone, name, MSDD } = route.params;   
  const [isLoading, setIsLoadding] = useState(false);

  const checkinput = () => {
    let result = "";
    if(!Validation.isLegitPassword(password)){
      result += result.length === 0 ? "Hãy nhập mật khẩu ít nhất 8 ký tự gồm chữ in hoa, chữ thường, số và ký tự đặc biệt!" 
                                    : "\nHãy nhập mật khẩu ít nhất 8 ký tự gồm chữ in hoa, chữ thường, số và ký tự đặc biệt!";
      setPassword("");
      setPasswordConfirm("");
    }
    if(password !== passwordConfirm){
      result += result.length === 0 ? "Xác nhận mật khẩu không đúng!" : "\nXác nhận mật khẩu không đúng!";
      setPasswordConfirm("");
    }
    return result;
  }

  const onSignUp = async () => {
    let msg = checkinput();
    if(msg.length > 0){
      Alert.alert(
        "Thông báo!",
        msg,
        [
          { text: "OK"}
        ]
      );
      return;
    }
    setIsLoadding(true);
    publicAxios
      .post("auth/helper/signup", {
        email: email,
        phone: phone,
        name: name,
        password: password,
        MSDD: MSDD,
      })
      .then(async (response) => {
        setIsLoadding(false);
        Alert.alert(
          "Thông báo!",
          "Đăng ký tài khoản thành công!",
          [
            { text: "OK"}
          ]
        );
        navigation.popToTop();
      })
      .catch(async (error) => {
        setIsLoadding(false);
        if (error.response) {
          let {msg} = error.response.data;
          let msgAlert = "";
          if(!Array.isArray(msg)){
            Alert.alert(
              "Đăng ký tài khoản không thành công!",
              msg,
              [
                { text: "OK"}
              ]
            );
            return;
          }else{
            msg.map(e => {
              msgAlert = msgAlert + e.replace("body","") + '\n';
            });
          }
          Alert.alert(
            "Đăng ký tài khoản không thành công!",
            msgAlert,
            [
              { text: "OK", onPress: () => navigation.pop() }
            ]
          );
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
      <View style={{ flex: 1, alignItems: "center", marginVertical: 20 }}>
        <Typography variant="H2" color="Gray.0">
          Đăng ký
        </Typography>
      </View>
      <View style={[{ flex: 4 }, styled.centerBox]}>
        <View >
          <Typography variant="TitleBold" style={styled.label}>Password:</Typography>
          <TextInput 
            style={styled.input}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu" 
            title={"Mật khẩu"} 
            value = {password}
            onChangeText={(value) => {setPassword(value)}}
          />
        </View>
        <View>
          <Typography variant="TitleBold" style={styled.label}>Confim Password:</Typography>
          <TextInput
            style={styled.input}
            secureTextEntry={true}
            placeholder="Nhập lại mật khẩu"
            title={"Xác nhận mật khẩu"}
            value={passwordConfirm}
            onChangeText={(value) => {setPasswordConfirm(value)}}
          />
        </View>
        <Typography variant="Text" style={[styled.label, {width: 250, marginTop: 10}]}>* mật khẩu có ít nhất 8 ký tự gồm chữ in hoa, chữ thường, số và ký tự đặc biệt</Typography>
      </View>
      <View style={{ flex: 2 }}>
        <View style={[{ flex: 3 }, styled.centerBox]}>
          <Button size="lg" isShadow onPress={onSignUp}>
            Đăng ký
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
      // justifyContent: "center",
      alignItems: "center",
    },
    label: {
      color: ObjMapper.getKeyValue(theme.colors, "Gray.0"),
      marginBottom: 5
    },
    input: {
      fontSize: 15,
      borderColor: ObjMapper.getKeyValue(theme.colors, "Gray.2"),
      borderWidth: 2,
    }
  });

export default Step2;
