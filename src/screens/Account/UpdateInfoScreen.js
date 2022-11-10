import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Touchable,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
import AvatarComponent from "~components/AvatarComponent";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";

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
      flex: 1,
    },
    title: {
      marginLeft: 15,
      color: theme.colors.Gray[0],
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    avatar: {
      wrapper: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      },
      border: {
        alignSelf: "center",
        borderWidth: 3,
        borderColor: theme.colors.BackgroundBlue,
        borderRadius: 120,
      },
      textButton: {
        alignSelf: "center",
        marginTop: 8,
      },
    },
    form: {
      field: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.colors.BackgroundBlue,
      },
      wrapper: {
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
  });

const UpdateInfoScreen = () => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");

  useEffect(() => {
    publicAxios
      .get("http://10.0.2.2:6969/customer/CUS_1kh9x4e68la8f1e0o")
      .then(async (response) => {
        console.log(response.data);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  })

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon color="Gray.0" />
        <Typography variant="H5" style={style.title}>
          Chỉnh sửa thông tin cá nhân
        </Typography>
      </View>
      <View style={{ flex: 7 }}>
        {/* avatar */}
        <View style={[{ flex: 2 }, style.avatar.wrapper]}>
          <AvatarComponent
            size="llg"
            containerAvatarStyle={style.avatar.border}
          />
          <View style={style.avatar.textButton}>
            <Typography color="Gray.5">Thay đổi</Typography>
          </View>
        </View>

        {/* form */}
        <View style={[{ flex: 3 }, style.form.wrapper]}>
          <TextInput
            style={style.form.field}
            placeholder=""
            title={"Email"}
            titleStyle="blackTitle"
            value="teo.nguyenvan@gmail.com"
          />
          <TextInput
            style={style.form.field}
            placeholder=""
            title={"Họ và tên"}
            titleStyle="blackTitle"
            value="Nguyễn Văn Tèo"
          />
          <TextInput
            style={style.form.field}
            placeholder=""
            title={"Số điện thoại"}
            titleStyle="blackTitle"
            value="0564564231"
          />
        </View>

        <View style={[{ flex: 2 }, style.form.button]}>
          <Button size="sm" radius={4} style={{ width: 130, padding: 10 }}>
            Lưu
          </Button>
        </View>
      </View>
    </View>
  );
};

export default UpdateInfoScreen;
