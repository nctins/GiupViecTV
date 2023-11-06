import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Switch, TouchableOpacity } from "react-native";
import Header from "~components/Header";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { RightArrowIcon } from "~components/Icons";
import AvatarComponent from "~components/AvatarComponent";
import { AuthContext } from "~contexts/AuthContext";
import useAxios from "~hooks/useAxios";
import LoadingScreen from "~screens/LoadingScreen";
import SafeView from "~components/SafeView";
import StatusBar from "~components/StatusBar";
import useNotificationContext from "~hooks/useNotificationContext";

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
      backgroundColor: theme.colors.DarkGray[0],
    },
    avatar: {
      alignSelf: "center",
      borderWidth: 2,
      borderRadius: 50,
      marginRight: 10,
      borderColor: theme.colors.BackgroundBlue,
    },
    account: { marginLeft: 10, alignSelf: "center" },
  };
};

const settingStyle = (theme) => {
  return {
    wrapper:{
      flex:3,
      backgroundColor: theme.colors.DarkGray[0],
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
    settingMenu: {
      marginHorizontal: 30,
      marginVertical: 10,
    },
  };
};

const AccountScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  // const [isNotice, setIsNotice] = useState(false);
  const authContext = useContext(AuthContext);
  const user = authContext.authState.user;
  const { authAxios } = useAxios();
  const {isShowNotification, toggleShowNotificaion} = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    setIsLoading(true);
    await authAxios.post("auth/signout")
      .then((res)=>{
        console.log(res.data);
        authContext.logout();
        navigation.navigate("StartScreen");
        setIsLoading(true);
      })
      .catch((err)=>{
        console.log(err);
        setIsLoading(true);
      });
  }

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <StatusBar />
      <SafeView style={{ flex: 1 }}>
        <Header title="Tài khoản" />
        {/* user info */}
        <View style={[{ flex: 1 }, style.userInfo.wrapper]}>
          <AvatarComponent 
            img={user.avatar_url} size={80} 
            containerAvatarStyle ={style.userInfo.avatar} 
          />
          <View style={style.userInfo.account}>
            <Typography variant="TitleBold">{user.name}</Typography>
            <Typography variant="Text" color="Gray.4">
              {user.email}
            </Typography>
          </View>
        </View>

        {/* setting menu */}
        <View style={style.setting.wrapper}>
          <View style={style.setting.settingMenu}>
            <Typography variant="SubtitleSemiBold">Tài khoản của tôi</Typography>
            <SettingItem
              title={"Chỉnh sửa thông tin cá nhân"}
              onTouch={() => {navigation.navigate("UpdateInfoScreen")}}
            />
            <SettingItem title={"Thay đổi mật khẩu"} onTouch={() => {navigation.navigate("ChangePasswordScreen")}} />
            <SettingItem title={"Thu nhập"} onTouch={() => {navigation.navigate("IncomeScreen")}} />
            <SettingItem title={"Đăng xuất"} onTouch={() => onLogout()} />
          </View>
          <View style={style.setting.settingMenu}>
            <Typography variant="SubtitleSemiBold">Tổng quát</Typography>
            <SwitchSettingItem
              title="Thông báo"
              onToggle={() => {toggleShowNotificaion();}}
              value={isShowNotification}
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
        <Typography variant="Text">{title}</Typography>
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
        <Typography variant="Text">{title}</Typography>
      </View>
      <RightArrowIcon />
    </View>
    </TouchableOpacity>
  );
};

export default AccountScreen;
