import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, StatusBar, Pressable } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";
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
  });

const NormalServiceItem = ({ serviceId }) => {
  const style = useThemeStyles(styles);
  const { post, setPostData, controller } = useServiceContext();
  const { services } = post;
  const { service_init, service_value } = services[serviceId];

  const multiValue = parseInt(service_value.multie_field_value);
  const value = parseInt(service_value.value);
  const total = parseInt(service_value.total);
  const estimate_time = parseInt(service_value.estimate_time);
  const unit_price = parseInt(service_init.unit_price);
  const unit_estimate_time = parseInt(service_init.estimate_time); 

  const createNewServices = (service, is_select=true) => {
    const new_services = {...services};
    new_services[serviceId] = {...service, is_select};
    return new_services;
  }

  const onChangeValue = (arg) => {
    const new_value = parseInt(arg);
    const new_total = new_value * multiValue * unit_price;
    const new_estimate_time = new_value * multiValue * unit_estimate_time;

    const new_services = createNewServices({
      ...services[serviceId],
      service_value: {
        seq_nb: 0,
        value: new_value,
        multie_field_value: multiValue,
        estimate_time: new_estimate_time,
        total: new_total,
      },
    });

    const new_post_total = post.total - total + new_total;
    const new_post_estimate_time = post.total_estimate_time - estimate_time + new_estimate_time;
    setPostData({ 
      services: new_services, 
      total: new_post_total, 
      total_estimate_time: new_post_estimate_time 
    });
  };

  const onChangeMultiValue = (arg) => {
    const new_multi_value = parseInt(arg);
    const new_total = value * new_multi_value * unit_price;
    const new_estimate_time = value * new_multi_value * unit_estimate_time;

    const new_services = createNewServices({
      ...services[serviceId],
      service_value: {
        seq_nb: 0,
        value: value,
        multie_field_value: new_multi_value,
        estimate_time: new_estimate_time,
        total: new_total,
      },
    });

    const new_post_total = post.total - total + new_total;
    const new_post_estimate_time = post.total_estimate_time - estimate_time + new_estimate_time;
    setPostData({ 
      services: new_services, 
      total: new_post_total,
      total_estimate_time: new_post_estimate_time,
    });
  };

  const onDelete = () => {
    const new_services = createNewServices({
      ...services[serviceId],
      service_value: {
        seq_nb: 0,
        value: 0,
        multie_field_value: 1,
        estimate_time: 0,
        total: 0,
      },
    }, false);

    const new_post_total = post.total - total;
    const new_post_estimate_time = post.total_estimate_time - estimate_time;

    setPostData({ 
      services: new_services, 
      total: new_post_total,
      total_estimate_time: new_post_estimate_time,
    });
  }

  const PriceItem = ({ title, unitTitle = "", onEndEditing, initValue }) => {
    const [itemValue, setItemValue] = useState(initValue);
    return (
      <View style={style.priceItem}>
        <Typography variant="Description">{title}:</Typography>
        <TextInput
          variant="sm"
          style={style.textBox}
          value={`${itemValue}`}
          onChangeText={(text) => setItemValue(text)}
          onEndEditing={() => {
            onEndEditing(itemValue);
          }}
          keyboardType="numeric"
        />
        {unitTitle != "" && (
          <Typography variant="Description">{unitTitle}</Typography>
        )}
      </View>
    );
  };

  return (
    <View style={style.wrapper}>
      <View style={style.title}>
        <Typography>{service_init.name}</Typography>
        <Pressable onPress={()=>onDelete()}>
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
          {service_init.multiple_field_title != "" &&
            <PriceItem
              title={service_init.multiple_field_title}
              initValue={multiValue}
              onEndEditing={(text) => onChangeMultiValue(text)}
            /> 
          }
          <PriceItem
            title={service_init.dram}
            unitTitle={`${service_init.dram_unit}`}
            initValue={value}
            onEndEditing={(text) => onChangeValue(text)}
          />
          <View style={style.priceItem}>
            <Typography variant="Description">Đơn giá:</Typography>
            <TextInput
              variant="sm"
              style={style.textBox}
              editable={false}
              selectTextOnFocus={false}
              value={`${service_init.unit_price}`}
            />
            <Typography variant="Description">
              {service_init.unit_price_title}
            </Typography>
          </View>
        </View>

        <View style={style.total}>
          <CurrencyText value={total}></CurrencyText>
        </View>
      </View>
    </View>
  );
};

export default NormalServiceItem;
