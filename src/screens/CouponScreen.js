import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar,ScrollView,TextInput,RefreshControl } from "react-native";
import Button from '~components/Button';
import CouponComponent from '~components/CouponComponent';
import Header from '~components/Header';
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
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
  viewMessage:{
    backgroundColor: "white",
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

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CouponScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const [voucherCode, setVoucherCode] = useState("");
  const [vouchers,setVouchers] = useState([]);
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      setMessage("");
      getCoupon();
    });
  }, []);

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
      return <CouponComponent key={index} voucher_info={e} navigation={navigation} title={limitLengthName(e.voucher_name)} deadline={e.end_date.substring(0,10)} />
    })
  }

  const onPressGetCoupon = () => {
    authAxios
      .get("http://10.0.2.2:6969/voucher/customer/" + voucherCode)
      .then(async (response) => {
        // setVouchers(response.data.data);
        console.log("successful!");
        console.log(response.data);
        setMessage(response.data.data);
        getCoupon();
      })
      .catch(async (error) => {
        if (error.response) {
          console.log("error!");
          console.log(error.response.data);
          setMessage(error.response.data.msg);
        }
      });
  }

  const displayMessage = () => {
    if(message && message.length > 0){
      return (
        <View style={style.viewMessage}>
          <Typography variant="Text" style={{ alignSelf: "center" }}>
          {message}
          </Typography>
        </View>
      )
    }else{
      return <View></View>
    }
  }

  return (
    <SafeAreaView  style={{flex:1}}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
      <Header style={style.header} title="CouponScreen" />
      <View style={{flexDirection:"column"}}>
        <View style={style.viewInput}>
          <TextInput 
            style={style.textInput}
            placeholder="Nhập mã ưu đãi"
            value={voucherCode}
            onChangeText={(text) => {setVoucherCode(text)}}
          />
          <Button style = {style.button} radius={5} onPress={onPressGetCoupon}>Áp dụng</Button>
        </View>
        {displayMessage()}
      </View>
      <ScrollView 
        contentContainerStyle={style.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {displayListCoupon()}
      </ScrollView>
    </SafeAreaView >
  )
}
export default CouponScreen