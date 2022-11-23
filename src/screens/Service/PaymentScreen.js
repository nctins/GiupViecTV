import React, { useState } from "react";
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
import useServiceContext from "~hooks/useServiceContext";
import CurrencyText from "~components/CurrencyText";
import { PAYMENT_METHOD } from "~constants/app_contants";

const styles = (theme) =>
  StyleSheet.create({
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
  const { controller } = useServiceContext();

  return (
    <View style={style.content}>
      <ScrollView style={{ width: "100%" }}>
        <ServiceDetail />
        <PaymentMethod />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <Button
            size="sm"
            style={{ marginBottom: 20 }}
            onPress={() => {
              controller.createPost();
            }}
          >
            Đặt dịch vụ
          </Button>
          <Button size="sm" onPress={() => controller.backToHomeScreen()}>
            Hủy
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const ServiceDetailStyle = (theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.BackgroundBlue,
      padding: 20,
      marginHorizontal: 30,
      marginVertical: 30,
      borderRadius: 20,
      minWidth: 340,
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
  const { post } = useServiceContext();
  const { services, total, customer_name, phone_number, address } = post;

  return (
    <View style={style.wrapper}>
      <View style={style.header}>
        <Typography variant="Subtitle" color="Gray.0">
          Thông tin dịch vụ
        </Typography>
      </View>
      <View style={style.info}>
        <Typography variant="Description" color="Gray.0">
          Khách hàng: {customer_name}
        </Typography>
        <Typography variant="Description" color="Gray.0">
          Địa chỉ: {address}
        </Typography>
        <Typography variant="Description" color="Gray.0">
          Số điện thoại: {phone_number}
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
        {Object.entries(services).map(
          ([service_id, { is_select, service_init, service_value }]) => {
            if (is_select) {
              return (
                <View style={style.spaceBetween} key={service_id}>
                  <Typography variant="Description" color="Gray.0">
                    {service_init.name}
                  </Typography>
                  <CurrencyText
                    value={service_value.total}
                    variant="Description"
                    color="Gray.0"
                    currency="vnđ"
                  />
                </View>
              );
            }
          }
        )}
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
          <CurrencyText
            value={total}
            currency="vnđ"
            variant="Description"
            color="Gray.0"
          />
        </View>
      </View>
    </View>
  );
};

const PaymentMethodStyle = (theme) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: 20,
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
  const { post, setPostData } = useServiceContext();
  const { payment_method } = post;

  return (
    <View style={style.wrapper}>
      <Typography variant="Description">Phương thức thanh toán:</Typography>
      <View style={style.option}>
        <TouchableOpacity
          style={[
            payment_method == PAYMENT_METHOD.COD
              ? style.enableItem
              : style.disableItem,
            style.itemShape,
          ]}
          activeOpacity={1}
          onPress={() => {
            setPostData({ payment_method: PAYMENT_METHOD.COD });
          }}
        >
          <CashIcon />
          <Typography variant="MiniDescription" style={{ width: 60 }}>
            Thanh toán bằng tiền mặt
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            payment_method == PAYMENT_METHOD.VNPAY
              ? style.enableItem
              : style.disableItem,
            style.itemShape,
          ]}
          activeOpacity={1}
          onPress={() => {
            setPostData({ payment_method: PAYMENT_METHOD.VNPAY });
          }}
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
