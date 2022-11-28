import React, {useState, useContext} from "react";
import { StyleSheet, View, ScrollView, StatusBar, Alert } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
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
      color: "white",
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
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
    label: {
      color: theme.colors.DarkGray[11] ,
      marginBottom: 5
    }
  });

const ChangePasswordScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const user = authContext.authState.user;
  const {authAxios} = useContext(AxiosContext);
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [newPasswordConfirm,setNewPasswordConfirm] = useState("");
  const [message,setMessage] = useState("");

  const messageDisplay = () => {
    if(message.includes("thành công")){
      setOldPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      return <Typography style={{marginTop: 10}} color="PersianBlue">{message}</Typography>
    }else{
      return <Typography style={{marginTop: 10}} color="StrawberryRed">{message}</Typography>
    }
  }

  const updatePassword = () => {
    if(newPassword !== newPasswordConfirm){
      setMessage("Xác nhận mật khẩu không đúng!");
      setNewPasswordConfirm("");
      return;
    }

    authAxios
      .put("helper/" + user.id + "/updatePassword",{
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then(async (response) => {
        // console.log(response.data);
        setMessage(response.data.data);
      })
      .catch(async (error) => {
        setMessage("");
        if (error.response) {
          console.log(error.response.data);
          let msgArr = error.response.data.msg;
          msgArr.map((e) => {
            e = e.replace("body","");
            setMessage(prev => prev.concat('\n').concat(e));
          })
          // setMessage(error.response.data.msg);
        }
      });
  }

  const onPressButtonUpdate = () => {
    Alert.alert(
      "Thông báo!",
      "Bạn có muốn cập nhập mật khẩu không",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: updatePassword}
      ]
    );
  }

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon color="Gray.0" onPress={() => {navigation.navigate("AccountScreen")}} />
        <Typography variant="H5" style={style.title}>
          Thay đổi mật khẩu
        </Typography>
      </View>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 1 }}></View>
        <View style={[{ flex: 3 }, style.form.wrapper]}>
          <View>
          <Typography style={style.label}>Mật khẩu hiện tại:</Typography>
          <TextInput
            style={style.form.field}
            placeholder="Nhập mật khẩu cũ"
            title={"Mật khẩu cũ"}
            titleStyle="blackTitle"
            isPassword
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
          />
          </View>
          <View>
          <Typography style={style.label}>Mật khẩu mới:</Typography>
          <TextInput
            style={style.form.field}
            placeholder="Nhập mật khẩu mới"
            title={"Mật khẩu mới"}
            titleStyle="blackTitle"
            isPassword
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          </View>
          <View>
          <Typography style={style.label}>Xác nhận mật khẩu mới:</Typography>
          <TextInput
            style={style.form.field}
            placeholder="Nhập lại mật khẩu"
            title={"Nhập lại mật khẩu mới"}
            titleStyle="blackTitle"
            isPassword
            value={newPasswordConfirm}
            onChangeText={(text) => setNewPasswordConfirm(text)}
          />
          </View>
          {messageDisplay()}
        </View>
        <View style={[{ flex: 2 }, style.form.button]}>
          <Button size="sm" radius={4} style={{ width: 130, padding: 10 }} onPress={onPressButtonUpdate}>
            Lưu
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
