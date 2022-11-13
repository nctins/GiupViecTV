import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar,ScrollView,TextInput } from "react-native";
import Button from '~components/Button';
import CouponComponent from '~components/CouponComponent';
import Header from '~components/Header';
import useThemeStyles from '~hooks/useThemeStyles';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";

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
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const [vouchers,setVouchers] = useState([]);

  useEffect(() => {
    getCoupon();
  },[])

  const getCoupon = async () => {
    authAxios
      .get("http://10.0.2.2:6969/customer/CUS_g2pcl14wl8rlwhcv/vouchers")
      .then(async (response) => {
        setVouchers(response.data.data);
        // console.log(vouchers);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }

  const limitLengthName = (voucher_name) => {
    if(voucher_name.length > 100){
      return voucher_name.substring(0,100).concat("...");
    }else{
      return voucher_name;
    }
  }

  const displayListCoupon = () => {
    return vouchers.map((e,index) => {
      console.log(e);
      return <CouponComponent key={index} voucher_info={e} navigation={navigation} title={limitLengthName(e.voucher_name)} deadline={e.end_date.substring(0,10)} />
    })
  }

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
        {displayListCoupon()}
      </ScrollView>
    </SafeAreaView >
  )
}
export default CouponScreen