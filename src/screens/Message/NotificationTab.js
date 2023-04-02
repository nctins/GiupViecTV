import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import NotificationItem from "~components/NotificationItem";
import { CheckAllIcon } from "~components/Icons";
import SOCKET_ACT from "~constants/socket_contant";
import Typography from "~components/Typography";
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
    toolbar: {
      flexDirection: "row",
      height: 30,
      justifyContent: "flex-end",
      alignItems: "center"
    }
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

  const onViewNotification = (idx) =>{
    const notification = notifications[idx];
    if (notification.is_view) {
      return;
    }
    const data = {notification_id: notification.notification_id, is_view: true};
    authAxios.put("notification", data);
    const new_notification = [...notifications];
    new_notification[idx] = {...notifications[idx], is_view: true};
    setNotifications(new_notification);
  }

  const setViewAll = () =>{
    const num_not_view = notifications.filter(noti=>!noti.is_view).length;
    if (num_not_view == 0) {
      return;
    }
    authAxios.put("/notification/set-view-all",{});
    const new_notifications = notifications.map(noti=>{
      return {
        ...noti,
        is_view: true,
      }
    })
    setNotifications(new_notifications);
  }

  return (
    <View style={style.default}>
      <Pressable style={style.toolbar} onPress={()=>setViewAll()}>
        <CheckAllIcon size={16}/>
        <Typography style={{marginLeft: 5}} variant="Description">Đánh dấu tất cả đã đọc</Typography>
      </Pressable>
      <ScrollView contentContainerStyle={style.content}>
        {
          notifications.map((noti, idx)=>{
            return <NotificationItem key={idx} data={noti} onPress={()=>onViewNotification(idx)}/>
          })
        }
        <View style={{height: 20}}></View>
      </ScrollView>
    </View>
  );
};
export default NotificationTab;
