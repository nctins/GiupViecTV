import React from 'react'
import { StyleSheet, View, ScrollView,TextInput } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { EditIcon } from '~components/Icons';
import {POST_STATE, POST_TYPE, LIMIT_ADDRESS_LENGTH, PAYMENT_METHOD_CONDITION} from "../constants/app_contants";


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

  return (
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
        <ScrollView horizontal={true} style={style.workView}>
            <View style={style.column}>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Dọn phòng khách</Typography>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Lau dọn bàn ghế</Typography>
            </View>
            <View style={style.column}>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Dọn phòng bếp </Typography>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>rửa chén</Typography>
            </View>
            <View style={style.column}>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Dọn phòng bếp</Typography>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>rửa chén</Typography>
            </View>
            <View style={style.column}>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Dọn phòng bếp </Typography>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>rửa chén</Typography>
            </View>
        </ScrollView>
        <View style={style.totalView}>
            <View style={style.line2}>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Tổng cộng:</Typography>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>{order.total} VNĐ</Typography>
            </View>
        </View>
    </View >
  )
}
export default TimeComponent