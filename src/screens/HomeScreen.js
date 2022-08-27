import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar, ScrollView } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import { BgImageLayout } from '~components/Layout';
import {HOME_BG} from 'assets/images';
import AvatarComponent from '~components/AvatarComponent';
import Typography from "~components/Typography";
import BoxItemComponent from '~components/BoxItemComponent';
import CouponComponent from '~components/CouponComponent';

const styles = (theme) => StyleSheet.create({
  default:{
    flex:1,
    flexDirection: "column",
  },
  statusBar:{
    backgroundColor: theme.colors.BackgroundBlue,
  },
  hiUserView:{
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  nameAndAddressView:{
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 25,
    marginLeft: 10,
  },
  ItemView:{
    width: "100%",
    height: 140,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  AdsView:{
    width: "100%",
    height: 180,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "red"
  },
  couponView:{
    width: "100%",
    height: 250,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  couponTittleView:{
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  couponContentView:{
    flexGrow: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  couponItemStyle:{
    width: 240,
    marginRight: 10,
  }
})

const HomeScreen = () => {
  const style = useThemeStyles(styles);

  const images = useState(["https://reactnative.dev/img/tiny_logo.png"])

  return (
    <BgImageLayout background={HOME_BG}>
      <StatusBar />
      <View style={style.hiUserView}>
        <AvatarComponent size='lg' />
        <View style={style.nameAndAddressView}>
          <Typography variant="H7">Xin chào, Nguyễn Văn Tèo</Typography>
          <Typography variant="Description" style={{marginLeft: 0}}>KTX khu B, Đông Hòa, Dĩ An, Bình Dương</Typography>
        </View>
      </View>
      <View style={style.ItemView} >
        <BoxItemComponent />
      </View>
      <View style={style.AdsView} >
      </View>
      <View style={style.couponView} >
        <View style={style.couponTittleView}>
          <Typography variant="H7">Ưu đãi</Typography>
        </View> 
        <ScrollView horizontal={true} style={style.couponContentView}>
          <CouponComponent isHome={true} containerStyle={style.couponItemStyle} title = "Giảm 100k cho đơn hàng từ 500k tại ABC"/> 
          <CouponComponent isHome={true} containerStyle={style.couponItemStyle} title = "Giảm 100k cho đơn hàng từ 500k tại ABC"/> 
          <CouponComponent isHome={true} containerStyle={style.couponItemStyle} title = "Giảm 100k cho đơn hàng từ 500k tại ABC"/> 
        </ScrollView>
      </View>
    </BgImageLayout>
  )
}
export default HomeScreen