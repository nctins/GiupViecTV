import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import ProcessNavComponent from "~components/ProcessNavComponent";
import { EditIcon } from "~components/Icons";
import ActionButton from "react-native-action-button";

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
    actionButton: {
      color: theme.colors.Azure,
      style: {
        ...theme.shadow,
      },
    },
  });

const AddressScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <Typography variant="H5" style={style.title}>
          Giúp việc nhà theo giờ
        </Typography>
      </View>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 1, marginTop: 20 }}>
          <ProcessNavComponent />
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <AddressCard />
        </View>
        <ActionButton
          buttonColor={style.actionButton.color}
          style={style.actionButton.style}
        />
      </View>
    </View>
  );
};

const CardStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      height: 130,
      width: 340,
      borderRadius: 10,
      backgroundColor: theme.colors.Gray[0],
      ...theme.shadow,
    },
    header: {
      flex: 1,
      borderBottomWidth: 2,
      flexDirection: "row",
      borderBottomColor: theme.colors.Gray[3],
      paddingHorizontal: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      flex: 2,
      padding: 10,
    },
  });

const AddressCard = () => {
  const style = useThemeStyles(CardStyles);
  return (
    <View style={style.wrapper}>
      <View style={style.header}>
        <Typography variant="Subtitle">Nhà riêng</Typography>
        <EditIcon size="sm" />
      </View>
      <View style={style.body}>
        <Typography>
          KTX Khu B đại học Quốc Gia, Đông Hòa, Dĩ An, Bình Dương
        </Typography>
      </View>
    </View>
  );
};

export default AddressScreen;
