import React, {useState, useContext} from "react";
import { StyleSheet, View, ScrollView, StatusBar, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import LoadingScreen from "~screens/LoadingScreen";
import Validation from "~utils/Validation";
import SafeView from "~components/SafeView";
import DetailHeader from "~components/DetailHeader";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[0],
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
        borderColor: theme.colors.Azure,
        fontSize: 15,
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
  const [isLoading, setIsLoadding] = useState(false);

  const messageDisplay = () => {
    if(message.includes("thành công")){
      return <Typography style={{marginTop: 10}} variant="Text" color="PersianBlue">{message}</Typography>
    }else{
      return <Typography style={{marginTop: 10}} variant="Text" color="StrawberryRed">{message}</Typography>
    }
  }

  const checkInput = () => {
    let result = "";
    if(oldPassword.length === 0){
      result += result.length === 0 ? "Hãy nhập mật khẩu cũ!" : "\nHãy nhập mật khẩu cũ!";
      // return result;
    }
    if(!Validation.isLegitPassword(newPassword)){
      result += result.length === 0 ? "Hãy nhập mật khẩu mới ít nhất 8 ký tự gồm chữ in hoa, chữ thường, số và ký tự đặc biệt!" 
                                    : "\nHãy nhập mật khẩu mới ít nhất 8 ký tự gồm chữ in hoa, chữ thường, số và ký tự đặc biệt!";
      setNewPassword("");
      setNewPasswordConfirm("");
    }
    if(newPassword !== newPasswordConfirm){
      result += result.length === 0 ? "Xác nhận mật khẩu không đúng!" : "\nXác nhận mật khẩu không đúng!";
      setNewPasswordConfirm("");
    }
    return result;
  }

  const updatePassword = () => {
    setIsLoadding(true);
    authAxios
      .put("helper/" + user.id + "/updatePassword",{
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then(async (response) => {
        // console.log(response.data);
        setOldPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        setMessage(response.data.data);
        setIsLoadding(false);
      })
      .catch(async (error) => {
        setMessage("");
        setIsLoadding(false);
        if (error.response) {
          console.log(error.response.data);
          let msgArr = error.response.data.msg;
          if(Array.isArray(msgArr)){
            let msg = "";
            msgArr.map((e) => {
              msg += e.replace("body","").concat("\n");
            });
            setMessage(msg);
          }else{
            setMessage(msgArr);
          }
        }
      });
  }

  const onPressButtonUpdate = () => {
    let msg = checkInput();
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
    <SafeView>
      <TouchableWithoutFeedback style={{flex:1}} onPress={() => {Keyboard.dismiss();}}>
        <View style={style.default}>
          {isLoading ? <LoadingScreen /> : null}
          <DetailHeader title="Thay đổi mật khẩu" navigation={navigation}/>
          <View style={{ flex: 7 }}>
            <View style={{ flex: 1 }}></View>
            <View style={[{ flex: 3 }, style.form.wrapper]}>
              <View>
              <Typography variant="TextBold" style={style.label}>Mật khẩu hiện tại:</Typography>
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
              <Typography variant="TextBold" style={style.label}>Mật khẩu mới:</Typography>
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
              <Typography variant="TextBold" style={style.label}>Xác nhận mật khẩu mới:</Typography>
              <TextInput
                style={style.form.field}
                placeholder="Xác nhận mật khẩu"
                title={"Xác nhận mật khẩu mới"}
                titleStyle="blackTitle"
                isPassword
                value={newPasswordConfirm}
                onChangeText={(text) => setNewPasswordConfirm(text)}
              />
              <Typography variant="Text" style={{width: 250, marginTop: 10}}>* mật khẩu có ít nhất 8 ký tự gồm chữ in hoa, chữ thường, số và ký tự đặc biệt</Typography>
              </View>
              {messageDisplay()}
            </View>
            <View style={[{ flex: 2 }, style.form.button]}>
              <Button size="md" radius={4} onPress={onPressButtonUpdate}>
                Lưu
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeView>
  );
};

export default ChangePasswordScreen;