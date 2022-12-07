import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import NotificationItem from "~components/NotificationItem";
import SOCKET_ACT from "~constants/socket_contant";
import { AuthContext } from "~contexts/AuthContext";
import useAxios from "~hooks/useAxios";
import useSocket from "~hooks/useSocket";
import useThemeStyles from "~hooks/useThemeStyles";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingTop: 5,
      flexDirection: "column",
      justifyContent: "center",
    },
    content: {
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
    },
  });

const NotificationTab = ({navigation}) => {
  const style = useThemeStyles(styles);
  const {authState} = useContext(AuthContext);
  const { authAxios } = useAxios();
  const [notifications, setNotifications] = useState([]);
  const { socket } = useSocket();
  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    const listener = (msg) => {
      console.log(msg.user_ids)
      // const data = JSON.parse(msg);
      const user_id = authState.user.id;
      if (msg.user_ids.includes(user_id)) {
        getNotification();
      }
    } 
    socket.on(SOCKET_ACT.NEW_NOTIFICATION, listener);
    return () => socket.off(SOCKET_ACT)
  },[socket])

  const getNotification = () => {
    authAxios
      .get("notifications").then((res)=>{
        setNotifications(res.data.data);
      }).catch((err)=>{
        console.log(err);
      })
  };

  return (
    <View style={style.default}>
      <ScrollView contentContainerStyle={style.content}>
        {
          notifications.map((noti, idx)=>{
            return <NotificationItem key={idx} data={noti}/>
          })
        }
      </ScrollView>
    </View>
  );
};
export default NotificationTab;
