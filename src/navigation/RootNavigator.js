import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "~screens/HomeScreen";
import CartScreen from "~screens/Cart/CartScreen";
import MessageScreen from "~screens/Message/MessageScreen";
import CouponScreen from "~screens/CouponScreen";
import AccountScreen from "~screens/Account/AccountScreen";

const TAB_NAV = createBottomTabNavigator();
// const TAB_NAV = createMaterialTopTabNavigator();

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
      <TAB_NAV.Screen name="Tin nhắn" component={MessageScreen} />
      <TAB_NAV.Screen name="Ưu đãi" component={CouponScreen} />
      <TAB_NAV.Screen name="Tài khoản" component={AccountScreen} />
    </TAB_NAV.Navigator>
  );
};

export default RootComponent;
