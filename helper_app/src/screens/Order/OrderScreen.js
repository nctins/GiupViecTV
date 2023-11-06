import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import Header from '~components/Header';
import SafeView from "~components/SafeView";
import TabNavigatorCart from './TabNavigatorOrder';
import StatusBar from "~components/StatusBar";

const OrderScreen = () => {
  console.log();
  return (
    <>
      <StatusBar/>
      <SafeView>
        <Header title="Lịch hẹn" />
        <TabNavigatorCart />
      </SafeView>
    </>
  )
}
export default OrderScreen