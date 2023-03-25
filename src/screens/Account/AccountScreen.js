import React, { useState, useContext } from "react";
import { StyleSheet, View, Switch, TouchableOpacity } from "react-native";
import Header from "~components/Header";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { RightArrowIcon } from "~components/Icons";
import AvatarComponent from "~components/AvatarComponent";
import { AuthContext } from "~contexts/AuthContext";
import useAxios from "~hooks/useAxios";
import SafeView from "~components/SafeView";
import StatusBar from "~components/StatusBar";

const styles = (theme) => StyleSheet.create({
    setting: settingStyle(theme),
    userInfo: userInfoStyle(theme),
});

const userInfoStyle = (theme) => {
  return {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
    },
    avatar: {
      alignSelf: "center",
      borderWidth: 3,
      borderRadius: 50,
      marginRight: 10,
      borderColor: theme.colors.BackgroundBlue,
    },
    account: { marginLeft: 10, alignSelf: "center" },
  };
};

const settingStyle = (theme) => {
  return {
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
    settingMenu: {
      marginHorizontal: 30,
      marginVertical: 10,
    },
  };
};

const AccountScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const user = authContext.authState.user;
  const [isNotice, setIsNotice] = useState(false);
  const { authAxios } = useAxios();
  const onLogout = async () => {
    await authAxios.post("auth/signout")
      .then((res)=>{
        authContext.logout();
        navigation.navigate("StartScreen");
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  return (
    <>
      <StatusBar/>
      <SafeView>
        <Header title="Tài khoản" />
        
        {/* user info */}
        <View style={[{ flex: 1 }, style.userInfo.wrapper]}>
          <AvatarComponent 
            img={user.avatar_url}
            size="lg" 
            containerAvatarStyle ={style.userInfo.avatar} 
          />
          <View style={style.userInfo.account}>
            <Typography variant="SubTitle">{user.name}</Typography>
            <Typography variant="Description" color="Gray.3">
            {user.email}
            </Typography>
          </View>
        </View>

        {/* setting menu */}
        <View style={{ flex: 3 }}>
          <View style={style.setting.settingMenu}>
            <Typography variant="TextBold">Tài khoản của tôi</Typography>
            <SettingItem
              title={"Chỉnh sửa thông tin cá nhân"}
              onTouch={() => {navigation.navigate("UpdateInfoScreen")}}
            />
            <SettingItem title={"Thay đổi mật khẩu"} onTouch={() => {navigation.navigate("ChangePasswordScreen")}} />
            {/*<SettingItem title={"Liên kết tài khoản"} onTouch={() => {navigation.navigate("AccountLinkScreen")}} /> */}
            <SettingItem title={"Đăng xuất"} onTouch={() => onLogout()} />
          </View>
          <View style={style.setting.settingMenu}>
            <Typography variant="TextBold">Tổng quát</Typography>
            <SwitchSettingItem
              title="Thông báo"
              onToggle={() => setIsNotice((previousState) => !previousState)}
              value={isNotice}
            />
            <SettingItem title={"Phản hồi"} onTouch={() => {navigation.navigate("FeedbackScreen")}} />
          </View>
        </View>
      </SafeView>
    </>
  );
};

const SwitchSettingItem = ({ icon, title, onToggle, value }) => {
  const style = useThemeStyles(styles);
  return (
    <View style={style.setting.settingItem}>
      <View style={style.setting.settingItemTitle}>
        <Typography variant="Description">{title}</Typography>
      </View>
      <Switch
        trackColor={style.setting.switch.trackColor}
        thumbColor={style.setting.switch.thumbColor}
        ios_backgroundColor={style.setting.switch.FalseColor}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );
};

const SettingItem = ({ title, onTouch }) => {
  const style = useThemeStyles(styles);
  
  return (
    <TouchableOpacity onPress={onTouch}>
    <View style={style.setting.settingItem}>
      <View style={style.setting.settingItemTitle}>
        <Typography variant="Description">{title}</Typography>
      </View>
      <RightArrowIcon />
    </View>
    </TouchableOpacity>
  );
};

export default AccountScreen;
