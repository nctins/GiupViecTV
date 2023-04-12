import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View, StyleSheet } from "react-native";
import useMessageModuleContext from "~hooks/useMessageModuleContext";
import useThemeStyles from "~hooks/useThemeStyles";
import MessageTab from "./MesageTab";
import NotificationTab from "./NotificationTab";

const {Navigator, Screen} = createMaterialTopTabNavigator();

const DOT_SIZE = 7;
const dotStyle = theme => StyleSheet.create({
  dot: {
    backgroundColor: theme.colors.StrawberryRed,
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE,
  }
})

const displayDot = () => {
  const style = useThemeStyles(dotStyle);
  return (
    <View style={style.dot}/>
  )
}

const tabBarStyle = theme => StyleSheet.create({
  tabBarItemStyle: {
    flexDirection: "row-reverse"
  },
  tabBarIconStyle: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: DOT_SIZE - 2,
    paddingTop: 2

  }
})

const TabNavigatorMessage = () => {
  const tab_bar_style = useThemeStyles(tabBarStyle);
  const { has_unread_message, has_unread_notification } = useMessageModuleContext();

  return (
    <Navigator lazy={true}>
      <Screen 
        name="Trò chuyện" 
        component={MessageTab} 
        options={{
          tabBarShowIcon:  has_unread_message,
          tabBarIcon: () => displayDot(),
          ...tab_bar_style
        }}
      />
      <Screen 
        name="Thông báo" 
        component={NotificationTab} 
        options={{
          tabBarShowIcon:  has_unread_notification,
          tabBarIcon: () => displayDot(),
          ...tab_bar_style
        }}
      />
    </Navigator>
  );
};
export default TabNavigatorMessage;
