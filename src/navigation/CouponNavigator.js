import React, {useState, useEffect, useContext}  from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CouponScreen from '~screens/CouponScreen';
import CouponDetail from '~screens/CouponDetail';

const CouponStack = createNativeStackNavigator();

const CouponNavigator = () => {

    
    return (
        <CouponStack.Navigator initialRouteName="CouponScreen" >
            <CouponStack.Screen name="CouponScreen" component={CouponScreen} options={{ headerShown: false }} />
            <CouponStack.Screen name="CouponDetail" component={CouponDetail} options={{ headerShown: false }} />
        </CouponStack.Navigator>
    );
}
export default CouponNavigator
