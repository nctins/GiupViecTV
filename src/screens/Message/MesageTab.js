import React, {useContext} from 'react'
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import MessageItem from '~components/MessageItem';
import useThemeStyles from '~hooks/useThemeStyles';
import { AxiosContext } from '~contexts/AxiosContext';

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    flexDirection: "column",
    justifyContent: "center"
  },
  content:{
    flexGrow:1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  TextInputView: {
    width: "100%",
    flexDirection:"row",
    justifyContent: "center"
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
})

const MessageTab = ({navigation}) => {
  const style = useThemeStyles(styles);
  const {authAxios} = useContext(AxiosContext);

  const box_chats = authAxios.get("/box-chats").then((res)=>{
    console.log(res.data);
    return res.data;
  }).catch((err)=>{
    console.log(err.response.data);
    return [];
  })


  return (
    <View style={style.default}>
      <View style={style.TextInputView}>
        <TextInput 
          style={style.textInput}
          placeholder="Search"
        />
      </View>
      <ScrollView  contentContainerStyle={style.content}>
        <MessageItem navigation={navigation} />
        <MessageItem navigation={navigation} />
      </ScrollView>
    </View >
  )
}
export default MessageTab