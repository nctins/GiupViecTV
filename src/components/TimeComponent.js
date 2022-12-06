import React from 'react'
import { StyleSheet, View, ScrollView,TextInput, Pressable } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { EditIcon } from '~components/Icons';
import {POST_STATE, POST_TYPE, LIMIT_ADDRESS_LENGTH, PAYMENT_METHOD_CONDITION} from "../constants/app_contants";
import { TouchableWithoutFeedback } from 'react-native-web';


const styles = (theme) => StyleSheet.create({
    default: {
        width: "95%",
        height: 160,
		backgroundColor: theme.colors.BackgroundBlue,
		flexDirection: "column",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 5,
    },
    infoView:{
        height: 60,
        width:"100%",
        flexDirection:"column",
        justifyContent:"space-between",
        paddingVertical:5,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: "white"
    },
    workView:{
        flexGrow: 1,
        paddingVertical:5,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: "white"
    },
    totalView:{
        width: "100%",
        height: 20,
        marginTop: 5,
    },
    line1:{
    },
    line2:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column:{
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        marginRight: 20,
    },
})

const TimeComponent = (props) => {
    const style = useThemeStyles(styles);
    const order = props.order;
    const navigation = props.navigation;

    const formatAddress = () => {
        if(order.address.length > LIMIT_ADDRESS_LENGTH.LENGTH){
            return order.address.substring(0,LIMIT_ADDRESS_LENGTH.LENGTH).concat("...");
        }else{
            return order.address;
        }
    }

    const displayService = () => {
        let services_name = order.services_name;
        let lstName = [];
        while(Array.isArray(services_name) && services_name.length > 0){
            let ele = services_name.splice(0,2);
            lstName.push(ele);
        }
        return lstName.map((name,index) => {
            return (
                <View key={index} style={style.column}>
                    {name.map((ele,inx) => {return <Typography key={inx} variant="Description" color='Gray.0' style={{marginLeft: 0}}>{ele}</Typography>})}
                </View>
            )
        });
    }

  return (
    <Pressable onPress={()=>{navigation.navigate("PostDetail",{post: order})}}>
        <View style={style.default}>
            <View style={style.infoView}>
                <View style={style.line2}>
                    <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>{order.customer_name}</Typography>
                    <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>{order.time.substring(0,5)}, {order.date.substring(0,10)}</Typography>
                </View>
                <View style={style.line1}>
                    <Typography variant="Description" color='Gray.0' style={{marginLeft: 0,flexWrap: "wrap",}}>Địa chỉ: {formatAddress()}</Typography>
                </View>
            </View>
            <TouchableWithoutFeedback>
                <ScrollView horizontal={true} style={style.workView}>
                    {displayService()}
                </ScrollView>
            </TouchableWithoutFeedback>
            <View style={style.totalView}>
                <View style={style.line2}>
                    <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Tổng cộng:</Typography>
                    <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>{order.total} VNĐ</Typography>
                </View>
            </View>
        </View >
    </Pressable>
  )
}
export default TimeComponent