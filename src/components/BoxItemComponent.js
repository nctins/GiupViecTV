import React, { useState } from 'react'
import { View, StyleSheet,TouchableOpacity } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import Button from './Button';
import AvatarComponent from './AvatarComponent';
import { POST_TYPE } from '~constants/app_contants';

const styles = (theme) => StyleSheet.create({
    default: {
        width: "80%",
        height: 140,
        backgroundColor: "white",
        borderRadius: 15,
        flexDirection: "column",
        shadowColor: "grey",
        shadowOffset: {width: 0, height: 4},  
        shadowColor: 'black',  
        shadowOpacity: 0.25,  
        shadowRadius: 10, 
    },
    viewTitle:{
        width: "100%",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    viewContent:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    viewItem:{
        width: 90,
        flexDirection:"column",
        alignItems: "center",
        padding: 10,
    }
})

const BoxItemComponent = (props) => {
    const style = useThemeStyles(styles);
    const navigation = props.navigation;
    const onPressNow = () => {
        navigation.navigate("ServiceTab", {post_type: POST_TYPE.HOURLY});
    }
    return ( 
        <View style={style.default}>
            <View style={style.viewTitle}>
                <Typography variant="H7">Dịch vụ</Typography>
            </View> 
            <View style={style.viewContent}>
                <TouchableOpacity onPress={onPressNow}>
                    <View style={style.viewItem}>
                        <AvatarComponent size='md' type='square' />
                        <Typography variant="Description">Tìm người giúp việc</Typography>
                    </View>
                </TouchableOpacity>
            </View>          
        </View>
     );
}
export default BoxItemComponent;