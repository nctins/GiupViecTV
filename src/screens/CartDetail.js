import React, {useState, useEffect, useContext}  from 'react'
import { StyleSheet, View, ScrollView,StatusBar } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { BackIcon } from '~components/Icons';
import Button from '~components/Button';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import  {  POST_STATE, POST_TYPE, 
          LIMIT_ADDRESS_LENGTH, 
          PAYMENT_METHOD_CONDITION
        } 
from "../constants/app_contants";

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
  titleHeader:{
    marginLeft: 15,
    color: "white",
  },
  title:{
    color: "black",
  },
  viewContent:{
    flexGrow:1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  viewItemContent1:{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle:  'dashed',
  },
  viewItemContent2:{
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle:  'dashed',
  },
  viewButton: {
    marginTop: 20,
    flexDirection: "column",
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
    label:{
        backgroundColor: theme.colors.ShinyOrange,
        marginLeft: 20,
        paddingHorizontal: 5,
        paddingVertical:5,
        borderRadius: 7,
    }
})

const CartDetail = (props) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const navigation = props.navigation;
  const route = props.route;
  const { post } = route.params;  

  useEffect(() => {
    getPostDetail();
  },[]);

  const getPostDetail = () => {
    // authAxios
    //   .get("http://10.0.2.2:6969/posts")
    //   .then(async (response) => {
    //     let arrPost = response.data.data;
    //     arrPost = arrPost.filter(e => {
    //       return e.post_state === POST_STATE.PROCESSING
    //     })
    //     setPosts(arrPost);
    //     console.log(arrPost);
    //   })
    //   .catch(async (error) => {
    //     if (error.response) {
    //       console.log(error.response.data);
    //     }
    //   });
  }

  const displayPostState = () => {
    if(post.post_state === POST_STATE.PROCESSING){
      return POST_STATE.PROCESSING_NA;
    } else if(post.post_state === POST_STATE.INCOMPLETE){
      return POST_STATE.INCOMPLETE_NA;
    } else if(post.post_state === POST_STATE.COMPLETE){
      return POST_STATE.COMPLETE_NA;
    }else{
      return POST_STATE.CANCEL_NA;
    }
  }

  return (
    <View style={style.default}>
        <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
        <View style={style.header}>
            <BackIcon color='white' onPress={() => {navigation.navigate("CartScreen")}}/>
            <Typography variant = "H5" style={style.titleHeader}>Chi tiết đơn hàng</Typography>
        </View>
        <ScrollView style={style.viewContent}>
            <View style = {style.viewItemContent1}>
                <Typography variant = "TextBold" style={style.title}>Tình trạng đơn hàng</Typography>
                <View style={style.label}>
                    <Typography variant = "Description" style={{}}>{displayPostState()}</Typography>
                </View>
            </View>
            <View style = {[style.viewItemContent2]}>
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Typography variant = "TextBold" style={style.title}>Thông tin khách hàng</Typography>
                </View>
                <Typography variant = "Description" style={{}}>Họ và tên: Nguyễn Công Tín </Typography>
                <Typography variant = "Description" style={{}}>Địa chỉ: KTX khu B đại học quốc gia, Đông Hòa, Dĩ An, Bình Dương </Typography>
                <Typography variant = "Description" style={{}}>Thời gian: 16:00, 20/06/2022</Typography>
                <Typography variant = "Description" style={{}}>Số điện thoại: 0382445218</Typography>
            </View>
            <View style = {[style.viewItemContent2]}>
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Typography variant = "TextBold" style={style.title}>Dịch vụ</Typography>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant = "Description" style={{}}>Dọn phòng khách</Typography>
                    <Typography variant = "Description" style={{}}>250.000 VNĐ</Typography>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant = "Description" style={{}}>Dọn phòng bếp</Typography>
                    <Typography variant = "Description" style={{}}>200.000 VNĐ</Typography>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant = "Description" style={{}}>lau dọn bàn ghế</Typography>
                    <Typography variant = "Description" style={{}}>30.000 VNĐ</Typography>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant = "Description" style={{}}>Rửa chén</Typography>
                    <Typography variant = "Description" style={{}}>30.000 VNĐ</Typography>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant = "Description" style={{}}>Ưu đãi</Typography>
                    <Typography variant = "Description" style={{}}>-50.000 VNĐ</Typography>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant = "Description" style={{}}>Tổng cộng</Typography>
                    <Typography variant = "Description" style={{}}>460.000 VNĐ</Typography>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant = "Description" style={{}}>Phương thức thanh toán</Typography>
                    <Typography variant = "Description" style={{}}>Tiền mặt</Typography>
                </View>
            </View>
            <View style = {[style.viewItemContent2]}>
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Typography variant = "TextBold" style={style.title}>Thông tin người giúp việc</Typography>
                </View>
                <Typography variant = "Description" style={{}}>Họ và tên: Nguyễn Văn A </Typography>
                <Typography variant = "Description" style={{}}>Số điện thoại: 0382445218</Typography>
            </View>
            <View style={style.viewButton}>
                <Button style={style.button} >Hủy đơn hàng</Button>
            </View>
        </ScrollView>
    </View >
  )
}
export default CartDetail