import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
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
      paddingHorizontal: 15,
      flex: 1,
    },
    title: {
      marginLeft: 15,
      color: "white",
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    form: {
      field: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.colors.BackgroundBlue,
      },
      wrapper: {
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
  });

const ChangePasswordScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon color="Gray.0" />
        <Typography variant="H5" style={style.title}>
          Thay đổi mật khẩu
        </Typography>
      </View>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 1 }}></View>
        <View style={[{ flex: 3 }, style.form.wrapper]}>
          <TextInput
            style={style.form.field}
            placeholder="Nhập mật khẩu cũ"
            title={"Mật khẩu cũ"}
            titleStyle="blackTitle"
            isPassword
          />
          <TextInput
            style={style.form.field}
            placeholder="Nhập mật khẩu mới"
            title={"Mật khẩu mới"}
            titleStyle="blackTitle"
            isPassword
          />
          <TextInput
            style={style.form.field}
            placeholder="Nhập lại mật khẩu"
            title={"Nhập lại mật khẩu mới"}
            titleStyle="blackTitle"
            isPassword
          />
        </View>
        <View style={[{ flex: 2 }, style.form.button]}>
          <Button size="sm" radius={4} style={{ width: 130, padding: 10 }}>
            Lưu
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
