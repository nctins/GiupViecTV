import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import ProcessNavComponent from "~components/ProcessNavComponent";
import { EditIcon } from "~components/Icons";
import ActionButton from "react-native-action-button";

const styles = (theme) =>
  StyleSheet.create({
    content: {
      flex: 7,
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 20,
    },
    actionButton: {
      color: theme.colors.Azure,
      style: {
        ...theme.shadow,
      },
    },
  });

const AddressScreen = ({ navigation }) => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.content}>
      <AddressCard />
      <ActionButton
        buttonColor={style.actionButton.color}
        style={style.actionButton.style}
      />
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
      marginTop: 10,
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
