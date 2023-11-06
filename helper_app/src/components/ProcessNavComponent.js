import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
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
        marginTop: 5,
        marginLeft: 20,
        maxWidth: 90,
        textAlignVertical: "center"
      },
    },
  });

const ProcessNavComponent = () => {
  const style = useThemeStyles(styles);
  const disableStyle = [style.button.shape, style.button.disable];
  const enableStyle = [style.button.shape, style.button.enable];
  return (
    <>
      <View style={style.wrapper}>
        <View style={style.top}></View>
        <View style={style.bottom}>
          <TouchableOpacity activeOpacity={1}>
            <View style={enableStyle}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <View style={disableStyle}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <View style={disableStyle}></View>
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
