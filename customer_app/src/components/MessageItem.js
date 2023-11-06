import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import AvatarComponent from "./AvatarComponent";
import DateFormater from "~utils/Dateformater";
import { LIMIT_MESSAGE_LENGTH } from "~constants/app_contants";
import useSocket from "~hooks/useSocket";
import SOCKET_ACT from "~constants/socket_contant";
import useMessageModuleContext from "~hooks/useMessageModuleContext";

const styles = (theme) => StyleSheet.create({
    default: {
      width: "100%",
      height: 80,
      backgroundColor: theme.colors.Gray[0],
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    infoView: {
      width: "50%",
      height: "100%",
      backgroundColor: theme.colors.Gray[0],
      flexDirection: "column",
      justifyContent: "space-between",
      paddingVertical: 5,
      marginLeft: 15,
    },
    rightInfoStyle: {
      flex: 1,
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: theme.colors.Gray[0],
    },
    avatar_wrapper: {
      width: 74,
      height: 74,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    badge: {
      position: "absolute",
      width: 15,
      height: 15,
      borderRadius: 3,
      backgroundColor: theme.colors.StrawberryRed,
      justifyContent: "center",
      alignItems: "center",
      top: 3,
      right: 3,
    },
  });

const init_message = {
  date_time: "",
  last_msg: "",
  from_user_id: "",
}

const MessageItem = ({ navigation, ...props }) => {
  const style = useThemeStyles(styles);
  const {socket} = useSocket();
  const data = props.data;

  const [message, setMessage] = useState(init_message) 

  // const date_time = new Date(data.date_time);
  // const last_msg = data.last_msg;
  const box_chat_id = data.box_chat_id;
  const [num_unread_message, setNumUnreadMessage] = useState(0);
  const { has_unread_message, setHasUnreadMessage } = useMessageModuleContext();

  useEffect(()=>{
    // setLastMsg(data.last_msg);
    setMessage({
      date_time: data.date_time ? new Date(data.date_time) : "",
      last_msg: data.last_msg,
      from_user_id: data.from_user_id,
    })
    setNumUnreadMessage(data.num_unread_message);
  },[data])

  useEffect(() => {
    // const new_num_unread_message = num_unread_message + 1;
    const listener = (payload) => {
      if(payload.box_chat_id === box_chat_id) {
        setNumUnreadMessage(val=>val+1);
        // setLastMsg(payload.msg.msg);
        setMessage({
          last_msg: payload.msg.msg,
          date_time: payload.msg.date_time ? new Date(payload.msg.date_time) : "",
          from_user_id: payload.msg.from_user_id,
        })
      }
      if(!has_unread_message) {
        setHasUnreadMessage(true);
      }
    };
    // console.log(box_chat_id);
    socket.on(SOCKET_ACT.NEW_MESSAGE_ON_LIST_ITEM, listener);
    return () => socket.off(SOCKET_ACT.NEW_MESSAGE_ON_LIST_ITEM);
  }, [message]);

  const onPressMessageBox = () => {
    navigation.navigate({
      name: "MessageDetail",
      params: { 
        box_chat_id: data.box_chat_id, 
        sender: data.sender, 
        avatar_url: data.avatar_url, 
        sender_id: data.sender_id,
        num_unread_message: data.num_unread_message
      },
    });
  };

  const is_mine = () => {
    return message.from_user_id.slice(0,3) === "CUS";
  }
  const displayMsg = () => {
    const msg = message.last_msg ? (is_mine() ? "Bạn: " : `${data.sender}: `) + message.last_msg : `Bạn và ${data.sender} chưa có tin nhắn nào.`
    if (msg.length > LIMIT_MESSAGE_LENGTH) {
      return msg.slice(0, LIMIT_MESSAGE_LENGTH).concat("...");
    }
    return msg;
  }

  return (
    <TouchableOpacity onPress={onPressMessageBox}>
      <View style={style.default}>
        <View style={style.avatar_wrapper}>
          <AvatarComponent
            containerAvatarStyle={{borderWidth: 2, borderColor: "#0062FF", borderRadius: 120}}
            avatarStyle={{}}
            img={data.avatar_url}
            size={70}
            style={"circle"}
          />
          { 
          num_unread_message > 0 && 
            <View style={style.badge}>
              <Typography variant="MiniDescription" color="Gray.0">{num_unread_message}</Typography>
            </View> 
          }
        </View>
        <View style={style.infoView}>
          <View style={{height: 25, justifyContent: "center"}}>
            <Typography variant="H7">{data.sender}</Typography>
          </View>
          <View style={{flex: 1, justifyContent:"center"}}>
            <Typography variant="Description" style={{ marginLeft: 0 }}>
              {displayMsg()}
            </Typography>
          </View>
        </View>
        <View style={style.rightInfoStyle}>
        <Typography variant="Text">{message.date_time ? `${DateFormater(message.date_time)}`: ""}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MessageItem;
