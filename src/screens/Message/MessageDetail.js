import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import AvatarComponent from "~components/AvatarComponent";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import MessageDetailItem from "~components/MessageDetailItem";
import { BackIcon, SendIcon } from "~components/Icons";
import { SocketContext } from "~contexts/SocketContext";
import { AxiosContext } from "~contexts/AxiosContext";
import { AuthContext } from "~contexts/AuthContext";
import SafeView from "~components/SafeView";
import StatusBar from "~components/StatusBar";
import SOCKET_ACT from "~constants/socket_contant";
import useMessageModuleContext from "~hooks/useMessageModuleContext";
import Toast from "~utils/Toast";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[0],
      flexDirection: "column",
      justifyContent: "center",
    },
    header: {
      width: "100%",
      height: 60,
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
      flex: 1,
      backgroundColor: theme.colors.Gray[1],
    },
    TextInputView: {
      width: "100%",
      height: 90,
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
    authAxios
      .post(`/box-chat/${box_chat_id}/message`, {
        message: enterMsg,
        to_user_id: sender_id,
      })
      .then((res) => {
        const resObj = res.data;
      })
      .catch((err) => {
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
        setViewAll().then((val)=>{
          if(has_unread_message && is_mount) {
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
        setViewAll().then((val)=>{
          if (has_unread_message) {
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
    authAxios
      .get(`/box-chat/${box_chat_id}/messages`)
      .then((res) => {
        const resObj = res.data;
        setMessages([...messages, ...resObj.data]);
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessages([]);
      });
  }

  const setViewAll = () => {
    return authAxios.put(`/box-chat/${box_chat_id}/set-view-all`, {})
  }

  return (
    <>
      <StatusBar/>
      <SafeView>
        <View style={style.default}>
          <View style={style.header}>
            <BackIcon color="Gray.0" onPress={() => navigation.goBack()} size={16}/>
            <AvatarComponent
              containerAvatarStyle={{ marginLeft: 10 }}
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
              <SendIcon color="blue" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeView>
    </>
  );
};
export default MessageDetail;
