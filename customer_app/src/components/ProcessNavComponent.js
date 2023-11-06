import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import useServiceContext from "~hooks/useServiceContext";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "./Typography";

const styles = (theme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      marginHorizontal: 20,
      position: "relative",
    },
    top: {
      flex: 1,
      margin: 0,
      borderBottomColor: theme.colors.Gray[3],
      borderBottomWidth: 2,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bottom: {
      flex: 1,
      margin: 0,
      borderTopColor: theme.colors.Gray[2],
      borderTopWidth: 2,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      shape: {
        width: 40,
        height: 40,
        borderRadius: 40,
        top: -20,
        borderWidth: 4,
        borderColor: theme.colors.Gray[3],
      },
      disable: {
        backgroundColor: theme.colors.Gray[0],
      },
      enable: {
        backgroundColor: theme.colors.Azure,
      },
    },
    title: {
      wrapper: {
        flex: 1,
        margin: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
      content: {
        width: 90,
        minHeight: 35,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        textAlignVertical: "center",
      },
    },
  });

const ProcessNavComponent = ({ lstItem, toItem }) => {
  const style = useThemeStyles(styles);
  const { currentScreen } = useServiceContext();
  const currentItem = lstItem.indexOf(currentScreen);
  const disableStyle = [style.button.shape, style.button.disable];
  const enableStyle = [style.button.shape, style.button.enable];
  return (
    <>
      <View style={style.wrapper}>
        <View style={style.top}></View>
        <View style={style.bottom}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (currentItem == 1 || currentItem == 2) {
                toItem(lstItem[0]);
              }
            }}
          >
            <View style={enableStyle}></View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (currentItem == 2) {
                toItem(lstItem[1]);
              }
            }}
          >
            <View style={currentItem > 0 ? enableStyle : disableStyle}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={currentItem == 2 ? enableStyle : disableStyle}></View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.title.wrapper}>
        <View style={style.title.content}>
          <Typography>Địa chỉ</Typography>
        </View>
        <View style={style.title.content}>
          <Typography>Chọn dịch vụ, thời gian</Typography>
        </View>
        <View style={style.title.content}>
          <Typography>Phương thức thanh toán</Typography>
        </View>
      </View>
    </>
  );
};

export default ProcessNavComponent;
