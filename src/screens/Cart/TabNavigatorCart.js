import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import CartTab1 from './CartTab1';
import CartTab2 from './CartTab2';

const Tab = createMaterialTopTabNavigator();

const TabNavigatorCart = () => {
    return ( 
        <Tab.Navigator>
            <Tab.Screen name='Hôm nay' component={CartTab1}></Tab.Screen>
            <Tab.Screen name='Tất cả' component={CartTab2}></Tab.Screen>
        </Tab.Navigator>
     );
}
export default TabNavigatorCart;