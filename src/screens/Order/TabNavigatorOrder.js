import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import OrderTab1 from './OrderTab1';
import OrderTab2 from './OrderTab2';

const Tab = createMaterialTopTabNavigator();

const TabNavigatorCart = () => {
    return ( 
        <Tab.Navigator>
            <Tab.Screen name='Hôm nay' component={OrderTab1}></Tab.Screen>
            <Tab.Screen name='Tất cả' component={OrderTab2}></Tab.Screen>
        </Tab.Navigator>
     );
}
export default TabNavigatorCart;