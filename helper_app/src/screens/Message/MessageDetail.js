import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Keyboard, Dimensions } from "react-native";
import AvatarComponent from "~components/AvatarComponent";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import MessageDetailItem from "~components/MessageDetailItem";
import { BackIcon, SendIcon } from "~components/Icons";
import { SocketContext } from "~contexts/SocketContext";
import { AxiosContext } from "~contexts/AxiosContext";
import { AuthContext } from "~contexts/AuthContext";
import LoadingScreen from "~screens/LoadingScreen";
import StatusBar from "~components/StatusBar";
import SafeView from "~components/SafeView";
import SOCKET_ACT from "~constants/socket_contant";
import useMessageModuleContext from "~hooks/useMessageModuleContext";
import Toast from "~utils/Toast";

const { width, height } = Dimensions.get("window");

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[0],
      flexDirection: "column",
      justifyContent: "center",
    },
    avatar: {
      borderWidth: 1,
      borderColor: theme.colors.FrostySkies,
      borderRadius: 100,
      marginLeft: 10,
    },
    header: {
      width: width,
      height: 60,
      position: "relative",
      top: 0,
      left: 0,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      marginLeft: 15,
      color: theme.colors.Gray[0],
      height: 30,
      paddingTop: 8,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.colors.Gray[1],
    },
    TextInputView: {
      width: width,
      height: 90,
      position: "relative",
      top: 0,
      left: 0,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.Gray[0],
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
  });

const MessageDetail = ({ navigation, route }) => {
  const style = useThemeStyles(styles);
  const { box_chat_id, sender, avatar_url, sender_id, num_unread_message } = route.params;
  const { socket } = useContext(SocketContext);
  const { authAxios } = useContext(AxiosContext);
  const { authState } = useContext(AuthContext);
  const { has_unread_message, checkUnreadMessage } = useMessageModuleContext();

  const [isLoading, setIsLoadding] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enterMsg, setEnterMsg] = useState("");
  const user_id = authState.user.id;
  let scrollView = null;
  const scrollViewRef = useRef();

  const onSendMsg = () => {
    if(!enterMsg) {
      Toast.createToast("Vui lòng nhập tin nhắn");
      Keyboard.dismiss();
      return;
    }
    setIsLoadding(true);
    authAxios
      .post(`/box-chat/${box_chat_id}/message`, {
        message: enterMsg,
        to_user_id: sender_id,
      })
      .then((res) => {
        setIsLoadding(false);
        const resObj = res.data;
      })
      .catch((err) => {
        setIsLoadding(false);
        console.log(err);
      });
    setEnterMsg("");
    Keyboard.dismiss();
  };

  // scroll to last message
  useEffect(() => {
    scrollView?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    let is_mount = true;
    if(is_mount) {
      getMessages();
      if(num_unread_message > 0) {
        setViewAll().then(val=>{
          if(has_unread_message && is_mount){
            checkUnreadMessage();
          }
        });
      }
    }
    return () => {is_mount=false;};
  }, []);

  useEffect(() => {
    const listener = (payload) => {
      if(payload.box_chat_id === box_chat_id) {
        setMessages([...messages, payload.msg]);
        setViewAll().then(val=>{
          if(has_unread_message){
            checkUnreadMessage();
          }
        });
      }
    };
    // console.log(box_chat_id);
    socket.on(SOCKET_ACT.NEW_MESSAGE_ON_MESSAGE_DETAIL, listener);
    return () => socket.off(SOCKET_ACT.NEW_MESSAGE_ON_MESSAGE_DETAIL);
  }, [messages]);

  const getMessages = () => {
    setIsLoadding(true);
    authAxios
      .get(`/box-chat/${box_chat_id}/messages`)
      .then((res) => {
        const resObj = res.data;
        setIsLoadding(false);
        setMessages([...messages, ...resObj.data]);
      })
      .catch((err) => {
        setIsLoadding(false);
        console.log(err.response.data);
        setMessages([]);
      });
  }

  const setViewAll = () => {
    return authAxios.put(`/box-chat/${box_chat_id}/set-view-all`, {})  
  }

  return (
    // <>
      // <StatusBar hidden={true}/>
      <SafeView>
      
        {isLoading ? <LoadingScreen /> : null}
        <View style={style.default}>
          <View style={style.header}>
            <BackIcon color="Gray.0" onPress={() => navigation.pop()} size={16}/>
            <AvatarComponent
              containerAvatarStyle={style.avatar}
              avatarStyle={{}}
              img={avatar_url}
              size={"md"}
              style={"circle"}
            />
          <Typography variant="H6" style={style.title}>
              {sender}
            </Typography>
          </View>
          <ScrollView
            style={style.content}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {messages.map((ele, idx) => (
              <MessageDetailItem
                key={idx}
                content={ele.msg}
                isMySelf={ele.from_user_id == user_id}
              />
            ))}
          </ScrollView>
          <View style={style.TextInputView}>
            <TextInput
              style={style.textInput}
              value={enterMsg}
              onChangeText={(text) => setEnterMsg(text)}
              placeholder="Nhập tin nhắn"
            />
            <TouchableOpacity onPress={() => onSendMsg()}>
              <SendIcon color="Azure" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          </View>
        </View>
      
      </SafeView>
    // </>
  );
};
export default MessageDetail;
