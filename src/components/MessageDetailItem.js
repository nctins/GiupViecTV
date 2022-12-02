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
    content: {
        width: "60%",
        backgroundColor: theme.colors.Gray[0],
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
})

const MessageDetailItem = (props) => {
    const style = useThemeStyles(styles);

    return ( 
        <View style={props.isMySelf ? style.defaultRight : style.defaultLeft}>
            <View style={style.content}>
                <Typography variant="Text">{props.content}</Typography>
            </View>
        </View>
     );
}
export default MessageDetailItem;