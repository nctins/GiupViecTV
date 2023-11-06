import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "~screens/Home/HomeScreen";
import AccountNavigator from "./AccountNavigator";
import HistoryNavigator from "./HistoryNavigator";
import OrderNavigator from "./OrderNavigator";
import MessageNavigator from "./MessageNavigator"
import { HomeIcon, OrderIcon, UserIcon, MessageIcon, ClockIcon} from "~components/Icons";
import HomeNavigator from "./HomeNavigator";
import { AuthContext } from "~contexts/AuthContext";
import Toast from "~utils/Toast";
import { View, StyleSheet } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import useMessageModuleContext from "~hooks/useMessageModuleContext";
import { MessageModuleProvider } from "~contexts/MessageModuleContext";

const {Navigator, Screen} = createBottomTabNavigator();
const screenOptions = { headerShown: false, unmountOnBlur: true };
const sizeIcon = "md";

const tabBarIcon =  ({ focused, color, size }, Icon) => {
  color = focused ? "BackgroundBlue" : "Gray.6";
  return <Icon color={color} size={sizeIcon} />
}

const tabBarIconWithDot = ({ focused, color, size }, Icon, dotVisiable)=>{
  color = focused ? "BackgroundBlue" : "Gray.6";
  const style = useThemeStyles(iconWithDotStyle);
  return (
    <View style={style.wrapper}>
      <Icon color={color} size={sizeIcon} />
      {dotVisiable && <View style={style.dot}/>}
    </View>
  )
}

const RootComponent = ({ navigation }) => {
  
  const {authState, logout} = useContext(AuthContext);
  useEffect(()=>{
    if (!authState.authenticated) {
      Toast.createToast("Phiên đăng nhập đã hết hạn");
      logout();
      navigation.navigate('StartScreen');
    }
  },[authState])

  return (
    <MessageModuleProvider>
      <BottomTab/>
    </MessageModuleProvider>
  )
};

const BottomTab = () => {
  const {has_unread_message, has_unread_notification} = useMessageModuleContext();
  return (
    <Navigator screenOptions={screenOptions} initialRouteName = "Trang chủ">
      <Screen 
        name="Trang chủ" 
        component={HomeNavigator} 
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: (opt) => tabBarIcon(opt, HomeIcon),
        }}
      />
      <Screen 
        name="Lịch hẹn" 
        component={OrderNavigator} 
        options={{
          tabBarLabel: 'Lịch hẹn',
          tabBarIcon: (opt) => tabBarIcon(opt, OrderIcon),
        }}
      />
      <Screen 
        name="Lịch sử" 
        component={HistoryNavigator} 
        options={{
          tabBarLabel: 'Lịch sử',
          tabBarIcon: (opt) => tabBarIcon(opt, ClockIcon),
        }}
      />
      <Screen 
        name="Tin nhắn" 
        component={MessageNavigator} 
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: (opt) => tabBarIconWithDot(opt, MessageIcon, has_unread_message || has_unread_notification),
        }}
      />
      <Screen 
        name="Tài khoản" 
        component={AccountNavigator} 
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: (opt) => tabBarIcon(opt, UserIcon),
        }}
      />
    </Navigator>
  );
}

const iconWithDotStyle = (theme) => StyleSheet.create({
  wrapper: {
    // backgroundColor:"red",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dot: {
    backgroundColor: theme.colors.StrawberryRed,
    height: 8,
    width: 8,
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 100,
  },
})

export default RootComponent;
