import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { GiftIcon, LogoIcon, OrderIcon } from "./Icons";
import DateFormater from "~utils/Dateformater";
import { ICON_CODE } from "~constants/app_contants";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      width: "100%",
      height: 110,
      backgroundColor: theme.colors.DarkGray[1],
      flexDirection: "column",
      marginTop: 10,
      borderRadius: 10,
    },
    title: {
      width: "100%",
      height: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderBottomColor: "white",
      borderBottomWidth: 2,
    },
    content: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
  });

const NotificationItem = (props) => {
  const style = useThemeStyles(styles);
  const data = props.data;
  const title = data.title;
  const content = data.content;
  const create_date = data.create_date;
  const icon_code = data.icon_code;

  const genderIcon = (code) => {
    switch (code) {
      case ICON_CODE.COUPON:
        return <GiftIcon />;
      case ICON_CODE.ORDER:
        return <OrderIcon />;
      default:
        return <LogoIcon />;
    }
  };
  const onPress = () => {
    if (props.onPress) {
      return props.onPress();
    }
    return;
  };

  return (
      <View style={style.default}>
          <Pressable onPress={() => onPress()}>
        <View style={style.title}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {genderIcon(icon_code)}
            <Typography variant="Subtitle" style={{ marginLeft: 8 }}>
              {title}
            </Typography>
          </View>
          <View>
            <Typography variant="MiniDescription" style={{ marginLeft: 0 }}>
              {DateFormater(create_date)}
            </Typography>
          </View>
        </View>
        <View style={style.content}>
          <Typography variant="Description">{content}</Typography>
        </View>
    </Pressable>
      </View>
  );
};
export default NotificationItem;
