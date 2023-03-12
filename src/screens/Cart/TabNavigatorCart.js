import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import CartTab1 from './CartTab1';
import CartTab2 from './CartTab2';
import CartTab3 from './CartTab3';
import CartTab4 from './CartTab4';

const Tab = createMaterialTopTabNavigator();

const TabNavigatorCart = () => {
    return ( 
        <Tab.Navigator 
            screenOptions={{
                unmountOnBlur: true,
            }}
            lazy={true}
        >
            <Tab.Screen name='Chờ xử lý' component={CartTab1}></Tab.Screen>
            <Tab.Screen name='Chưa hoàn thành' component={CartTab2}></Tab.Screen>
            <Tab.Screen name='Đã hoàn thành' component={CartTab3}></Tab.Screen>
            <Tab.Screen name='Đã hủy' component={CartTab4}></Tab.Screen>
        </Tab.Navigator>
     );
}
export default TabNavigatorCart;