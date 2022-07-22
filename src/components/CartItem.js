import React from 'react'
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
        width: "55%",
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
})
const RightInfoCartItem1 = () => {
    const rightStyle = useThemeStyles(rightInfoStyle1);

    return (
        <View style={rightStyle.default}>
            <Typography variant="TextBold">Waiting ...</Typography>
            <Typography variant="TextBold">300.000 VNĐ</Typography>
        </View>
    );
}

const CartItem = (props) => {
    const style = useThemeStyles(styles);

    return ( 
        <View style={style.default}>
            <AvatarComponent style = {style.avatarStyle} />
            <View style={style.infoView}>
                <Typography variant="Text">Giúp việc tức thì</Typography>
                <Typography variant="MiniDescription" style={{marginLeft: 5}}>KTX khu B, Đông Hòa, Dĩ An, Bình Dương</Typography>
                <Typography variant="Description">16:30, 11/6/2022</Typography>
            </View>
            <RightInfoCartItem1 />
        </View>
     );
}
export default CartItem;