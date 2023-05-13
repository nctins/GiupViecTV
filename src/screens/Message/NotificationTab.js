import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import NotificationItem from "~components/NotificationItem";
import { CheckAllIcon } from "~components/Icons";
import SOCKET_ACT from "~constants/socket_contant";
import Typography from "~components/Typography";
import { AuthContext } from "~contexts/AuthContext";
import useAxios from "~hooks/useAxios";
import useMessageModuleContext from "~hooks/useMessageModuleContext";
import useSocket from "~hooks/useSocket";
import useThemeStyles from "~hooks/useThemeStyles";
import { NOTIFICATION_MODULE, POST_STATE } from "~constants/app_contants";
import { BOTTOM_TAB_NAME, ORDER_DETAIL_SCREEN } from "~constants/screen_name";
import BottomTabNavigaton from "~utils/BottomTabNavigation";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[0],
      paddingHorizontal: 15,
      paddingTop: 5,
      flexDirection: "column",
      justifyContent: "center",
    },
    content: {
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
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
  const {setHasUnreadNotification} = useMessageModuleContext();
  
  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    const listener = (msg) => {
      // console.log(msg.user_ids)
      const user_id = authState.user.id;
      if (msg.user_ids.includes(user_id)) {
        getNotification();
      }
    } 
    socket.on(SOCKET_ACT.NEW_NOTIFICATION, listener);
    return () => socket.off(SOCKET_ACT)
  },[notifications])

  const getNotification = () => {
    authAxios
      .get("notifications").then((res)=>{
        setNotifications(res.data.data);
      }).catch((err)=>{
        console.log(err);
      })
  };


  const onPressNotificationItem = (idx) => {
    const item_data = notifications[idx];
    if (!item_data.is_view) {
      onViewNotification(idx);
    }
    onNavigate(item_data);
    return;
  }

  const onNavigate = ({notification_module, module_object_id}) => {
    switch (notification_module) {
      case NOTIFICATION_MODULE.ADVS:
        return BottomTabNavigaton({navigation, tabName: BOTTOM_TAB_NAME.HOME});

      case NOTIFICATION_MODULE.COUPON:
        return BottomTabNavigaton({navigation, tabName: BOTTOM_TAB_NAME.COUPON});

      case NOTIFICATION_MODULE.POST:
        if (!module_object_id) {
          return;
        }
        const post_detail_screen_params = {
          post: {
            post_id: module_object_id, 
          }
        };
        return BottomTabNavigaton({
          navigation,
          tabName: BOTTOM_TAB_NAME.ORDER,
          screenName: ORDER_DETAIL_SCREEN,
          screenParams: post_detail_screen_params,
        })
        
      default: // notification_module = none
        break;
    }

  }

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

    const num_not_view = new_notification.filter(noti=>!noti.is_view).length;
    console.log(num_not_view);
    console.log(new_notification);
    if (num_not_view == 0) {
      setHasUnreadNotification(false);
    }
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
    setHasUnreadNotification(false);
    setNotifications(new_notifications);
  }

  return (
    <View style={style.default}>
      <Pressable style={style.toolbar} onPress={()=>setViewAll()}>
        <CheckAllIcon size={16}/>
        <Typography style={{marginLeft: 5}} variant="Text">Đánh dấu tất cả đã đọc</Typography>
      </Pressable>
      <ScrollView contentContainerStyle={style.content}>
        {
          notifications.map((noti, idx)=>{
            return <NotificationItem key={idx} data={noti} onPress={()=>onPressNotificationItem(idx)}/>
          })
        }
        <View style={{height: 20}}></View>
      </ScrollView>
    </View>
  );
};
export default NotificationTab;
