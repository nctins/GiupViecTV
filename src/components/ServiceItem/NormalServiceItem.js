import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";

const styles = (theme) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: 20,
      marginVertical: 10,
      borderBottomColor: theme.colors.Gray[3],
      borderBottomWidth: 2,
    },
    title: {
      marginVertical: 5,
    },
    description: {
      backgroundColor: theme.colors.Gray[1],
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.Azure,
      padding: 5,
      marginVertical: 2,
    },
    detail: {
      flexDirection: "row",
    },
    price: {
      flex: 3,
    },
    priceItem: { flexDirection: "row", alignItems: "center", marginTop: 5 },
    total: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    textBox: {
      borderWidth: 1,
      borderColor: theme.colors.Azure,
      marginHorizontal: 10,
      alignSelf: "center",
    },
  });

const NormalServiceItem = ({ title, description = null, priceInfo }) => {
  const style = useThemeStyles(styles);
  if (description == null) {
    return (
      <View style={style.wrapper}>
        <View style={style.title}>
          <Typography>{title}</Typography>
        </View>
        <ServiceItemDetail priceInfo={priceInfo} />
      </View>
    );
  } else {
    return (
      <View style={style.wrapper}>
        <View style={style.title}>
          <Typography>{title}</Typography>
        </View>
        <View style={style.description}>
          <Typography variant="Description">{description}</Typography>
        </View>
        <ServiceItemDetail priceInfo={priceInfo} />
      </View>
    );
  }
};

const ServiceItemDetail = ({ priceInfo }) => {
  const style = useThemeStyles(styles);
  return (
    <View style={style.detail}>
      <View style={style.price}>
        <View style={style.priceItem}>
          <Typography variant="Description">
            {priceInfo.calcBy.title}:
          </Typography>
          <TextInput variant="sm" style={style.textBox} />
          <Typography variant="Description">
            {priceInfo.calcBy.unitTitle}
          </Typography>
        </View>
        <View style={style.priceItem}>
          <Typography variant="Description">Đơn giá:</Typography>
          <TextInput
            variant="sm"
            style={style.textBox}
            editable={false}
            selectTextOnFocus={false}
            value={priceInfo.unitPrice.num}
          />
          <Typography variant="Description">
            {priceInfo.unitPrice.title}
          </Typography>
        </View>
      </View>
      <View style={style.total}>
        <Typography variant="H7">250.000 VNĐ</Typography>
      </View>
    </View>
  );
};

export default NormalServiceItem;
