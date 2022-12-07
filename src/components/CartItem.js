import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import AvatarComponent from './AvatarComponent';
import {POST_STATE, POST_TYPE, LIMIT_ADDRESS_LENGTH, PAYMENT_METHOD_CONDITION} from "../constants/app_contants";
import logoImage from '../../assets/images/icons/logo.png';

const logo = Image.resolveAssetSource(logoImage).uri;

const styles = (theme) => StyleSheet.create({
    default: {
        width: "100%",
        height: 80,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
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
const RightInfoCartItem1 = (props) => {
    const rightStyle = useThemeStyles(rightInfoStyle1);
    const post = props.post;

    return (
        <View style={rightStyle.default}>
            <Typography variant="TextBold">Waiting ...</Typography>
            <Typography variant="TextBold">{post.total} VNĐ</Typography>
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
        justifyContent: "center",
        alignItems: "center",
    },
    viewItem2:{
        flex:1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
const RightInfoCartItem2 = (props) => {
    const rightStyle = useThemeStyles(rightInfoStyle2);
    const post = props.post;

    return (
        <View style={rightStyle.default}>
            <View style={rightStyle.viewItem1}>
                <Typography variant="TextBold">{post.helper_na}</Typography>
                { /* <AvatarComponent containerAvatarStyle={{}} avatarStyle={{}} size={"ssm"} style={"circle"}/> */}
            </View>
            <View style={rightStyle.viewItem2} >
                <Typography variant="TextBold">{post.total} VNĐ</Typography>
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
        justifyContent: "center",
        alignItems: "center",
    },
    viewItem2:{
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});
const RightInfoCartItem3 = (props) => {
    const rightStyle = useThemeStyles(rightInfoStyle3);
    const post = props.post;

    const displayPaymentMethod = () => {
        if(post.payment_method === PAYMENT_METHOD_CONDITION.COD){
            return PAYMENT_METHOD_CONDITION.COD_NA;
        }else if(post.payment_method === PAYMENT_METHOD_CONDITION.VNPAY){
            return PAYMENT_METHOD_CONDITION.VNPAY_NA
        }else{
            return PAYMENT_METHOD_CONDITION.ALL_NA;
        }
    }

    return (
        <View style={rightStyle.default}>
            <View style={rightStyle.viewItem1}>
                <Typography variant="TextBold">{post.helper_na}</Typography>
                {/*<AvatarComponent containerAvatarStyle={{}} avatarStyle={{}} size={"ssm"} style={"circle"}/>*/}
            </View>
            <View style={rightStyle.viewItem2} >
                <Typography variant="TextBold">{post.total} VNĐ</Typography>
                <Typography variant="MiniDescription">{displayPaymentMethod()}</Typography>
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
        justifyContent: "center",
        alignItems: "center",
    },
    viewItem2:{
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});
const RightInfoCartItem4 = (props) => {
    const rightStyle = useThemeStyles(rightInfoStyle4);
    const post = props.post;

    const displayHelper = () => {
        if(post.helper_id && post.helper_id.length > 0){
            return (
                <View style={rightStyle.viewItem1}>
                    <Typography variant="TextBold">{post.helper_na}</Typography>
                    {/*<AvatarComponent containerAvatarStyle={{}} avatarStyle={{}} size={"ssm"} style={"circle"}/>*/}
                </View>
            )
        }
        return <View></View>
    }

    return (
        <View style={rightStyle.default}>
            {displayHelper()}
            <View style={rightStyle.viewItem2} >
                <Typography variant="Description" style={{color: "red"}}>Đàm phán giá không thành công</Typography>
            </View>
        </View>
    );
}



const CartItem = (props) => {
    const style = useThemeStyles(styles);
    // const type = props.type;
    const navigation = props.navigation;
    const post = props.post;
    const onPressCart = () => {
        console.log(post);
        navigation.navigate("CartDetail",{post:post});
    }

    const setRightItem = () => {
        if(post.post_state === POST_STATE.PROCESSING){
            return <RightInfoCartItem1 post={post} />
        }else if(post.post_state === POST_STATE.INCOMPLETE){
            return <RightInfoCartItem2 post={post} />
        }else if(post.post_state === POST_STATE.COMPLETE){
            return <RightInfoCartItem3 post={post} />
        }else{
            return <RightInfoCartItem4 post={post} />
        }
    }

    const getNamePost = () => {
        if(post.post_type === POST_TYPE.INSTANT){
            return POST_TYPE.INSTANT_NA;
        }
        return POST_TYPE.HOURLY_NA;
    }

    const formatAddress = () => {
        if(post.address.length > LIMIT_ADDRESS_LENGTH.LENGTH){
            return post.address.substring(0,LIMIT_ADDRESS_LENGTH.LENGTH).concat("...");
        }else{
            return post.address;
        }
    }
    
    return ( 
        <TouchableOpacity onPress={onPressCart}>
            <View style={style.default}>
            <AvatarComponent img={logo} containerAvatarStyle={{}} avatarStyle={{}} size={"lg"} style={"circle"}/>
                <View style={style.infoView}>
                    <Typography variant="Text">{getNamePost()}</Typography>
                    <Typography variant="MiniDescription" style={{marginLeft: 5}}>{formatAddress()}</Typography>
                    <Typography variant="Description">{post.time.substring(0,5)}, {post.date.substring(0,10)}</Typography>
                </View>
                {setRightItem()}
            </View>
        </TouchableOpacity>
     );
}
export default CartItem;