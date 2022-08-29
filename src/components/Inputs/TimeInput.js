import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DateTimePicker,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import useThemeStyles from "~hooks/useThemeStyles";
import { ClockIcon } from "~components/Icons";

const styles = (theme) =>
  StyleSheet.create({
    input: {
      flexDirection: 'row',
      borderColor: theme.colors.Azure,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 90,
      height: 35,
      padding: 5,
    },
  });

const TimeInput = (props) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(date.toTimeLocalString())
  };

  const showModel = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "time",
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
        {date.toLocaleTimeString().slice(0,5)}
      </Text>
      <ClockIcon size="sm"/>
    </TouchableOpacity>
  );
};

export default TimeInput;
