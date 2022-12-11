import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, StatusBar, Alert } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import LoadingScreen from "~screens/LoadingScreen";

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
    textArea: {
      marginTop: 10,
      padding: 10,
      width: 350,
      borderWidth: 1,
      borderColor: theme.colors.BackgroundBlue,
    },
  });

const FeedbackScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const [content,setContent] = useState("");
  const [isLoading, setIsLoadding] = useState(false);

  const createFeedback = () =>{
    if(content.length <= 0){
      Alert.alert(
        "Thông báo!",
        "Hãy nhập feedback của bạn!",
        [
          { text: "OK"}
        ]
      );
      return;
    }
    setIsLoadding(true);
    authAxios
      .post("feedback/",{
        content: content
      })
      .then(async (res) => {
        setIsLoadding(false);
        Alert.alert(
          "Thông báo!",
          res.data.data,
          [
            { text: "OK"}
          ]
        );
        setContent("");
      })
      .catch(async (error) => {
        if (error.response) {
          setIsLoadding(false);
          console.log(error.response.data);
          Alert.alert(
            "Thông báo!",
            error.response.data.msg,
            [
              { text: "OK"}
            ]
          );
        };
      });
      
  }

  return (
    <View style={style.default}>
      {isLoading ? <LoadingScreen /> : null}
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon color="Gray.0" onPress={() => {navigation.navigate("AccountScreen")}} />
        <Typography variant="H5" style={style.title}>
          Phản hồi
        </Typography>
      </View>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 1 }}></View>
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={style.textArea}
            placeholder="Vui lòng nhập phản hồi của bạn. Chúng tôi sẽ trả lời sớm nhất có thể."
            title={"Phản hồi của bạn"}
            titleStyle="blackTitle"
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button size="sm" radius={4} style={{ width: 130, padding: 10 }} onPress={createFeedback}>
            Lưu
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FeedbackScreen;
