import React from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar,ScrollView,TextInput } from "react-native";
import Button from '~components/Button';
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
    backgroundColor: "white"
  },
  viewInput:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: "white"
  },
  textInput: {
    width: "70%",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: theme.colors.Gray[1],
    marginTop: 10,
    marginBottom: 10,
  },
  button:{
    width:  80,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.BackgroundBlue
  },
})

const CouponScreen = ({navigation}) => {
  const style = useThemeStyles(styles);

  return (
    <SafeAreaView  style={{flex:1}}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
      <Header style={style.header} title="CouponScreen" />
      <View style={style.viewInput}>
        <TextInput 
          style={style.textInput}
          placeholder="Nhập mã ưu đãi"
        />
        <Button style = {style.button} radius={5}>Áp dụng</Button>
      </View>
      <ScrollView contentContainerStyle={style.content}>
        <CouponComponent navigation={navigation} title="Ưu đãi voucher 100.000 VNĐ" deadline="30 Thg 8, 2022"/>
        <CouponComponent navigation={navigation} title="Ưu đãi voucher 50.000 VNĐ" deadline="10 Thg 9, 2022"/>
        <CouponComponent navigation={navigation} title="Ưu đãi voucher 30% hóa đơn" deadline="20 Thg 10, 2022"/>
        <CouponComponent navigation={navigation} title="Ưu đãi voucher 30% hóa đơn" deadline="20 Thg 10, 2022"/>
      </ScrollView>
    </SafeAreaView >
  )
}
export default CouponScreen