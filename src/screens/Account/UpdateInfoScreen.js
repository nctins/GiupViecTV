import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform, 
  Pressable,
  Modal
} from "react-native";
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
import GoogleMap from "~screens/GoogleMapScreen";

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
        marginBottom: 10,
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
      color: theme.colors.DarkGray[11],
      marginLeft: 10,
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
  const [MSDD,setMSDD] = useState("");
  const [address,setAddress] = useState("");
  const [placeID,setPlaceID] = useState("");
  const [message,setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://reactnative.dev/img/tiny_logo.png");
  const [imageBase64,setImageBase64] = useState();
  const [isLoading, setIsLoadding] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const ModalGoogleMap = ({setPlaceID, setAddress}) => {
    const style = useThemeStyles(modalStyle);

    return (
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={style.centeredView}>
          <GoogleMap setModalVisible = {setModalVisible} setOriginAddress = {setAddress} setOriginPlaceID = {setPlaceID} />
        </View>
      </Modal>
    );
  };

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
      console.log('Permission to access camera roll is required!');
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
    authAxios
      .get("helper/" + user.id)
      .then(async (response) => {
        let helper = response.data.data;
        setEmail(helper.email);
        setName(helper.name);
        setPhone(helper.phone);
        setMSDD(helper.MSDD);
        setSelectedImage(helper.avatar_url);
        setAddress(helper.address);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }

  const updateAccount = () => {
    if(email.length > 0 && phone.length > 0 && name.length > 0 && MSDD.length > 0 && address.length > 0){
      setIsLoadding(true);
      authAxios
      .put("helper/" + user.id,{
        email: email,
        name: name,
        phone: phone,
        MSDD: MSDD,
        image: imageBase64,
        address: address,
        placeID: placeID,
      })
      .then(async (response) => {
        setMessage(response.data.data);
        authContext.setAuthState({...authContext.authState,user:{id: user.id, name: name, email: email, phone: phone, avatar_url: selectedImage, address: address}});
        setIsLoadding(false);
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
          setIsLoadding(false);
          // setMessage(error.response.data.msg);
        }
      });
    }else{
      Alert.alert(
        "Thông báo!",
        "Cần nhập đầy đủ các mục để cập nhật!",
        [
          { text: "OK"}
        ]
      );
    }
  }

  const onPressButtonSave = () => {
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

  const onPressAddress = () => {
    console.log("press address");
    setModalVisible(true);
  }

  return (
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
        <View style={[{ flex: 2 }, style.avatar.wrapper]}>
          <AvatarComponent
            size="llg"
            containerAvatarStyle={style.avatar.border}
            img={selectedImage}
          />
          <View style={style.avatar.textButton}>
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Typography color="Gray.5">Thay đổi</Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* form */}
        <View style={[{ flex: 3 }, style.form.wrapper]}>
          <View>
            <Typography style={style.label}>Email:</Typography>
            <TextInput
              style={style.form.field}
              placeholder="Địa chỉ email của bạn"
              title={"Email"}
              titleStyle="blackTitle"
              value={email}
              onChangeText={(text) => setEmail(text)}
              editable = {false}
            />
          </View>
          <View>
            <Typography style={style.label}>Họ và tên:</Typography>
            <TextInput
              style={style.form.field}
              placeholder="Họ và tên của bạn"
              title={"Họ và tên"}
              titleStyle="blackTitle"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View>
            <Typography style={style.label}>MSDD:</Typography>
            <TextInput
              style={style.form.field}
              placeholder="CMND|CCCD của bạn"
              title={"MSDD"}
              titleStyle="blackTitle"
              keyboardType = 'numeric'
              maxLength={12}
              value={MSDD}
              // onChangeText={(text) => setMSDD(text)}
              editable={false}
            />
          </View>
          <View>
            <Typography style={style.label}>Phone:</Typography>
            <TextInput
              style={style.form.field}
              placeholder="Số điện thoại của bạn"
              title={"Số điện thoại"}
              titleStyle="blackTitle"
              keyboardType = 'numeric'
              maxLength={10}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View>
            <Typography style={style.label}>Địa chỉ:</Typography>
            <Pressable onPress={onPressAddress}>
              <TextInput
                style={style.form.field}
                placeholder="Địa chỉ của bạn"
                title={"Địa chỉ"}
                titleStyle="blackTitle"
                value={address}
                editable={false}
              />
            </Pressable>
          </View>
          {messageDisplay()}
        </View>

        <View style={[{ flex: 1 }, style.form.button]}>
          <Button size="sm" radius={4} style={{ width: 130, padding: 10 }} onPress={onPressButtonSave}>
            Lưu
          </Button>
        </View>
      </View>
      <ModalGoogleMap setAddress={setAddress} setPlaceID = {setPlaceID} />
    </View>
  );
};

const modalStyle = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.Transparency,
    },
    modalView: {
      margin: 10,
      backgroundColor: theme.colors.Gray[0],
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      // height: 250,
      width: 320,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    formInput: {
      marginTop: 10,
    },
    addressInput: {
      marginTop: 5,
      // backgroundColor: theme.colors.Gray[1],
    },
    footer: {
      marginVertical: 15,
    },
  });

export default UpdateInfoScreen;
