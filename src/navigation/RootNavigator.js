import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import MessageNavigator from "./MessageNavigator";
import CouponNavigator from "./CouponNavigator";
import AccountNavigator from "./AccountNavigator";

const TAB_NAV = createBottomTabNavigator();
// const TAB_NAV = createMaterialTopTabNavigator();

const RootComponent = () => {
  return (
    <TAB_NAV.Navigator 
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      initialRouteName = "Trang chủ"
    >
      <TAB_NAV.Screen name="Trang chủ" component={HomeNavigator} />
      <TAB_NAV.Screen name="Đơn hàng" component={CartNavigator} />
      <TAB_NAV.Screen name="Tin nhắn" component={MessageNavigator} />
      <TAB_NAV.Screen name="Ưu đãi" component={CouponNavigator} />
      <TAB_NAV.Screen name="Tài khoản" component={AccountNavigator} />
    </TAB_NAV.Navigator>
  );
};

export default RootComponent;
