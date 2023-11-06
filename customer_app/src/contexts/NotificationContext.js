import { createContext, useEffect, useState } from "react";
import Notifications from "~utils/Notification";
import * as SecureStore from "expo-secure-store";

const NotificationContext = createContext();

const {Provider} = NotificationContext;

const NotifcationProvider = ({children}) => {
    const [isShowNotification, setIsShowNotification] = useState(true);
    const [notificationToken, setNotificationToken] = useState("");
   
    const toggleShowNotificaion = () => {
        setIsShowNotification(!isShowNotification);
    }

    useEffect(()=>{
        const getToken = async () => {
            const token = await Notifications.registerForPushNotifications();
            setNotificationToken(token.substring(18,40)); //ExponentPushToken[${token}]
        };
        getToken();
    },[])

    useEffect(()=>{
        Notifications.setNotificationHandler(isShowNotification);
    },[isShowNotification]);

    return <Provider
        value={{
            isShowNotification,
            toggleShowNotificaion,
            notificationToken
        }}
    >{children}</Provider>
}

export { NotifcationProvider, NotificationContext };