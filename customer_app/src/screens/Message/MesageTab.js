import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, RefreshControl } from "react-native";
import MessageItem from "~components/MessageItem";
import { AxiosContext } from "~contexts/AxiosContext";
import useThemeStyles from "~hooks/useThemeStyles";
// import LoadingScreen from '../LoadingScreen';

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

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {getBoxChat();}, []);

  useFocusEffect(
    useCallback(()=>{
      getBoxChat();
    },[])
  )

  const getBoxChat = () => {
    setRefreshing(true);
    authAxios
    .get("/box-chats")
    .then((res) => {
      const resObj = res.data;
      setBoxChats(resObj.data);
      // setIsLoading(false);
      setRefreshing(false);
    })
    .catch((err) => {
      console.log(err.response.data);
      setBoxChats([]);
      // setIsLoading(false);
      setRefreshing(false);
    });
  }

  return (
    <View style={style.default}>
      {/* {isLoading ? <LoadingScreen /> : null}
      <View style={style.TextInputView}>
        <TextInput style={style.textInput} placeholder="Search" />
      </View> */}
      <ScrollView 
        contentContainerStyle={style.content}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }
      >
        {boxChats.map((box_chat, idx) => (<MessageItem key={idx} navigation={navigation} data={box_chat} />))}
      </ScrollView>
    </View>
  );
};
export default MessageTab;
