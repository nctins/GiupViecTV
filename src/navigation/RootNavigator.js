import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "~screens/Home/HomeScreen";
import AccountNavigator from "./AccountNavigator";
import HistoryNavigator from "./HistoryNavigator";
import OrderNavigator from "./OrderNavigator";
import MessageNavigator from "./MessageNavigator"

const TAB_NAV = createBottomTabNavigator();

const RootComponent = () => {
  return (
    <TAB_NAV.Navigator 
      screenOptions={{
        headerShown: false
      }}

      initialRouteName = "Trang chủ"
    >
      <TAB_NAV.Screen name="Trang chủ" component={HomeScreen} />
      <TAB_NAV.Screen name="Đơn hàng của tôi" component={OrderNavigator} />
      <TAB_NAV.Screen name="Lịch sử" component={HistoryNavigator} />
      <TAB_NAV.Screen name="Tin nhắn" component={MessageNavigator} />
      <TAB_NAV.Screen name="Tài khoản" component={AccountNavigator} />
    </TAB_NAV.Navigator>
  );
};

export default RootComponent;
