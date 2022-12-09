import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import Button from './Button';

const styles = (theme) => StyleSheet.create({
    default: {
        width: "85%",
        height: 165,
        backgroundColor: theme.colors.BackgroundBlue,
        // marginTop: 10,
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden"
    },
    image:{
        flex:1,
        justifyContent: "flex-end",
        // padding: 1
    },
    viewTitle:{
        width: "100%",
        height: 65,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: "white",
        // backgroundColor: "#FFFFFF90",
    },
    title:{
        width: "60%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    viewButton:{
        width: "30%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button:{
        width:  100,
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.BackgroundBlue
    }
})

const CouponComponent = ({navigation,voucher_info, containerStyle,isHome = false,title,deadline,...props}) => {
    const style = useThemeStyles(styles);
    const onPressCoupon = () => {
        if(isHome){
            navigation.navigate("Ưu đãi");
        }else{
            navigation.navigate("CouponDetail",{
                voucher_info: voucher_info
            });
        }
    }

    return ( 
        <TouchableOpacity onPress={onPressCoupon}>
            <View style={[style.default,containerStyle]}>
            <ImageBackground source={{uri: voucher_info.voucher_url}} resizeMode="cover" style={style.image}>
                <View style={style.viewTitle}>
                    <View style={[style.title,isHome?{width:"100%"}:null]}>
                        <Typography variant="TextBold">{title}</Typography>
                        {!isHome? <Typography variant="Description" style={{}}>Hạn dùng:{deadline}</Typography>:null} 
                    </View>
                    {!isHome?<View style={style.viewButton}><Button style={style.button} radius={5} onPress={() => {navigation.navigate("Trang chủ")}}>Dùng ngay</Button></View> : null}
                </View>
            </ImageBackground>           
            </View>
        </TouchableOpacity>
     );
}
export default CouponComponent;