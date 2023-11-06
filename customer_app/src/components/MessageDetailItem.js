import React, { useState } from 'react'
import { View, StyleSheet } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";

const styles = (theme) => StyleSheet.create({
    defaultLeft: {
        width: "100%",
        marginVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: "flex-start",
    },
    defaultRight: {
        width: "100%",
        marginVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: "flex-end",
    },
    leftContent: {
        width: "60%",
        backgroundColor: theme.colors.Gray[0],
        borderRadius: 10,
        borderTopLeftRadius: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    rightContent: {
        width: "60%",
        backgroundColor: theme.colors.BackgroundBlue,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    leftText: {},
    rightText: {
        backgroundColor: theme.colors.BackgroundBlue,
        color: theme.colors.Gray[0]
    },
})

const MessageDetailItem = (props) => {
    const style = useThemeStyles(styles);

    return ( 
        <View style={props.isMySelf ? style.defaultRight : style.defaultLeft}>
            <View style={props.isMySelf ? style.rightContent : style.leftContent}>
                <Typography style={props.isMySelf ? style.rightText : style.leftText} variant="Text">
                    {props.content}
                </Typography>
            </View>
        </View>
     );
}
export default MessageDetailItem;