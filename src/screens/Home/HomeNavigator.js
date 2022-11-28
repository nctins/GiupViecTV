import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from "react-native";
import React from 'react'
import NowTab from './NowTab';
import TimeTab from './TimeTab';
import useThemeStyles from '~hooks/useThemeStyles';
import { NowIcon, TimeIcon } from '~components/Icons';

const Tab = createMaterialTopTabNavigator();

const styles = (theme) => StyleSheet.create({
    headerBarStyle:{
        backgroundColor: theme.colors.BackgroundBlue,
    },
    container:{
        justifyContent: 'space-around',
        padding: 10,
    },
    item:{
        width: 70, 
        height: 70,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: theme.colors.Gray[1],
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    labelStyle:{
        actionColor: theme.colors.BackgroundBlue,
        notActionColor: theme.colors.Gray[3],
    }
})
const HomeNavigator = () => {
    const style = useThemeStyles(styles);
    
    return ( 
        <Tab.Navigator screenOptions={{
            tabBarItemStyle: style.item,
            tabBarStyle: style.headerBarStyle,
            tabBarContentContainerStyle: style.container,
            tabBarActiveTintColor: style.labelStyle.actionColor,
            tabBarInactiveTintColor: style.labelStyle.notActionColor,
            tabBarIndicatorStyle: {opacity:0}
        }}>
            <Tab.Screen 
                name='Tức thì' 
                component={NowTab}
                options={{
                    tabBarLabel: 'Tức thì',
                    tabBarIcon: ({ focused, color, size }) => {
                      if(focused){
                        color = "BackgroundBlue";
                      }else{
                        color = "Gray.6";
                      }
                      return <NowIcon color={color} size="md" />
                    },
                }}
            />
            <Tab.Screen 
                name='Theo giờ' 
                component={TimeTab}
                options={{
                    tabBarLabel: 'Theo giờ',
                    tabBarIcon: ({ focused, color, size }) => {
                      if(focused){
                        color = "BackgroundBlue";
                      }else{
                        color = "Gray.6";
                      }
                      return <TimeIcon color={color} size="md" />
                    },
                }}
            />
        </Tab.Navigator>
     );
}
export default HomeNavigator;