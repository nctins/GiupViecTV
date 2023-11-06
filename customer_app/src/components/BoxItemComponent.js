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
            url: "https://play-lh.googleusercontent.com/FYiHY7EwFbWAQz0ZD6TE16nvySV3inupNECw2KmbCt8KOnZentLp6irf5rbEInG1jg=w240-h480-rw"
        },
        {
            name: "Dọn nhà bếp",
            service_id: "SER_g2pcl714l8sxxdfr",
            url: "https://media.istockphoto.com/id/1448081540/vi/vec-to/d%E1%BB%8Dn-d%E1%BA%B9p-nh%C3%A0-b%E1%BA%BFp-thi%E1%BA%BFt-k%E1%BA%BF-kh%C3%A1i-ni%E1%BB%87m-hi%E1%BB%87n-%C4%91%E1%BA%A1i-kh%C3%A1i-ni%E1%BB%87m-minh-h%E1%BB%8Da-vector-ch%E1%BA%A5t-l%C6%B0%E1%BB%A3ng-cao-bi%E1%BB%83u.jpg?s=1024x1024&w=is&k=20&c=kTXB_iSCN0KiV-3xKkyNUSMpLeMYrUEZucBEShAClKs="
        },
        
    ]
    return ( 
        <View style={style.default}>
            <View style={style.viewTitle}>
                <Typography variant="TitleBold">Dịch vụ</Typography>
            </View> 
            <ScrollView horizontal={true} style={style.viewContent}>
                {lstItem && lstItem.map((item, idx) => {
                    return (
                        <TouchableOpacity onPress={() => onPressItem(item)} key={idx}>
                            <View style={style.viewItem}>
                                <AvatarComponent size='md' type='square' img={item.url} />
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