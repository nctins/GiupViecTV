import React, { useContext, useState } from "react";
import { BgImageLayout } from "~components/Layout";
import { SIGNUP_BG } from "assets/images";
import { StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput } from "~components/Inputs";
import Button, { IconButton } from "~components/Button";
import { BackIcon, FacebookIcon, GoogleIcon } from "~components/Icons";
import Typography from "~components/Typography";
import useTheme from "~hooks/useTheme";
import ObjMapper from "object-mapper";
import useThemeStyles from "~hooks/useThemeStyles";
import SafeView from "~components/SafeView";
import StatusBar from "~components/StatusBar";

const Step1 = ({navigation}) => {
  const theme = useTheme();
  const styled = useThemeStyles(styles);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const onPressNextButton = () => {
    if(email.length > 0 && phone.length > 0 && name.length > 0){
      navigation.push('Step2', {email: email, phone: phone, name: name})
    }else{
      Alert.alert(
        "Thông báo!",
        "Cần nhập đầy đủ các mục để tiếp tục!",
        [
          { text: "OK"}
        ]
      );
    }
  }
  
  return (
    <BgImageLayout background={SIGNUP_BG}>
      <StatusBar/>
      <SafeView>
        <TouchableWithoutFeedback style={{flex:1}} onPress={() => {Keyboard.dismiss();}}>
        <View style={{flex:1}}>
          <View style={{ alignItems: "flex-start", margin: 20 }}>
            <BackIcon color="Gray.0" onPress={() => {navigation.pop()}} />
          </View>
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Typography variant="H5" color="Gray.0">
              Đăng ký
            </Typography>
          </View>
          <View style={{ alignItems: "center", marginTop:30 }}>
            <View>
            <Typography style={styled.label}>Email:</Typography>
            <TextInput 
              placeholder="Hứa không gửi email spam" 
              title={"Email"} 
              value={email}
              onChangeText={(value) => {setEmail(value)}}
            />
            </View>
            <View>
            <Typography style={styled.label}>Họ và tên:</Typography>
            <TextInput
              placeholder="Bạn thích mọi người gọi bạn là gì ?"
              title={"Tên"}
              value={name}
              onChangeText={(value) => {setName(value)}}
            />
            </View>
            <View>
            <Typography style={styled.label}>Phone:</Typography>
            <TextInput
              placeholder="Mọi người liên lạc bạn theo số này nè"
              title={"Số điện thoại"}
              keyboardType = 'numeric'
              maxLength={10}
              value={phone}
              onChangeText={(value) => {setPhone(value)}}
            />
            </View>
          </View>
          {/* 
          <View style={{ alignItems: "center", marginTop:50 }}>
            <View style={styled.card}>
              <Typography style={styled.cardTitle}>Đăng ký với</Typography>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={styled.circleIcon}>
                  <FacebookIcon />
                </View>
                <View style={styled.circleIcon}>
                  <GoogleIcon />
                </View>
              </View>
            </View>
          </View>
          */}
          <View style={{ alignItems: "center", marginTop:200 }}>
            <Button size="lg" isShadow onPress={onPressNextButton}>
              Tiếp theo
            </Button>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </SafeView>
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
      marginTop: 10
    },
    card: {
      width: 255,
      height: 120,
      borderRadius: 12,
      backgroundColor: ObjMapper.getKeyValue(theme.colors, "Gray.2"),
    },
    label: {
      color: ObjMapper.getKeyValue(theme.colors, "Gray.0"),
      marginBottom: 5
    }
  });

export default Step1;
