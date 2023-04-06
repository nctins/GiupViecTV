import { createContext, useEffect, useState, useContext } from "react";
import useAxios from "~hooks/useAxios";
import useSocket from "~hooks/useSocket";
import { AuthContext } from "./AuthContext";
import SOCKET_ACT from "~constants/socket_contant";

const MessageModuleConext = createContext();

const {Provider} = MessageModuleConext;

const MessageModuleProvider = ({children}) => {
  const { authAxios } = useAxios();
  const { authState } = useContext(AuthContext);
  const { socket } = useSocket();
  const [has_unread_message, setHasUnreadMessage] = useState(false);
  const [has_unread_notification, setHasUnreadNotification] = useState(false);
  const user_id = authState.user.id;

  useEffect(()=>{
    checkUnreadNotification();
    checkUnreadMessage();
  },[])

  useEffect(() => {
    const listener = (msg) => {
      if (msg.user_ids.includes(user_id)) {
        setHasUnreadNotification(true);
      }
    } 
    socket.on(SOCKET_ACT.NEW_NOTIFICATION, listener);
    return () => socket.off(SOCKET_ACT.NEW_NOTIFICATION)
  },[has_unread_notification])

  useEffect(() => {
    const listener = (payload) => {
      if(payload.msg.to_user_id === user_id) {
        setHasUnreadMessage(true);
      }
    };
    // console.log(box_chat_id);
    socket.on(SOCKET_ACT.NEW_MESSAGE, listener);
    return () => socket.off(SOCKET_ACT.NEW_MESSAGE);
  },[has_unread_message])

  const checkUnreadNotification = async () => {
    try {
      const res = await authAxios.get("notifications/unread");
      const num_unread_notification = res.data.num_unread_notification;
      setHasUnreadNotification(num_unread_notification > 0);
    } catch (error) {
      console.log(error);
    }
  }

  const checkUnreadMessage = async () => {
    try {
      const res = await authAxios.get("/messages/unread");
      setHasUnreadMessage(res.data.total_unread_message > 0)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Provider value={{
      has_unread_message,
      has_unread_notification,
      setHasUnreadMessage,
      setHasUnreadNotification, 
      checkUnreadMessage,
    }}>
      {children}
    </Provider>
  )
}

export { MessageModuleProvider, MessageModuleConext };