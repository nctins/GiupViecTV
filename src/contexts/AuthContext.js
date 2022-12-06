import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    refreshToken: null,
    authenticated: false,
    user: {
      id: null,
      name: null,
      email: null
    }
  });

  useEffect(()=>{
    const updateAuthState = async ()=>{
      let auth_info = await SecureStore.getItemAsync("auth_info")
      if (auth_info) {
        const {token, refreshToken, user} = JSON.parse(auth_info);
        setAuthState({
          token: token,
          refreshToken: refreshToken,
          authenticated: true,
          user: user,
        });
      }
    };
    updateAuthState();
  },[])

  const logout = async () => {
    await SecureStore.deleteItemAsync("auth_info");
    setAuthState({
      token: null,
      refreshToken: null,
      authenticated: false,
      user: {
        id: null,
        name: null,
        email: null
      }
    });
  };

  const getToken = () => {
    return authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        getToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider}
