import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
import AvatarComponent from "~components/AvatarComponent";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[1],
      flexDirection: "column",
    },
    header: {
      width: "100%",
      height: 90,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      flex:1,
    },
    title: {
      marginLeft: 15,
      color: theme.colors.Gray[0],
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    avatar:{
      // width: 110,
      // height:110,
    }
  });

const UpdateInfoScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon color="Gray.0" />
        <Typography variant="H5" style={style.title}>
          Chỉnh sửa thông tin cá nhân
        </Typography>
      </View>
      <View style={{flex: 7}}>
        <View style={{flex:2}}>
          <AvatarComponent size="llg" avatarStyle={style.avatar} />
        </View>
        <View style={{flex:3, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
              style={{ marginBottom: 20 }}
              placeholder=""
              title={"Email"}
              titleStyle="blackTitle"
              value = "teo.nguyenvan@gmail.com"
            />
          <TextInput
              style={{ marginBottom: 20 }}
              placeholder=""
              title={"Họ và tên"}
              titleStyle="blackTitle"
              value = "Nguyễn Văn Tèo"
            />
          <TextInput
              style={{ marginBottom: 20 }}
              placeholder=""
              title={"Số điện thoại"}
              titleStyle="blackTitle"
              value = "0564564231"
            />
        </View>
        <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
          <Button size="sm" radius={4} style={{width:130, padding:10}}>Lưu</Button>
        </View>
      </View>
    </View>
  );
};

export default UpdateInfoScreen;
