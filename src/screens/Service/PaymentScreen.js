import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import ProcessNavComponent from "~components/ProcessNavComponent";
import { VNPayIcon, CashIcon } from "~components/Icons";
import Button from "~components/Button";
import useServiceContext from "~hooks/useServiceContext";
import CurrencyText from "~components/CurrencyText";
import { PAYMENT_METHOD, VOUCHER_TYPE } from "~constants/app_contants";
import Caculator from "~utils/Caculator";
import Toast from "~utils/Toast";

const styles = (theme) =>
  StyleSheet.create({
    content: {
      flex: 7,
      backgroundColor: theme.colors.Gray[0],
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 20,
    },
    modal: {
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.Transparency,
      },
      modalView: {
        margin: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      wrapper: {
        backgroundColor: theme.colors.Gray[0],
        padding: 20,
        borderRadius: 20,
        minWidth: 340,
      },
      header: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 10,
        borderStyle: "dashed",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.Gray[4],
      },
      footer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 10,
        marginTop: 15,
      },
      acceptBtn: {
        backgroundColor: theme.colors.Azure,
        marginRight: 10,
      },
      content: {
        paddingVertical: 15,
        maxHeight: 300,
      },
      cancelBtn: {
        backgroundColor: theme.colors.AlizarinRed,
        margin: 10,
      },
    },
    voucher: {
      wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
      },
      left: {
        backgroundColor: theme.colors.Azure,
        width: 70,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
      },
      right: {
        backgroundColor: theme.colors.BackgroundBlue,
        height: 64,
        width: 200,
        padding: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      },
    },
    disable_voucher: {
      wrapper: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      },
      voucher: {
        flexDirection: "row",
        justifyContent: "center",
      },
      left: {
        backgroundColor: theme.colors.Gray[4],
        width: 70,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
      },
      right: {
        backgroundColor: theme.colors.Gray[3],
        height: 64,
        width: 200,
        padding: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      },
    },
  });

const PaymentScreen = () => {
  const style = useThemeStyles(styles);
  const { controller, vouchers, post, setPostData } = useServiceContext();
  const [voucher_modal, setVoucherModal] = useState(false);

  const VoucherItem = ({ data }) => {
    const voucherStyle = style.voucher;
    const onSelect = () => {
      const total = post.total;
      const coupon_price = Caculator.calcCouponPrice(total, data);
      setPostData({
        coupon_price: coupon_price,
        voucher_code: data.voucher_id,
      });
      setVoucherModal(false);
    };
    return (
      <Pressable onPress={() => onSelect()}>
        <View style={voucherStyle.wrapper}>
          <View style={voucherStyle.left}>
            <Typography variant="H5" color="Gray.0">
              {data.voucher_type == VOUCHER_TYPE.DISCOUNT_PERCENT
                ? Caculator.toPercent(data.discount_percent)
                : Caculator.toCharMonney(data.discount_price)}
            </Typography>
          </View>
          <View style={voucherStyle.right}>
            <Typography color="Gray.0">{data.voucher_name}</Typography>
          </View>
        </View>
      </Pressable>
    );
  };

  const DisableVoucherItem = ({ data, price_miss }) => {
    const voucherStyle = style.disable_voucher;
    return (
      <View style={voucherStyle.wrapper}>
        <View style={voucherStyle.voucher}>
          <View style={voucherStyle.left}>
            <Typography variant="H5" color="Gray.0">
              {data.voucher_type == VOUCHER_TYPE.DISCOUNT_PERCENT
                ? Caculator.toPercent(data.discount_percent)
                : Caculator.toCharMonney(data.discount_price)}
            </Typography>
          </View>
          <View style={voucherStyle.right}>
            <Typography color="Gray.0">{data.voucher_name}</Typography>
          </View>
        </View>
        <Typography variant="MiniDescription" color="AlizarinRed">
          Cần thêm {Caculator.toCharMonney(price_miss)} để sử dụng mã
          này
        </Typography>
      </View>
    );
  };

  const displayVoucher = () => {
    return vouchers.map((voucher, idx) => {
      const price_miss =
        parseInt(voucher.min_post_price) - parseInt(post.total);
      if (price_miss >= 0) {
        return <DisableVoucherItem key={idx} data={voucher} price_miss={price_miss} />;
      }
      return <VoucherItem key={idx} data={voucher} />;
    });
  };

  const VoucherModal = () => {
    const modalStyle = style.modal;
    return (
      <Modal animationType="none" transparent={true} visible={voucher_modal}>
        <TouchableWithoutFeedback onPress={() => setVoucherModal(false)}>
          <View style={modalStyle.centeredView}>
            <TouchableWithoutFeedback>
              <View style={modalStyle.modalView}>
                <View style={modalStyle.wrapper}>
                  <View style={modalStyle.header}>
                    <Typography variant="H7">Mã ưu đãi của tôi</Typography>
                  </View>
                  <ScrollView style={modalStyle.content}>
                    {displayVoucher()}
                  </ScrollView>
                  <View style={modalStyle.footer}>
                    <Button
                      style={modalStyle.cancelBtn}
                      size="modalBtn"
                      onPress={() => setVoucherModal(false)}
                    >
                      Đóng
                    </Button>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

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
            <Pressable onPress={() => setVoucherModal(true)}>
              {post.coupon_price > 0 ? (
                <CurrencyText
                  prefix="-"
                  variant="Description"
                  value={post.coupon_price}
                  currency="vnđ"
                  color="Gray.0"
                />
              ) : (
                <Typography variant="Description" color="Gray.0">
                  Chọn mã ưu đãi {">"}
                </Typography>
              )}
            </Pressable>
          </View>
        </View>
        <View style={style.total}>
          <View style={style.spaceBetween}>
            <Typography variant="Description" color="Gray.0">
              Tổng cộng
            </Typography>
            <CurrencyText
              value={Caculator.calcTotalOrder(post)}
              currency="vnđ"
              variant="Description"
              color="Gray.0"
            />
          </View>
        </View>
      </View>
    );
  };

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
            Tìm người giúp việc
          </Button>
          <Button size="sm" variant="cancel" onPress={() => controller.backToHomeScreen()}>
            Hủy
          </Button>
        </View>
      </ScrollView>
      <VoucherModal />
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
            // Toast.createToast("thanh toán online hiện không khả dụng")
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
