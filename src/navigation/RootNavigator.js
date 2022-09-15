import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "~screens/Home/HomeScreen";
import CartScreen from "~screens/Cart/CartScreen";
import MessageAndNotificationScreen from "~screens/Message/MessageAndNotificationScreen";
import HistoryScreen from "~screens/History/HistoryScreen";
import AccountScreen from "~screens/Account/AccountScreen";

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
      <TAB_NAV.Screen name="Đơn hàng" component={CartScreen} />
      <TAB_NAV.Screen name="Lịch sử" component={HistoryScreen} />
      <TAB_NAV.Screen name="Tin nhắn & Thông báo" component={MessageAndNotificationScreen} />
      <TAB_NAV.Screen name="Tài khoản" component={AccountScreen} />
    </TAB_NAV.Navigator>
  );
};

export default RootComponent;
