import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { API_URL } from "~constants/api";
import { AuthContext } from "./AuthContext";

const SocketContext = createContext();
const { Provider } = SocketContext;

const SocketProvider = ({ children }) => {

  const authContext = useContext(AuthContext)
  const [socket, setSocket] = useState({});
  const authState = authContext.authState;
  useEffect(()=>{
    const socketio = io(API_URL, {
      extraHeaders: {
        "x-access-token": authState.token,
      },
    });
    setSocket(socketio)
  },[authState]);

  return (
    <Provider
      value={{
        socket,
      }}
    >
      {children}
    </Provider>
  );
};

export { SocketContext, SocketProvider };
