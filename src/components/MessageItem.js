import React, { useState } from 'react'
import { View, StyleSheet } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import AvatarComponent from './AvatarComponent';

const styles = (theme) => StyleSheet.create({
    default: {
        width: "100%",
        height: 60,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
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
        height: 60,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 5,
        marginLeft: 15
    },
    rightInfoStyle:{
        flex: 1,
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "white",
    }
})

const MessageItem = (props) => {
    const style = useThemeStyles(styles);

    return ( 
        <View style={style.default}>
            <AvatarComponent style = {style.avatarStyle} />
            <View style={style.infoView}>
                <Typography variant="TextBold">Nguyễn Văn Tèo</Typography>
                <Typography variant="MiniDescription" style={{marginLeft: 0}}>Chào anh chị, em là người giúp việc nhận đơn hàng abc</Typography>
            </View>
            <View style={style.rightInfoStyle}>
            <Typography variant="Text">11/6/2022</Typography>
            </View>
        </View>
     );
}
export default MessageItem;