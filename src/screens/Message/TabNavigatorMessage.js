import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import MessageTab from "./MesageTab";
import NotificationTab from "./NotificationTab";

const Tab = createMaterialTopTabNavigator();

const TabNavigatorMessage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trò chuyện" component={MessageTab}></Tab.Screen>
      <Tab.Screen name="Thông báo" component={NotificationTab}></Tab.Screen>
    </Tab.Navigator>
  );
};
export default TabNavigatorMessage;
