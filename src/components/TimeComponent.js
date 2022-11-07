import React from 'react'
import { StyleSheet, View, ScrollView,TextInput } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { EditIcon } from '~components/Icons';


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

const TimeComponent = () => {
    const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
        <View style={style.infoView}>
            <View style={style.line2}>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>Nguyễn Công Tín</Typography>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>16:00, 20/06/2022</Typography>
            </View>
            <View style={style.line1}>
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0,flexWrap: "wrap",}}>Địa chỉ: KTX Khu B đại học quốc gia, Đông Hòa, Dĩ An, Bình Dương</Typography>
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
                <Typography variant="Description" color='Gray.0' style={{marginLeft: 0}}>460.000 VNĐ</Typography>
            </View>
        </View>
    </View >
  )
}
export default TimeComponent