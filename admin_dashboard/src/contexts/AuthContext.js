import React, { createContext, useState } from "react";
// import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  let initState = {
    token: null,
    refreshToken: null,
    authenticated: false,
    user: {
      id: null,
      name: null,
      email: null
    }
  };
  const auth_info = sessionStorage.getItem("auth_info");
  if (auth_info) {
    const {token , refreshToken, user} = JSON.parse(auth_info);
    initState = {
      token: token,
      refreshToken: refreshToken,
      authenticated: true,
      user: user,
    };
  };
  const [authState, setAuthState] = useState(initState);

  const logout = () => {
    // await SecureStore.deleteItemAsync("auth_info");
    console.log("logout");
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
    sessionStorage.removeItem("auth_info");
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
