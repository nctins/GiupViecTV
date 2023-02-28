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
import GoogleMap from "~screens/GoogleMapScreen";

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
      justifyContent: "center",
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
  });

const ServiceTab = ({ route, navigation }) => {
  const { post_type } = route.params;
  const style = useThemeStyles(styles);
  const [currentScreen, setCurrentScreen] = useState("AddressScreen");
  const contentComponent = {
    AddressScreen: <AddressScreen />,
    GoogleMapScreen: <GoogleMap />,
    ServiceScreen: <ServiceScreen />,
    PaymentScreen: <PaymentScreen />,
  };

  return (
    <ServiceProvider
      navigation={navigation}
      post_type={post_type}
      externalState={{ currentScreen: [currentScreen, setCurrentScreen] }}
    >
      <View style={style.default}>
        <StatusBar backgroundColor={style.statusBar.backgroundColor} />
        <View style={style.header}>
          <Typography variant="H5" style={style.title}>
            {post_type == POST_TYPE.HOURLY
              ? "Giúp việc nhà theo giờ"
              : "Giúp việc nhà tức thì"}
          </Typography>
        </View>
        <View style={{ flex: 7 }}>
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
