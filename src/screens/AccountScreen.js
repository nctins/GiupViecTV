import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Switch,
} from "react-native";
import Header from "~components/Header";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { FacebookIcon, GoogleIcon, RightArrowIcon } from "~components/Icons";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    header: {
      default: {
        width: "100%",
        height: "15%",
        backgroundColor: theme.colors.BackgroundBlue,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        color: "white",
      },
    },
    settingItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[2],
    },
    settingItemTitle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
    },
    switch: {
      trackColor: {
        false: theme.colors.Gray[2],
        true: theme.colors.SpringGreen,
      },
      thumbColor: theme.colors.Gray[0],
    },
    settingMenu:{
      marginHorizontal: 30, 
      marginVertical:10,
    }
  });

const AccountScreen = () => {
  const style = useThemeStyles(styles);
  const [isNotice, setIsNotice] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <Header style={style.header} title="Tài khoản" />

      {/* user info */}
      <View style={{ flex: 1 }}>

      </View>

      {/* setting menu */}
      <View style={{ flex: 3 }}>
        <View style={style.settingMenu}>
          <Typography variant="TextBold">Tài khoản của tôi</Typography>
          <SettingItem
            title={"Chỉnh sửa thông tin cá nhân"}
            onTouch={() => {}}
          />
          <SettingItem title={"Thay đổi mật khẩu"} onTouch={() => {}} />
          <SettingItem title={"Liên kết tài khoản"} onTouch={() => {}} />
          <SettingItem title={"Đăng xuất"} onTouch={() => {}} />
        </View>
        <View style={style.settingMenu}>
          <Typography variant="TextBold">Tổng quát</Typography>
          <SwitchSettingItem
            title="Thông báo"
            onToggle={() => setIsNotice((previousState) => !previousState)}
            value={isNotice}
          />
          <SettingItem title={"Đánh giá chúng tôi"} onTouch={() => {}} />
          <SettingItem title={"Thay đổi mật khẩu"} onTouch={() => {}} />
          <SettingItem title={"Phản hồi"} onTouch={() => {}} />
        </View>
      </View>

    </SafeAreaView>
  );
};

const SwitchSettingItem = ({ icon, title, onToggle, value }) => {
  const style = useThemeStyles(styles);
  return (
    <View style={style.settingItem}>
      <View style={style.settingItemTitle}>
        <Typography variant="Description" >
          {title}
        </Typography>
      </View>
      <Switch
        trackColor={style.switch.trackColor}
        thumbColor={style.switch.thumbColor}
        ios_backgroundColor={style.switch.FalseColor}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );
};

const SettingItem = ({ title, onTouch }) => {
  const style = useThemeStyles(styles);
  return (
    <View style={style.settingItem}>
      <View style={style.settingItemTitle}>
        <Typography variant="Description" >
          {title}
        </Typography>
      </View>
      <RightArrowIcon />
    </View>
  );
};

export default AccountScreen;
