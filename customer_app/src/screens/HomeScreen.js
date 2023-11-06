import React, { useState, useEffect, useContext  } from 'react'
import { StyleSheet, View, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import useThemeStyles from '~hooks/useThemeStyles';
import { BgImageLayout } from '~components/Layout';
import {HOME_BG} from 'assets/images';
import AvatarComponent from '~components/AvatarComponent';
import Typography from "~components/Typography";
import BoxItemComponent from '~components/BoxItemComponent';
import CouponComponent from '~components/CouponComponent';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import {DEFAULT_IMAGE_ERROR} from '../constants/app_contants';
import SafeView from '~components/SafeView';
import StatusBar from '~components/StatusBar';
import { BackgroundBlue } from '~constants/colors';

const styles = (theme) => StyleSheet.create({
  hiUserView:{
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatar: {
    borderWidth: 2,
    borderColor: theme.colors.FrostySkies,
    borderRadius: 100,
  },
  nameAndAddressView:{
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
    height: 200,
    marginTop: 20,
    // flexDirection: "column",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: BackgroundBlue
  },
  couponView:{
    width: "100%",
    height: 230,
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
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 5,
    // backgroundColor: "red"
  },
  couponItemStyle:{
    width: 300,
    marginRight: 10,
  }
})

const HomeScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const user = authContext.authState.user;
  const [vouchers,setVouchers] = useState([]);
  const [adss,setadss] = useState([]);
  const [imagesAds,setImagesAds] = useState([]);

  useEffect(() => {
    getCoupon();
    getAdss();
  },[])

  const getCoupon = async () => {
    authAxios
      .get("customer/" + user.id + "/vouchers")
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

  const getAdss = async () => {
    authAxios
      .post("advertisements")
      .then(async (response) => {
        let data = response.data.data;
        if(Array.isArray(data) && data.length > 0){
          setadss(data);
          let images = [];
          images = data.map((ads) => {
            if(!ads.poster_path){
              ads.poster_path = DEFAULT_IMAGE_ERROR;
            }
            return ads.poster_path;
          })
          setImagesAds(images);
        }else{
          console.log("Không có quảng cáo nào")
        }
        
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
      return (
        <CouponComponent 
          key={index} 
          isHome={true} 
          containerStyle={style.couponItemStyle} 
          voucher_info={e} 
          navigation={navigation} 
          title={limitLengthName(e.voucher_name)} 
          deadline={e.end_date.substring(0,10)} />
      )
    })
  }

  return (
    <BgImageLayout background={HOME_BG}>
      <StatusBar />
      <SafeView>
        <ScrollView>
          <View style={style.hiUserView}>
            <AvatarComponent img={user.avatar_url} size='lg' containerAvatarStyle={style.avatar} />
            <View style={style.nameAndAddressView}>
              <Typography color='Gray.0' variant="H7">Xin chào, {user.name}</Typography>
              <Typography color='Gray.0' variant="Text" style={{marginLeft: 0}}>{user.email}</Typography>
              <Typography color='Gray.0' variant="Text" style={{marginLeft: 0}}>{user.phone}</Typography>
            </View>
          </View>
          <View style={style.ItemView} >
            <BoxItemComponent navigation={navigation} />
          </View>
          <View style={style.AdsView} >
            <SliderBox
              images={imagesAds}
              onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
              autoplay={true}
              circleLoop={true}
              autoplayInterval={5000}
              sliderBoxHeight={200}
            />
          </View>
          <View style={style.couponView} >
            <View style={style.couponTittleView}>
              {vouchers && vouchers.length > 0 ? <Typography variant="H7">Ưu đãi</Typography> : null}
            </View> 
            <ScrollView horizontal={true} style={style.couponContentView}>
              {displayListCoupon()}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeView>
    </BgImageLayout>
  )
}
export default HomeScreen