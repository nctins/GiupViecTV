import React from 'react'
import { StyleSheet, View, ScrollView,StatusBar } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { BackIcon } from '~components/Icons';
import Button from '~components/Button';

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: theme.colors.Gray[1],
    flexDirection: "column",
  },
  header:{
    width: "100%",
    height: 90,
    backgroundColor: theme.colors.BackgroundBlue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title:{
    marginLeft: 15,
    color: "white",
  },
  viewMainContent:{
    width: "100%",
    height: 250,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "red",
  },
  content:{
    width: "100%",
    height: 100,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  viewDetail:{
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    marginTop: 10,
  },
  detail: {
    width: "100%",
    height: "100%",
    flexDirection:"column",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewButton: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button:{
    width:  350,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.BackgroundBlue
    },
    statusBar:{
        backgroundColor: theme.colors.BackgroundBlue,
    },
    detailHeader:{
        marginTop: 20,

    },
})

const CouponDetail = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
        <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
        <View style={style.header}>
            <BackIcon color='white' />
            <Typography variant = "H5" style={style.title}>Chi tiết quà tặng</Typography>
        </View>
        <View style={style.viewMainContent}>
            <View style={style.content}>
                <Typography variant = "TextBold" style={style.title}>Ưu đãi voucher 100.000 VNĐ</Typography>
                <Typography variant = "Description" style={style.title}>HSD: 30/08/2022</Typography>
            </View>
        </View>
        <View style={style.viewDetail}>
            <ScrollView  contentContainerStyle={style.detail}>
                <Typography variant = "TextBold" style={style.detailHeader}>Ưu đãi</Typography>
                <Typography variant = "Description" style={{}}>Giảm ngay 100.000đ cho đơn tối thiểu 300.000đ</Typography>
                <Typography variant = "TextBold" style={style.detailHeader}>Có hiệu lực</Typography>
                <Typography variant = "Description" style={{}}>01-08-2022 00:00 - 30-8-2022 23:59</Typography>
                <Typography variant = "TextBold" style={style.detailHeader}>Phương thức thanh toán</Typography>
                <Typography variant = "Description" style={{}}>Mọi hình thức thanh toán</Typography>
                <Typography variant = "TextBold" style={style.detailHeader}>Điều kiện</Typography>
                <Typography variant = "Description" style={{}}>Giảm ngay 100.000đ cho đơn hàng tối thiểu 300.000đ. Áp dụng đến 30/08/2022. Mỗi tài khoản chỉ được sử dụng một lần duy nhất. Mã giảm giá được phát hành bởi công ty abc và sẽ không được hoàn lại với bất kỳ lý do gì.</Typography>
                <Typography variant = "TextBold" style={style.detailHeader}>Điều kiện</Typography>
                <Typography variant = "Description" style={{}}>Giảm ngay 100.000đ cho đơn hàng tối thiểu 300.000đ. Áp dụng đến 30/08/2022. Mỗi tài khoản chỉ được sử dụng một lần duy nhất. Mã giảm giá được phát hành bởi công ty abc và sẽ không được hoàn lại với bất kỳ lý do gì.</Typography>
                <Typography variant = "TextBold" style={style.detailHeader}>Điều kiện</Typography>
                <Typography variant = "Description" style={{}}>Giảm ngay 100.000đ cho đơn hàng tối thiểu 300.000đ. Áp dụng đến 30/08/2022. Mỗi tài khoản chỉ được sử dụng một lần duy nhất. Mã giảm giá được phát hành bởi công ty abc và sẽ không được hoàn lại với bất kỳ lý do gì.</Typography>
            </ScrollView>
            <View style={style.viewButton}>
                <Button style={style.button}>Sử dụng</Button>
            </View>
        </View>
    </View >
  )
}
export default CouponDetail