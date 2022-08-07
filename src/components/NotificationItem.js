import React, { useState } from 'react'
import { View, StyleSheet } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";

const styles = (theme) => StyleSheet.create({
    default: {
        width: "100%",
        height: 110,
        backgroundColor: theme.colors.DarkGray[1],
        flexDirection: "column",
        marginTop: 10,
        borderRadius: 10,
    },
    title: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderBottomColor: "white",
        borderBottomWidth: 2,
    },
    content:{
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
    }
})

const NotificationItem = (props) => {
    const style = useThemeStyles(styles);

    return ( 
        <View style={style.default}>
            <View style={style.title}>
                <View>
                    <Typography variant="Subtitle">Nguyễn Văn Tèo</Typography>
                </View>
                <View >
                    <Typography variant="MiniDescription" style={{marginLeft: 0}}>11/6/2022</Typography>
                </View>
            </View>
            <View style={style.content}>
            <Typography variant="Description">Đơn hàng giúp việc định kì của bạn đã được chấp nhận bởi Nguyễn Công Tín</Typography>
            </View>
        </View>
     );
}
export default NotificationItem;