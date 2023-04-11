import React, { useState, useEffect, useContext } from "react";
import {StyleSheet, View, StatusBar, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
import AvatarComponent from "~components/AvatarComponent";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import * as ImagePicker from 'expo-image-picker';
import LoadingScreen from "~screens/LoadingScreen";
import Validation from "~utils/Validation";

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
      color: theme.colors.Gray[0],
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    avatar: {
      wrapper: {
        flex: 3,
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      },
      border: {
        alignSelf: "center",
        borderWidth: 3,
        borderColor: theme.colors.BackgroundBlue,
        borderRadius: 150,
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
  });

const UpdateInfoScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const user = authContext.authState.user;
  const {authAxios} = useContext(AxiosContext);
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [message,setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://reactnative.dev/img/tiny_logo.png");
  const [imageBase64,setImageBase64] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAccount();
  },[])

  const messageDisplay = () => {
    if(message.includes("thành công")){
      return <Typography style={{marginTop: 10}} color="PersianBlue">{message}</Typography>
    }else{
      return <Typography style={{marginTop: 10}} color="StrawberryRed">{message}</Typography>
    }
  }

  const openImagePickerAsync = async() => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      // console.log('Permission to access camera roll is required!');
      Alert.alert("", "Cần cấp quyền tải lên hình ảnh!", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      //We need the image to be base64 in order to be formatted for Cloudinary
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);

    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
    setImageBase64(base64Img);
  }

  const getAccount = async () => {
    setIsLoading(true);
    authAxios
      .get("customer/" + user.id)
      .then(async (response) => {
        // console.log(response.data);
        let customer = response.data.data;
        setEmail(customer.email);
        setName(customer.name);
        setPhone(customer.phone);
        setSelectedImage(customer.avatar_url);
        setIsLoading(false);
      })
      .catch(async (error) => {
        setIsLoading(false);
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }

  const checkinput = () => {
    let result = "";
    if(!Validation.isVietnamesePhoneNumber(phone)){
      result += result.length === 0 ? "Số điện thoại không đúng!" : "\nSố điện thoại không đúng!";
    }
    if(name.length === 0){
      result += result.length === 0 ? "Hãy nhập họ và tên!" : "\nHãy nhập họ và tên!";
    }
    return result;
  }

  const updateAccount = () => {
    setIsLoading(true);
    authAxios
      .put("customer/" + user.id,{
        email: email,
        name: name,
        phone: phone,
        image: imageBase64,
      })
      .then(async (response) => {
        // console.log(response.data.data);
        setMessage(response.data.data);
        authContext.setAuthState({...authContext.authState,user:{id: user.id, name: name, email: email, phone: phone, avatar_url: selectedImage}});
        setIsLoading(false);
      })
      .catch(async (error) => {
        setMessage("");
        if (error.response) {
          console.log(error.response.data);
          let msgArr = error.response.data.msg;
          msgArr.map((e) => {
            e = e.split(":");
            setMessage(prev => prev.concat('\n').concat(e[1]));
          })
          // setMessage(error.response.data.msg);
        }
        setIsLoading(false);
      });
  }

  const onPressButtonSave = () => {
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
    Alert.alert(
      "Thông báo!",
      "Bạn có muốn cập nhập không",
      [
        {
          text: "Cancel",
          onPress: getAccount,
          style: "cancel"
        },
        { text: "OK", onPress: updateAccount}
      ]
    );
  }

  return (
    <TouchableWithoutFeedback style={{flex:1}} onPress={() => {Keyboard.dismiss();}}>
    <View style={style.default}>
      {isLoading ? <LoadingScreen /> : null}
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon color="Gray.0" onPress={() => {navigation.navigate("AccountScreen")}} />
        <Typography variant="H5" style={style.title}>
          Chỉnh sửa thông tin cá nhân
        </Typography>
      </View>
      <View style={{ flex: 7 }}>
        {/* avatar */}
        <View style={style.avatar.wrapper}>
          <AvatarComponent
            size={150}
            containerAvatarStyle={style.avatar.border}
            img={selectedImage}
          />
          <View style={style.avatar.textButton}>
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Typography variant="Text" color="Gray.6">Thay đổi</Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* form */}
        <View style={[{ flex: 3 }, style.form.wrapper]}>
          <TextInput
            style={style.form.field}
            placeholder=""
            title={"Email"}
            titleStyle="blackTitle"
            value={email}
            onChangeText={(text) => setEmail(text)}
            editable = {false}
          />
          <TextInput
            style={style.form.field}
            placeholder=""
            title={"Họ và tên"}
            titleStyle="blackTitle"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={style.form.field}
            placeholder=""
            title={"Số điện thoại"}
            titleStyle="blackTitle"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          {messageDisplay()}
        </View>

        <View style={[{ flex: 2 }, style.form.button]}>
          <Button size="lg" radius={4} style={{ width: 130, padding: 10 }} onPress={onPressButtonSave}>
            Lưu
          </Button>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default UpdateInfoScreen;
