import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { GiftIcon, LogoIcon, OrderCancelIcon, OrderCompleteIcon, OrderIcon } from "./Icons";
import DateFormater from "~utils/Dateformater";
import { ICON_CODE } from "~constants/app_contants";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      width: "100%",
      height: 110,
      backgroundColor: "#f0faff",
      flexDirection: "column",
      marginTop: 10,
      borderRadius: 10,
      borderColor: theme.colors.BackgroundBlue,
      borderWidth: 1,
    },
    title: {
      width: "100%",
      height: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderBottomColor: theme.colors.BackgroundBlue,
      borderBottomWidth: 1,
    },
    content: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    dot_not_view: {
      width: 7,
      height: 7,
      borderRadius: 100,
      backgroundColor: theme.colors.StrawberryRed,
      position: "absolute",
      top: 2,
      right: 2,
    },
    icon_wrapper: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
  });

const NotificationItem = (props) => {
  const style = useThemeStyles(styles);
  const data = props.data;
  const title = data.title;
  const content = data.content;
  const create_date = data.create_date;
  const icon_code = data.icon_code;
  const is_view = data.is_view;

  const genderIcon = (code) => {
    switch (code) {
      case ICON_CODE.COUPON:
        return <GiftIcon />;
      case ICON_CODE.ORDER:
      case ICON_CODE.ORDER_MATCH:
        return <OrderIcon color="BackgroundBlue" />;
      case ICON_CODE.ORDER_COMPLETE: 
        return <OrderCompleteIcon color="ModerateAquamarine" />;
      case ICON_CODE.ORDER_CANCEL: 
        return <OrderCancelIcon color="StrawberryRed"/>;
      default:
        return <LogoIcon />;
    }
  };
  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
    return;
  };

  return (
      <View style={style.default}>
        <Pressable onPress={() => onPress()}>
          <View style={style.title}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={style.icon_wrapper}>
                {genderIcon(icon_code)} 
                {!is_view && <View style={style.dot_not_view}/>}
              </View>
              <Typography variant="Title" style={{ marginLeft: 8 }}>{title}</Typography>
            </View>
            <View>
              <Typography variant="Text" style={{ marginLeft: 0 }}>
                {DateFormater(create_date)}
              </Typography>
            </View>
          </View>
          <View style={style.content}>
            <Typography variant="Text">{content}</Typography>
          </View>
        </Pressable>
      </View>
  );
};
export default NotificationItem;
