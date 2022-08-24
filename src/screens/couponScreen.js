import React from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar,ScrollView } from "react-native";
import CouponComponent from '~components/CouponComponent';
import Header from '~components/Header';
import useThemeStyles from '~hooks/useThemeStyles';

const styles = (theme) => StyleSheet.create({
  default:{
    flex:1,
  },
  statusBar:{
    backgroundColor: theme.colors.BackgroundBlue,
  },
  header:{
    default: {
      width: "100%",
      height: "15%" ,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    title:{
      color: "white",
    }
  },
  content:{
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  }
})

const CouponScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <SafeAreaView  style={{flex:1}}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
      <Header style={style.header} title="CouponScreen" />
      <ScrollView contentContainerStyle={style.content}>
        <CouponComponent title="Ưu đãi voucher 100.000 VNĐ" deadline="30 Thg 8, 2022"/>
        <CouponComponent title="Ưu đãi voucher 50.000 VNĐ" deadline="10 Thg 9, 2022"/>
        <CouponComponent title="Ưu đãi voucher 30% hóa đơn" deadline="20 Thg 10, 2022"/>
        <CouponComponent title="Ưu đãi voucher 30% hóa đơn" deadline="20 Thg 10, 2022"/>
      </ScrollView>
    </SafeAreaView >
  )
}
export default CouponScreen