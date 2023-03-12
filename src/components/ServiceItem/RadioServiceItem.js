import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import useServiceContext from "~hooks/useServiceContext";
import CurrencyText from "~components/CurrencyText";
import { TrashIcon } from "~components/Icons";

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
      flexDirection: "row",
      justifyContent:"space-between",
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
    priceItem: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
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
    radioItem: {
      backgroundColor: theme.colors.Gray[0],
      padding: 5,
      borderRadius: 20,
      alignSelf: "center",
      marginHorizontal: 3,
      borderWidth: 1,
      borderColor: theme.colors.Gray[8],
      minWidth: 40,
    },
    activeRadioItem: {
      backgroundColor: theme.colors.Verdepom,
      padding: 5,
      borderRadius: 20,
      alignSelf: "center",
      marginHorizontal: 3,
      borderWidth: 1,
      borderColor: theme.colors.Gray[8],
      minWidth: 40,
    },
    radioBox: {
      height: 50,
      marginTop: 5,
    },
  });

const RadioServiceItem = ({ serviceId }) => {
  const style = useThemeStyles(styles);
  const { post, setPostData, controller } = useServiceContext();
  const { services } = post;
  const { service_init, service_value } = services[serviceId];

  const multiValue = 1;
  const value = 1;
  const items = service_init.items;
  const total = parseInt(service_value.total);
  const selectItem = service_value.seq_nb;
  const unit_price = parseInt(items[selectItem].unit_price);

  const RadioItem = ({ data }) => {
    return (
      <Pressable
        style={
          data.seq_nb == selectItem ? style.activeRadioItem : style.radioItem
        }
        onPress={() => {
          const new_unit_price = parseInt(items[data.seq_nb].unit_price);
          const new_total = value * multiValue * new_unit_price;
          const new_services = {
            ...services,
            [serviceId]: {
              ...services[serviceId],
              service_value: {
                seq_nb: data.seq_nb,
                value: value,
                multie_field_value: multiValue,
                total: new_total,
              },
            },
          };
          const new_post_total = post.total - total + new_total;
          setPostData({ services: new_services, total: new_post_total });
        }}
      >
        <Typography variant="Description">{data.string_value}</Typography>
      </Pressable>
    );
  };

  return (
    <View style={style.wrapper}>
      <View style={style.title}>
        <Typography>{service_init.name}</Typography>
        <Pressable onPress={()=>controller.deleteService(serviceId)}>
          <TrashIcon size="sm"/>
        </Pressable>
      </View>
      {service_init.description && (
        <View style={style.description}>
          <Typography variant="Description">
            {service_init.description}
          </Typography>
        </View>
      )}
      <View style={style.detail}>
        <View style={style.price}>
          <View style={style.priceItem}>
            <Typography variant="Description">{service_init.dram}:</Typography>
          </View>
          <ScrollView horizontal={true} style={style.radioBox}>
            {items.map((ele, idx) => (
              <RadioItem key={idx} data={ele} idx={idx} />
            ))}
          </ScrollView>
        </View>
        <View style={style.total}>
          <CurrencyText value={total} />
        </View>
      </View>
    </View>
  );
};

export default RadioServiceItem;
