import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import { BlankLayout } from "~components/Layout";
import AvatarComponent from "~components/AvatarComponent";
import Typography from "~components/Typography";
import { LogoIcon } from "~components/Icons";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      flexDirection: "column",
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    hiUserView: {
      width: "100%",
      height: 100,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    nameAndAddressView: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingVertical: 25,
      marginLeft: 10,
    },
    ItemView: {
      width: "100%",
      height: 140,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "center"
    },
  });

const HomeScreen = () => {
  const style = useThemeStyles(styles);

  const images = useState(["https://reactnative.dev/img/tiny_logo.png"]);

  return (
    <BlankLayout color="BackgroundBlue">
      <View style={style.hiUserView}>
        <AvatarComponent size="lg" />
        <View style={style.nameAndAddressView}>
          <Typography variant="H7">Xin chào, Nguyễn Văn Tèo</Typography>
          <Typography variant="Description" style={{ marginLeft: 0 }}>
            KTX khu B, Đông Hòa, Dĩ An, Bình Dương
          </Typography>
        </View>
      </View>
      <View style={style.ItemView}>
        <ItemComponent label={"tức thì"} icon={<LogoIcon/>} onPress={()=>{}}/>
        <ItemComponent label={"theo giờ"} icon={<LogoIcon/>} onPress={()=>{}}/>
      </View>
    </BlankLayout>
  );
};

const itemStyle = (theme) =>
  StyleSheet.create({
    shape: {
      width: 70,
      height: 70,
      borderRadius: 10,
      marginHorizontal: 10,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.Gray[0],
      ...theme.shadow,
    },
    default:{
      color: theme.colors.Gray[3],
    },
    active:{
      color: theme.colors.Azure,
    }
    
  });

const ItemComponent = ( {label, icon, onPress} ) => {
  const style = useThemeStyles(itemStyle);
  return <TouchableOpacity style={[style.shape]} onPress={onPress} activeOpacity={1}>
    {icon}
    <Typography variant="SubTitle" style={style.active}>{label}</Typography>
  </TouchableOpacity>;
};

export default HomeScreen;
