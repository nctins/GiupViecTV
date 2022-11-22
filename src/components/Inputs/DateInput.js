import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DateTimePicker,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import useThemeStyles from "~hooks/useThemeStyles";
import { CalendarIcon } from "~components/Icons";

const styles = (theme) =>
  StyleSheet.create({
    input: {
      flexDirection: 'row',
      borderColor: theme.colors.Azure,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 120,
      height: 35,
      padding: 5,
    },
  });

const DateInput = ({value, onChange}) => {

  const showModel = () => {
    DateTimePickerAndroid.open({
      value,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const style = useThemeStyles(styles);
  return (
    <TouchableOpacity
      style={style.input}
      onPress={showModel}
      activeOpacity={1}
    >
      <Text>
        {value.getDate() + "/" + (value.getMonth() + 1)+ "/" + value.getFullYear()}
      </Text>
      <CalendarIcon size="sm"/>
    </TouchableOpacity>
  );
};

export default DateInput;
