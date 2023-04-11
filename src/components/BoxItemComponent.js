import React, { useState } from 'react'
import { View, StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import Button from './Button';
import AvatarComponent from './AvatarComponent';
import { POST_TYPE } from '~constants/app_contants';

const styles = (theme) => StyleSheet.create({
    default: {
        width: "80%",
        height: 130,
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
        paddingVertical: 5,
    },
    viewItem:{
        width: 80,
        height: 80,
        flexDirection:"column",
        alignItems: "center",
        padding: 5,
        
    }
})

const BoxItemComponent = (props) => {
    const style = useThemeStyles(styles);
    const navigation = props.navigation;
    const onPressItem = (item) => {
        // console.log(item);
        navigation.navigate("ServiceTab", {post_type: POST_TYPE.HOURLY, item: item});
    }
    const lstItem = [
        {
            name: "Tìm người giúp việc",
            service_id: "0",
        },
        {
            name: "Dọn nhà bếp",
            service_id: "SER_g2pcl714l8sxxdfr",
        },
        
    ]
    return ( 
        <View style={style.default}>
            <View style={style.viewTitle}>
                <Typography variant="TitleBold">Dịch vụ</Typography>
            </View> 
            <ScrollView horizontal={true} style={style.viewContent}>
                {lstItem && lstItem.map((item) => {
                    return (
                        <TouchableOpacity onPress={() => onPressItem(item)}>
                            <View style={style.viewItem}>
                                <AvatarComponent size='md' type='square' />
                                <Typography variant="Description">{item.name}</Typography>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>          
        </View>
     );
}
export default BoxItemComponent;