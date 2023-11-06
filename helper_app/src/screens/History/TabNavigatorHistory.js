import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import HistoryTab1 from './HistoryTab1';
import HistoryTab2 from './HistoryTab2';

const Tab = createMaterialTopTabNavigator();

const TabNavigatorHistory = () => {
    return ( 
        <Tab.Navigator>
            <Tab.Screen name='Đã hoàn thành' component={HistoryTab1}></Tab.Screen>
            <Tab.Screen name='Đã hủy' component={HistoryTab2}></Tab.Screen>
        </Tab.Navigator>
     );
}
export default TabNavigatorHistory;