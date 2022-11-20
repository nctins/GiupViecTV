import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { API_URL } from "~constants/api";
import { AuthContext } from "./AuthContext";

const SocketContext = createContext();
const { Provider } = SocketContext;

const SocketProvider = ({ children }) => {

  const authContext = useContext(AuthContext)
  const socket = io(API_URL, {
    extraHeaders: {
      "x-access-token": authContext.getToken(),
    },
  });

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
