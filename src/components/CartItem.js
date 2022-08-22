import React, { useState } from 'react'
import { View, StyleSheet } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import AvatarComponent from './AvatarComponent';

const styles = (theme) => StyleSheet.create({
    default: {
        width: "100%",
        height: 80,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    avatarStyle: {
        default: {
            width: 60,
            height: 60,
            borderRadius: 50,
            borderWidth: 1,      
            backgroundColor: "grey",
        },
    },
    infoView: {
        width: "50%",
        height: 80,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginLeft: 5
    },
})

const rightInfoStyle1 = (theme) => StyleSheet.create({
    default:{
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
    }
});
const RightInfoCartItem1 = () => {
    const rightStyle = useThemeStyles(rightInfoStyle1);

    return (
        <View style={rightStyle.default}>
            <Typography variant="TextBold">Waiting ...</Typography>
            <Typography variant="TextBold">300.000 VNĐ</Typography>
        </View>
    );
}

const rightInfoStyle2 = (theme) => StyleSheet.create({
    default:{
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    viewItem1:{
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewItem2:{
        flex:1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarSmallStyle: {
        default: {
            width: 25,
            height: 25,
            borderRadius: 50,
            borderWidth: 1,      
            backgroundColor: "red",
        },
    },
});
const RightInfoCartItem2 = () => {
    const rightStyle = useThemeStyles(rightInfoStyle2);

    return (
        <View style={rightStyle.default}>
            <View style={rightStyle.viewItem1}>
                <Typography variant="TextBold">Thái Duy Vũ</Typography>
                <AvatarComponent style={rightStyle.avatarSmallStyle} />
            </View>
            <View style={rightStyle.viewItem2} >
                <Typography variant="TextBold">300.000 VNĐ</Typography>
            </View>
        </View>
    );
}

const rightInfoStyle3 = (theme) => StyleSheet.create({
    default:{
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    viewItem1:{
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewItem2:{
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarSmallStyle: {
        default: {
            width: 25,
            height: 25,
            borderRadius: 50,
            borderWidth: 1,      
            backgroundColor: "red",
        },
    },
});
const RightInfoCartItem3 = () => {
    const rightStyle = useThemeStyles(rightInfoStyle3);

    return (
        <View style={rightStyle.default}>
            <View style={rightStyle.viewItem1}>
                <Typography variant="TextBold">Thái Duy Vũ</Typography>
                <AvatarComponent style={rightStyle.avatarSmallStyle} />
            </View>
            <View style={rightStyle.viewItem2} >
                <Typography variant="TextBold">300.000 VNĐ</Typography>
                <Typography variant="MiniDescription">VNPAY</Typography>
            </View>
        </View>
    );
}

const rightInfoStyle4 = (theme) => StyleSheet.create({
    default:{
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    viewItem1:{
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewItem2:{
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarSmallStyle: {
        default: {
            width: 25,
            height: 25,
            borderRadius: 50,
            borderWidth: 1,      
            backgroundColor: "red",
        },
    },
});
const RightInfoCartItem4 = () => {
    const rightStyle = useThemeStyles(rightInfoStyle4);

    return (
        <View style={rightStyle.default}>
            <View style={rightStyle.viewItem1}>
                <Typography variant="TextBold">Thái Duy Vũ</Typography>
                <AvatarComponent style={rightStyle.avatarSmallStyle} />
            </View>
            <View style={rightStyle.viewItem2} >
                <Typography variant="Description" style={{color: "red"}}>Đàm phán giá không thành công</Typography>
            </View>
        </View>
    );
}

const setRightItem = (type) => {
    if(type === 1){
        return <RightInfoCartItem1 />
    }else if(type === 2){
        return <RightInfoCartItem2 />
    }else if(type === 3){
        return <RightInfoCartItem3 />
    }else if(type === 4){
        return <RightInfoCartItem4 />
    }else{
        return null;
    }
}

const CartItem = (props) => {
    const style = useThemeStyles(styles);
    const type = props.type;

    return ( 
        <View style={style.default}>
            <AvatarComponent style = {style.avatarStyle} />
            <View style={style.infoView}>
                <Typography variant="Text">Giúp việc tức thì</Typography>
                <Typography variant="MiniDescription" style={{marginLeft: 5}}>KTX khu B, Đông Hòa, Dĩ An, Bình Dương</Typography>
                <Typography variant="Description">16:30, 11/6/2022</Typography>
            </View>
            {setRightItem(type)}
        </View>
     );
}
export default CartItem;