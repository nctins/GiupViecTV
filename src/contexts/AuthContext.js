import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    refeshToken: null,
    authenticated: null,
    user: {
      id: null,
      name: null,
      email: null
    }
  });

  const logout = async () => {
    await SecureStore.deleteItemAsync("auth_info");
    setAuthState({
      token: null,
      refeshToken: null,
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
