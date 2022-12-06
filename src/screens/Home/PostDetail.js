import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import Button from "~components/Button";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import {
  POST_STATE,
  POST_TYPE,
  LIMIT_ADDRESS_LENGTH,
  PAYMENT_METHOD_CONDITION,
  PAYMENT_METHOD,
} from "~constants/app_contants";
import CurrencyText from "~components/CurrencyText";
import Toast from "~utils/Toast";

const dateTimeFormater = (date, time) => {
  const time_string = time.slice(0, 5);
  const date_obj = new Date(date);
  return `${time_string}, ${date_obj.getDate()}/${date_obj.getMonth()}/${date_obj.getFullYear()}`;
};

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
      // justifyContent: "center",
      paddingHorizontal: 15,
    },
    titleHeader: {
      marginLeft: 15,
      color: theme.colors.Gray[0],
    },
    title: {
      color: theme.colors.Gray[8],
    },
    viewContent: {
      flexGrow: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.Gray[0],
      paddingHorizontal: 20,
    },
    viewItemContent1: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomColor: theme.colors.Gray[8],
      borderBottomWidth: 1,
      borderStyle: "dashed",
    },
    viewItemContent2: {
      flexDirection: "column",
      paddingVertical: 10,
      borderBottomColor: theme.colors.Gray[8],
      borderBottomWidth: 1,
      borderStyle: "dashed",
    },
    viewButton: {
      marginTop: 20,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: 350,
      height: 40,
      paddingHorizontal: 0,
      paddingVertical: 0,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.BackgroundBlue,
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    label: {
      backgroundColor: theme.colors.ShinyOrange,
      marginLeft: 20,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 7,
    },
  });

const PostDetail = (props) => {
  const style = useThemeStyles(styles);
  const { authState } = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const navigation = props.navigation;
  const route = props.route;
  const { post_id, post_state } = route.params.post;
  const [post, setPost] = useState({
    address: "",
    date: "0000-00-00T00:00:00.000Z",
    time: "00:00:00",
    services: [],
    customer: {
      name: "",
      phone: "",
    },
    helper: {
      name: "",
      phone: "",
    },
    total: 0,
  });

  useEffect(() => {
    getPostDetail();
  }, []);

  const getPostDetail = () => {
    // console.log(`post/${post.post_id}`);
    authAxios
      .get(`post`, { params: { post_id: post_id } })
      .then((res) => {
        const res_obj = res.data.data;
        const new_post = {
          address: res_obj.address,
          date: res_obj.date,
          time: res_obj.time,
          services: res_obj.services,
          customer: {
            name: res_obj.customer_name,
            phone: res_obj.customer_phone,
          },
          helper: {
            name: "",
            phone: "",
          },
          total: res_obj.total,
        };
        setPost(new_post);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAccept = () => {
    authAxios
      .put(`post`, { post_id: post_id })
      .then((res) => {
        Toast.createToast(res.data.msg)
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayPostState = () => {
    if (post_state === POST_STATE.PROCESSING) {
      return POST_STATE.PROCESSING_NA;
    } else if (post_state === POST_STATE.INCOMPLETE) {
      return POST_STATE.INCOMPLETE_NA;
    } else if (post_state === POST_STATE.COMPLETE) {
      return POST_STATE.COMPLETE_NA;
    } else {
      return POST_STATE.CANCEL_NA;
    }
  };

  const PriceItem = ({ title, value }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="Description">{title}</Typography>
        <CurrencyText variant="Description" value={value} currency="VNĐ" />
      </View>
    );
  };

  const CouponItem = ({ title, value }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="Description">{title}</Typography>
        <CurrencyText
          prefix="-"
          variant="Description"
          value={value}
          currency="VNĐ"
        />
      </View>
    );
  };

  const PaymentMethodItem = ({ value }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="Description">Phương thức thanh toán</Typography>
        {value == PAYMENT_METHOD.VNPAY ? (
          <Typography variant="Description">VNPAY</Typography>
        ) : (
          <Typography variant="Description">Tiền mặt</Typography>
        )}
      </View>
    );
  };

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon
          color="Gray.0"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Typography variant="H5" style={style.titleHeader}>
          Chi tiết đơn hàng
        </Typography>
      </View>
      <ScrollView style={style.viewContent}>
        <View style={style.viewItemContent1}>
          <Typography variant="TextBold" style={style.title}>
            Tình trạng đơn hàng
          </Typography>
          <View style={style.label}>
            <Typography variant="Description" style={{}}>
              {displayPostState()}
            </Typography>
          </View>
        </View>
        <View style={[style.viewItemContent2]}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Typography variant="TextBold" style={style.title}>
              Thông tin khách hàng
            </Typography>
          </View>
          <Typography variant="Description">
            Họ và tên: {post.customer.name}{" "}
          </Typography>
          <Typography variant="Description">
            Địa chỉ: {post.address}{" "}
          </Typography>
          <Typography variant="Description">
            Thời gian: {dateTimeFormater(post.date, post.time)}
          </Typography>
          <Typography variant="Description">
            Số điện thoại: {post.customer.phone}
          </Typography>
        </View>
        <View style={[style.viewItemContent2]}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Typography variant="TextBold" style={style.title}>
              Dịch vụ
            </Typography>
          </View>
          {post.services.map((ele, idx) => {
            return (
              <PriceItem key={idx} title={ele.service_name} value={ele.total} />
            );
          })}
          <CouponItem title={"Ưu đãi"} value={5000} />
          <PriceItem title={"Tổng cộng"} value={post.total} />
          <PaymentMethodItem value={post.payment_method} />
        </View>
        {/* <View style={[style.viewItemContent2]}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Typography variant="TextBold" style={style.title}>
              Thông tin người giúp việc
            </Typography>
          </View>
          <Typography variant="Description">
            Họ và tên: {post.helper.name}
          </Typography>
          <Typography variant="Description">
            Số điện thoại: {post.helper.phone}
          </Typography>
        </View> */}
        <View style={style.viewButton}>
          <Button style={style.button} onPress={() => onAccept()}>
            Nhận đơn hàng
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
export default PostDetail;
