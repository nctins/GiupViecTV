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
import LoadingScreen from "~screens/LoadingScreen";

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
      height: 90,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    title: {
      marginLeft: 15,
      color: theme.colors.Gray[0],
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
  const { box_chat_id, sender, avatar_url } = route.params;
  const { socket } = useContext(SocketContext);
  const { authAxios } = useContext(AxiosContext);
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoadding] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enterMsg, setEnterMsg] = useState("");
  const user_id = authState.user.id;
  let scrollView = null;
  const scrollViewRef = useRef();

  const onSendMsg = () => {
    setIsLoadding(true);
    authAxios
      .post(`/box-chat/${box_chat_id}/message`, {
        message: enterMsg,
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
  }, []);

  useEffect(() => {
    const listener = (msg) => {
      // console.log(msg);
      setMessages([...messages, msg]);
    };
    // console.log(box_chat_id);
    socket.on(box_chat_id, listener);
    return () => socket.off(box_chat_id);
  }, [messages]);

  return (
    <View style={style.default}>
      {isLoading ? <LoadingScreen /> : null}
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color="Gray.0" />
        </TouchableOpacity>
        <AvatarComponent
          containerAvatarStyle={{ marginLeft: 10 }}
          avatarStyle={{}}
          img={avatar_url}
          size={"md"}
          style={"circle"}
        />
        <Typography variant="H5" style={style.title}>
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
  );
};
export default MessageDetail;
