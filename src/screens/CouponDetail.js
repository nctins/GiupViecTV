import React from 'react'
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { BackIcon } from '~components/Icons';
import Button from '~components/Button';
import {DEFAULT_IMAGE_ERROR} from "../constants/app_contants";
import StatusBar from '~components/StatusBar';
import SafeView from '~components/SafeView';
import DetailHeader from '~components/DetailHeader';

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: theme.colors.Gray[1],
    flexDirection: "column",
  },
  header:{
    width: "100%",
    height: 90,
    backgroundColor: theme.colors.BackgroundBlue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title:{
    marginLeft: 15,
    color: "white",
  },
  viewMainContent:{
    width: "100%",
    height: 250,
    flexDirection: "column",
    justifyContent: "flex-end",
    // backgroundColor: "red",
  },
  image:{
    flex:1,
  },
  content:{
    width: "100%",
    height: 100,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  viewDetail:{
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    marginTop: 10,
  },
  detail: {
    flexGrow: 1,
    flexDirection:"column",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewButton: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button:{
    width:  350,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.BackgroundBlue
    },
    statusBar:{
        backgroundColor: theme.colors.BackgroundBlue,
    },
    detailHeader:{
        marginTop: 20,

    },
})

const CouponDetail = ({route,navigation}) => {
  const style = useThemeStyles(styles);
  const { voucher_info } = route.params;  

  const formatDate = (date) => {
    date = date.replace("T", " ");
    date = date.replace("Z", "");
    return date.substring(0, date.length - 4);
  }

  const getImageUrl = () => {
    if(voucher_info.voucher_url && voucher_info.voucher_url.length > 0){
      return voucher_info.voucher_url;
    }else{
      return DEFAULT_IMAGE_ERROR;
    }
  }

  return (
    <>
      <StatusBar/>
      <SafeView>
        <View style={style.default}>
            <DetailHeader navigation={navigation} title="Chi tiết quà tặng"/>
            <View style={style.viewMainContent}>
              <ImageBackground source={{uri: getImageUrl()}} resizeMode="stretch" style={style.image}>
              </ImageBackground>
            </View>
            <View style={style.viewDetail}>
                <ScrollView  contentContainerStyle={style.detail}>
                    <Typography variant = "TextBold" style={style.detailHeader}>Ưu đãi</Typography>
                    <Typography variant = "Description" style={{}}>{voucher_info.voucher_name}</Typography>
                    <Typography variant = "TextBold" style={style.detailHeader}>Có hiệu lực</Typography>
                    <Typography variant = "Description" style={{}}>{formatDate(voucher_info.start_date)} - {formatDate(voucher_info.end_date)}</Typography>
                    <Typography variant = "TextBold" style={style.detailHeader}>Phương thức thanh toán</Typography>
                    <Typography variant = "Description" style={{}}>Mọi hình thức thanh toán</Typography>
                    <Typography variant = "TextBold" style={style.detailHeader}>Điều kiện</Typography>
                    <Typography variant = "Description" style={{}}>{voucher_info.voucher_description}</Typography>
                </ScrollView>
                <View style={style.viewButton}>
                    <Button style={style.button} radius={5} onPress={() => {navigation.navigate("Trang chủ")}}>Sử dụng</Button>
                </View>
            </View>
        </View >
      </SafeView>
    </>
  )
}
export default CouponDetail