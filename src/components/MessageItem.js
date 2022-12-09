import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import AvatarComponent from "./AvatarComponent";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      width: "100%",
      height: 60,
      backgroundColor: theme.colors.Gray[0],
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    infoView: {
      width: "50%",
      height: 60,
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

  const onPressMessageBox = () => {
    navigation.navigate({
      name: "MessageDetail",
      params: { box_chat_id: data.box_chat_id, sender: data.sender, avatar_url: data.avatar_url},
    });
  };

  const date_time = new Date(data.date_time);

  return (
    <TouchableOpacity onPress={onPressMessageBox}>
      <View style={style.default}>
        <AvatarComponent
          containerAvatarStyle={{}}
          avatarStyle={{}}
          img={data.avatar_url}
          size={"lg"}
          style={"circle"}
        />
        <View style={style.infoView}>
          <Typography variant="TextBold">{data.sender}</Typography>
          <Typography variant="MiniDescription" style={{ marginLeft: 0 }}>
            {data.last_msg}
          </Typography>
        </View>
        <View style={style.rightInfoStyle}>
          <Typography variant="Text">{`${date_time.getDate()}/${date_time.getMonth()}/${date_time.getFullYear()}`}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MessageItem;
