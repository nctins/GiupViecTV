import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import ProcessNavComponent from "~components/ProcessNavComponent";
import { VNPayIcon, CashIcon } from "~components/Icons";
import Button from "~components/Button";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[1],
      flexDirection: "column",
    },
    header: {
      width: "100%",
      height: 90,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 15,
      flex: 1,
    },
    title: {
      marginLeft: 15,
      color: theme.colors.Gray[0],
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    content: {
      flex: 7,
      backgroundColor: theme.colors.Gray[0],
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 20,
    },
  });

const PaymentScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <Typography variant="H5" style={style.title}>
          Giúp việc nhà theo giờ
        </Typography>
      </View>
      <View style={{ flex: 5 }}>
        <View style={{ flex: 1, marginTop: 20 }}>
          <ProcessNavComponent />
        </View>
        <View style={style.content}>
          <ScrollView>
            <ServiceDetail />
            <PaymentMethod />
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginVertical: 30,
              }}
            >
              <Button size="sm" style={{ marginBottom: 20 }}>
                Đặt dịch vụ
              </Button>
              <Button size="sm">Quay lại</Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const ServiceDetailStyle = (theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.BackgroundBlue,
      padding: 20,
      marginHorizontal: 20,
      marginVertical: 30,
      borderRadius: 20,
    },
    spaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: 10,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[0],
    },
    info: {
      paddingVertical: 5,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[0],
    },
    detail: {
      paddingVertical: 5,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[0],
    },
    coupon: {
      paddingVertical: 5,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[0],
    },
    total: {
      paddingVertical: 5,
    },
  });

const ServiceDetail = () => {
  const style = useThemeStyles(ServiceDetailStyle);

  return (
    <View style={style.wrapper}>
      <View style={style.header}>
        <Typography variant="Subtitle" color="Gray.0">
          Thông tin dịch vụ
        </Typography>
      </View>
      <View style={style.info}>
        <Typography variant="Description" color="Gray.0">
          Khách hàng: Nguyễn Công Tín
        </Typography>
        <Typography variant="Description" color="Gray.0">
          Địa chỉ: KTX Khu B đại học Quốc Gia, Đông Hòa, Dĩ An, Bình Dương
        </Typography>
        <Typography variant="Description" color="Gray.0">
          Số điện thoại: 0985764332
        </Typography>
      </View>
      <View style={style.detail}>
        <View style={style.spaceBetween}>
          <Typography variant="MiniDescription" color="Gray.0">
            Dịch vụ
          </Typography>
          <Typography variant="MiniDescription" color="Gray.0">
            Số tiền
          </Typography>
        </View>
        <View style={style.spaceBetween}>
          <Typography variant="Description" color="Gray.0">
            Dọn phòng khách
          </Typography>
          <Typography variant="Description" color="Gray.0">
            250.000 vnđ
          </Typography>
        </View>
        <View style={style.spaceBetween}>
          <Typography variant="Description" color="Gray.0">
            Dọn phòng bếp
          </Typography>
          <Typography variant="Description" color="Gray.0">
            200.000 vnđ
          </Typography>
        </View>
        <View style={style.spaceBetween}>
          <Typography variant="Description" color="Gray.0">
            Lau dọn bàn ghế
          </Typography>
          <Typography variant="Description" color="Gray.0">
            30.000 vnđ
          </Typography>
        </View>
        <View style={style.spaceBetween}>
          <Typography variant="Description" color="Gray.0">
            Rửa chén
          </Typography>
          <Typography variant="Description" color="Gray.0">
            30.000 vnđ
          </Typography>
        </View>
      </View>
      <View style={style.coupon}>
        <View style={style.spaceBetween}>
          <Typography variant="Description" color="Gray.0">
            Ưu đãi
          </Typography>
          <Typography variant="Description" color="Gray.0">
            Chọn hoặc nhập mã {">"}
          </Typography>
        </View>
      </View>
      <View style={style.total}>
        <View style={style.spaceBetween}>
          <Typography variant="Description" color="Gray.0">
            Tổng cộng
          </Typography>
          <Typography variant="Description" color="Gray.0">
            460.000 vnđ
          </Typography>
        </View>
      </View>
    </View>
  );
};

const PaymentMethodStyle = (theme) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: 10,
    },
    option: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    itemShape: {
      width: 125,
      height: 45,
      borderRadius: 5,
      backgroundColor: theme.colors.Gray[1],
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      ...theme.shadow,
    },
    disableItem: {
      borderWidth: 1,
      borderColor: theme.colors.Gray[1],
    },
    enableItem: {
      borderWidth: 1,
      borderColor: theme.colors.BackgroundBlue,
    },
  });
const PaymentMethod = () => {
  const style = useThemeStyles(PaymentMethodStyle);
  return (
    <View style={style.wrapper}>
      <Typography variant="Description">Phương thức thanh toán:</Typography>
      <View style={style.option}>
        <TouchableOpacity
          style={[style.enableItem, style.itemShape]}
          activeOpacity={1}
        >
          <CashIcon />
          <Typography variant="MiniDescription" style={{ width: 60 }}>
            Thanh toán bằng tiền mặt
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.disableItem, style.itemShape]}
          activeOpacity={1}
        >
          <VNPayIcon />
          <Typography
            variant="MiniDescription"
            color="Gray.4"
            style={{ width: 60 }}
          >
            Thanh toán bằng VNPay
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;
