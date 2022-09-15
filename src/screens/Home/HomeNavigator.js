import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import NowTab from './NowTab';
import TimeTab from './TimeTab';

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = () => {
    return ( 
        <Tab.Navigator>
            <Tab.Screen name='Tức thì' component={NowTab}></Tab.Screen>
            <Tab.Screen name='Theo giờ' component={TimeTab}></Tab.Screen>
        </Tab.Navigator>
     );
}
export default HomeNavigator;