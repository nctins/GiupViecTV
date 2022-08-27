import React from 'react'
import { StyleSheet, View, ScrollView,TextInput } from "react-native";
import AvatarComponent from '~components/AvatarComponent';
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import MessageDetailItem from '~components/MessageDetailItem';
import { BackIcon, SendIcon } from '~components/Icons';

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center"
  },
  header:{
    width: "100%",
    height: 90,
    backgroundColor: theme.colors.BackgroundBlue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title:{
    marginLeft: 15,
    color: "white",
  },
  content:{
    flex: 1,
    backgroundColor: theme.colors.Gray[1],
  },
  TextInputView: {
    width: "100%",
    height: 90,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "white",
  },
  textInput: {
    width: "70%",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: theme.colors.Gray[1],
    marginTop: 10,
    marginBottom: 10,
  },
})

const MessageDetail = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
        <View style={style.header}>
            <BackIcon color='white' />
            <AvatarComponent containerAvatarStyle={{marginLeft:10}} avatarStyle={{}} size={"sm"} style={"circle"}/>
            <Typography variant = "H5" style={style.title}>Thái Duy Vũ</Typography>
        </View>
        <ScrollView  contentContainerStyle={style.content}>
            <MessageDetailItem content={"Chào anh/chị em là người giúp việc chấp nhận đơn hàng của anh/chị."} isMySelf = {false} />
            <MessageDetailItem content={"Hiện giờ em đang trên đường tới không biết anh/chị có ở nhà không ạ."} isMySelf = {false} />
            <MessageDetailItem content={"Chào bạn hiện tại mình đang có nhà."} isMySelf = {true} />

        </ScrollView>
        <View style={style.TextInputView}>
            <TextInput 
            style={style.textInput}
            placeholder="Nhập tin nhắn"
            />
            <SendIcon color='blue' style={{marginLeft:15,}}/>
        </View>
      
    </View >
  )
}
export default MessageDetail