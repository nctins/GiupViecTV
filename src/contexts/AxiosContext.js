import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: `${API_URL}`,
  });

  const publicAxios = axios.create({
    baseURL: `${API_URL}`,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers["x-access-token"]) {
        config.headers["x-access-token"] = authContext.getAccessToken();
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest) => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: "POST",
      data,
      url: `${API_URL}` + "/refreshToken",
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        console.log("token is expired, refreshing token...")
        failedRequest.response.config.headers["x-access-token"] =
          tokenRefreshResponse.data.accessToken;
        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });
        await SecureStore.setItemAsync(
          "token",
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            refreshToken: authContext.authState.refreshToken,
          })
        );
        return Promise.resolve();
      })
      .catch((e) => {
        console.log("error in refresh token")
        console.log(e)
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
