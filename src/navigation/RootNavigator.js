import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "~screens/Home/HomeScreen";
import AccountNavigator from "./AccountNavigator";
import HistoryNavigator from "./HistoryNavigator";
import OrderNavigator from "./OrderNavigator";
import MessageNavigator from "./MessageNavigator"
import { HomeIcon, OrderIcon, UserIcon, MessageIcon, ClockIcon} from "~components/Icons";

const TAB_NAV = createBottomTabNavigator();

const RootComponent = () => {
  const sizeIcon = "md";

  return (
    <TAB_NAV.Navigator 
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true
      }}
      initialRouteName = "Trang chủ"
    >
      <TAB_NAV.Screen 
        name="Trang chủ" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ focused, color, size }) => {
            if(focused){
              color = "BackgroundBlue";
            }else{
              color = "Gray.6";
            }
            return <HomeIcon color={color} size={sizeIcon} />
          },
        }}
      />
      <TAB_NAV.Screen 
        name="Đơn hàng của tôi" 
        component={OrderNavigator} 
        options={{
          tabBarLabel: 'Đơn hàng của tôi',
          tabBarIcon: ({ focused, color, size }) => {
            if(focused){
              color = "BackgroundBlue";
            }else{
              color = "Gray.6";
            }
            return <OrderIcon color={color} size={sizeIcon} />
          },
        }}
      />
      <TAB_NAV.Screen 
        name="Lịch sử" 
        component={HistoryNavigator} 
        options={{
          tabBarLabel: 'Lịch sử',
          tabBarIcon: ({ focused, color, size }) => {
            if(focused){
              color = "BackgroundBlue";
            }else{
              color = "Gray.6";
            }
            return <ClockIcon color={color} size={sizeIcon} />
          },
        }}
      />
      <TAB_NAV.Screen 
        name="Tin nhắn" 
        component={MessageNavigator} 
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: ({ focused, color, size }) => {
            if(focused){
              color = "BackgroundBlue";
            }else{
              color = "Gray.6";
            }
            return <MessageIcon color={color} size={sizeIcon} />
          },
        }}
      />
      <TAB_NAV.Screen 
        name="Tài khoản" 
        component={AccountNavigator} 
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ focused, color, size }) => {
            if(focused){
              color = "BackgroundBlue";
            }else{
              color = "Gray.6";
            }
            return <UserIcon color={color} size={sizeIcon} />
          },
        }}
      />
    </TAB_NAV.Navigator>
  );
};

export default RootComponent;
