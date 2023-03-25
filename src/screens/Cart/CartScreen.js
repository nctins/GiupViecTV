import React from 'react'
import { StyleSheet } from "react-native";
import Header from '~components/Header';
import SafeView from '~components/SafeView';
import useThemeStyles from '~hooks/useThemeStyles';
import TabNavigatorCart from './TabNavigatorCart';
import StatusBar from '~components/StatusBar';

const CartScreen = () => {
  return (
    <>
      <StatusBar />
      <SafeView>
        <Header title="Lịch hẹn" />
        <TabNavigatorCart />
      </SafeView >
    </>
  )
}
export default CartScreen