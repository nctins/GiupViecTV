import React, { useState } from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import ProcessNavComponent from "~components/ProcessNavComponent";
import AddressScreen from "./AddressScreen";
import PaymentScreen from "./PaymentScreen";
import ServiceScreen from "./ServiceScreen";
import { ServiceProvider } from "~contexts/ServiceContext";
import { POST_TYPE } from "~constants/app_contants";
import { BackIcon } from "~components/Icons";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[1],
      flexDirection: "column",
    },
    header: {
      width: "100%",
      height: 80,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    title: {
      marginLeft: 15,
      color: "white",
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    backIconStyle:{
      position:"absolute",
      top: 40,
      left: 10,
    },
  });

const ServiceTab = ({ route, navigation }) => {
  const { post_type } = route.params;
  const style = useThemeStyles(styles);
  const [currentScreen, setCurrentScreen] = useState("AddressScreen");
  const contentComponent = {
    AddressScreen: <AddressScreen />,
    ServiceScreen: <ServiceScreen />,
    PaymentScreen: <PaymentScreen />,
  };

  const onPressBackIcon = () => {
    navigation.navigate("HomeScreen");
  }

  return (
    <ServiceProvider
      navigation={navigation}
      post_type={post_type}
      externalState={{ currentScreen: [currentScreen, setCurrentScreen] }}
    >
      <View style={style.default}>
        <StatusBar backgroundColor={style.statusBar.backgroundColor} />
        <View style={style.header}>
          <BackIcon style={style.backIconStyle} size="md" color="white" onPress = {onPressBackIcon} />
          <Typography variant="H5" style={style.title}>Tìm người giúp việc</Typography>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: 20 }}>
            <ProcessNavComponent
              lstItem={[
                "AddressScreen",
                "ServiceScreen",
                "PaymentScreen",
              ]}
              toItem={(item) => {
                setCurrentScreen(item);
              }}
            />
          </View>
          {contentComponent[currentScreen]}
        </View>
      </View>
    </ServiceProvider>
  );
};

export default ServiceTab;
