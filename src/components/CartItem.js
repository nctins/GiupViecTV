import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import AvatarComponent from "./AvatarComponent";
import {
  POST_STATE,
  POST_TYPE,
  LIMIT_ADDRESS_LENGTH,
  PAYMENT_METHOD_CONDITION,
} from "../constants/app_contants";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      width: "100%",
      height: 80,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    infoView: {
      width: "50%",
      height: 80,
      backgroundColor: "white",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingVertical: 10,
      marginLeft: 5,
    },
  });

const rightInfoStyle2 = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingVertical: 10,
    },
    viewItem1: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    viewItem2: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
const RightInfoCartItem2 = (props) => {
  const rightStyle = useThemeStyles(rightInfoStyle2);
  const order = props.order;

  return (
    <View style={rightStyle.default}>
      <View style={rightStyle.viewItem1}>
        <Typography variant="TextBold">{order.customer_name}</Typography>
        <AvatarComponent
          containerAvatarStyle={{}}
          avatarStyle={{}}
          size={"ssm"}
          style={"circle"}
        />
      </View>
      <View style={rightStyle.viewItem2}>
        <Typography variant="TextBold">{order.total} VNĐ</Typography>
      </View>
    </View>
  );
};

const rightInfoStyle3 = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingVertical: 10,
    },
    viewItem1: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    viewItem2: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
const RightInfoCartItem3 = (props) => {
  const rightStyle = useThemeStyles(rightInfoStyle3);
  const order = props.order;

  const displayPaymentMethod = () => {
    if (order.payment_method === PAYMENT_METHOD_CONDITION.COD) {
      return PAYMENT_METHOD_CONDITION.COD_NA;
    } else if (order.payment_method === PAYMENT_METHOD_CONDITION.VNPAY) {
      return PAYMENT_METHOD_CONDITION.VNPAY_NA;
    } else {
      return PAYMENT_METHOD_CONDITION.ALL_NA;
    }
  };

  return (
    <View style={rightStyle.default}>
      <View style={rightStyle.viewItem1}>
        <Typography variant="TextBold">{order.customer_name}</Typography>
        <AvatarComponent
          containerAvatarStyle={{}}
          avatarStyle={{}}
          size={"ssm"}
          style={"circle"}
        />
      </View>
      <View style={rightStyle.viewItem2}>
        <Typography variant="TextBold">{order.total} VNĐ</Typography>
        <Typography variant="MiniDescription">
          {displayPaymentMethod()}
        </Typography>
      </View>
    </View>
  );
};

const rightInfoStyle4 = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingVertical: 10,
    },
    viewItem1: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    viewItem2: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
const RightInfoCartItem4 = (props) => {
  const rightStyle = useThemeStyles(rightInfoStyle4);
  const order = props.order;

  const displayHelper = () => {
    if (order.helper_id && order.helper_id.length > 0) {
      return (
        <View style={rightStyle.viewItem1}>
          <Typography variant="TextBold">{order.customer_name}</Typography>
          <AvatarComponent
            containerAvatarStyle={{}}
            avatarStyle={{}}
            size={"ssm"}
            style={"circle"}
          />
        </View>
      );
    }
    return <View></View>;
  };

  return (
    <View style={rightStyle.default}>
      {displayHelper()}
      <View style={rightStyle.viewItem2}>
        <Typography variant="Description" style={{ color: "red" }}>
          Đàm phán giá không thành công
        </Typography>
      </View>
    </View>
  );
};

const CartItem = (props) => {
  const style = useThemeStyles(styles);
  const type = props.type;
  const order = props.order;
  const navigation = props.navigation;

  const setRightItem = (type) => {
    if (type === 1) {
      return <RightInfoCartItem1 order={order} />;
    } else if (type === 2) {
      return <RightInfoCartItem2 order={order} />;
    } else if (type === 3) {
      return <RightInfoCartItem3 order={order} />;
    } else {
      return <RightInfoCartItem4 order={order} />;
    }
  };

  const displayPostType = () => {
    if (order && order.post_type === POST_TYPE.HOURLY) {
      return POST_TYPE.HOURLY_NA;
    } else {
      return POST_TYPE.INSTANT_NA;
    }
  };

  const formatAddress = () => {
    if (order.address.length > LIMIT_ADDRESS_LENGTH.LENGTH) {
      return order.address
        .substring(0, LIMIT_ADDRESS_LENGTH.LENGTH)
        .concat("...");
    } else {
      return order.address;
    }
  };

  return (
    <Pressable style={style.default} onPress={()=>{
        navigation.navigate("CartDetail",{post: order});
    }}>
      <AvatarComponent
        containerAvatarStyle={{}}
        avatarStyle={{}}
        size={"lg"}
        style={"circle"}
      />
      <View style={style.infoView}>
        <Typography variant="Text">{displayPostType()}</Typography>
        <Typography variant="MiniDescription" style={{ marginLeft: 5 }}>
          {formatAddress()}
        </Typography>
        <Typography variant="Description">
          {order.time.substring(0, 5)}, {order.date.substring(0, 10)}
        </Typography>
      </View>
      {setRightItem(type)}
    </Pressable>
  );
};
export default CartItem;
