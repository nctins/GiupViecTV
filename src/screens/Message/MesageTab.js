import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import MessageItem from "~components/MessageItem";
import { AxiosContext } from "~contexts/AxiosContext";
import useThemeStyles from "~hooks/useThemeStyles";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[0],
      paddingHorizontal: 15,
      flexDirection: "column",
      justifyContent: "center",
    },
    content: {
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.colors.Gray[0],
    },
    TextInputView: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
    },
    textInput: {
      width: "90%",
      height: 40,
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 5,
      backgroundColor: theme.colors.Gray[1],
      marginTop: 10,
      marginBottom: 10,
    },
  });

const MessageTab = ({ navigation }) => {
  const style = useThemeStyles(styles);
  const { authAxios } = useContext(AxiosContext);
  const [boxChats, setBoxChats] = useState([]);
  useEffect(()=>{
    authAxios
    .get("/box-chats")
    .then((res) => {
      const resObj = res.data;
      setBoxChats(resObj.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      setBoxChats([]);
    });
  },[]);

  return (
    <View style={style.default}>
      <View style={style.TextInputView}>
        <TextInput style={style.textInput} placeholder="Search" />
      </View>
      <ScrollView contentContainerStyle={style.content}>
        {boxChats.map((box_chat, idx) => (
          <MessageItem key={idx} navigation={navigation} data={box_chat} />
        ))}
      </ScrollView>
    </View>
  );
};
export default MessageTab;
