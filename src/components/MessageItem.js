import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import AvatarComponent from "./AvatarComponent";
import DateFormater from "~utils/Dateformater";
import { LIMIT_MESSAGE_LENGTH } from "~constants/app_contants";

const styles = (theme) =>
  StyleSheet.create({
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
  });

const MessageItem = ({ navigation, ...props }) => {
  const style = useThemeStyles(styles);
  const data = props.data;
  const date_time = new Date(data.date_time);
  const last_msg = data.last_msg;

  const onPressMessageBox = () => {
    navigation.navigate({
      name: "MessageDetail",
      params: { box_chat_id: data.box_chat_id, sender: data.sender, avatar_url: data.avatar_url},
    });
  };

  const is_mine = () => {
    return data.from_user_id.slice(0,3) === "HEL";
  }
  const displayMsg = () => {
    const message = last_msg ? (is_mine() ? "Bạn: " : `${data.sender}: `) + last_msg : "Bạn chưa có tin nhắn nào."
    if (message.length > LIMIT_MESSAGE_LENGTH) {
      return message.slice(0, LIMIT_MESSAGE_LENGTH).concat("...");
    }
    return message;
  }

  return (
    <TouchableOpacity onPress={onPressMessageBox}>
      <View style={style.default}>
        <AvatarComponent
          containerAvatarStyle={{borderWidth: 1, borderColor: "#0062FF", borderRadius: 120}}
          avatarStyle={{}}
          img={data.avatar_url}
          size={"lg"}
          style={"circle"}
        />
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
        <Typography variant="Text">{data.date_time ? `${DateFormater(date_time)}`: ""}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MessageItem;
