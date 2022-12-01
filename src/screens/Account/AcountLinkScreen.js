import React, { useState } from "react";
import { StyleSheet, View, ScrollView, StatusBar, Switch } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
import { FacebookIcon, GoogleIcon } from "~components/Icons";

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
    settingItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      marginHorizontal: 20,
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
  });

const AccountLinkScreen = ({navigation}) => {
  const style = useThemeStyles(styles);
  const [linkFacebook, setLinkFacebook] = useState(false);
  const [linkGoogle, setLinkGoogle] = useState(false);
  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <BackIcon color="Gray.0" onPress={() => {navigation.navigate("AccountScreen")}} />
        <Typography variant="H5" style={style.title}>
          Liên kết tài khoản
        </Typography>
      </View>
      <View style={{ flex: 7 }}>
        <SettingItem
          icon={<FacebookIcon />}
          title="Facebook"
          onToggle={() => setLinkFacebook((previousState) => !previousState)}
          value={linkFacebook}
        />
        <SettingItem
          icon={<GoogleIcon />}
          title="Facebook"
          onToggle={() => setLinkGoogle((previousState) => !previousState)}
          value={linkGoogle}
        />
      </View>
    </View>
  );
};

const SettingItem = ({ icon, title, onToggle, value }) => {
  const style = useThemeStyles(styles);
  return (
    <View style={style.settingItem}>
      <View style={style.settingItemTitle}>
        {icon}
        <Typography variant="Description" style={{ marginLeft: 10 }}>
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

export default AccountLinkScreen;
