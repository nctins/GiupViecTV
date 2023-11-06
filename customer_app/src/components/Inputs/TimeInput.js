import React, { useEffect, useState } from "react";
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

const TimeInput = ({auto_completed=true, value=null, ...props}) => {
  const current = new Date();
  const [date, setDate] = useState(null);
  useEffect(()=>{
    if (auto_completed) {
      const init = value || current;
      setDate(init);
    } else {
      setDate(value);
    }
  }, [value, date])

  const onChange = (event, selectedDate) => {
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    if (event.type === 'set') {
      if ( props.onChange) {
        props.onChange(selectedDate);
      }
      console.log(selectedDate.getMiliseconds());
      console.log(selectedDate.toTimeString());
      setDate(selectedDate);
    } else {
      setDate(null)
    }
  };

  const showModel = () => {
    DateTimePickerAndroid.open({
      value: date || current,
      onChange,
      mode: "time",
      is24Hour: true,
    });
  };


  const style = useThemeStyles(styles);
  return (
    <TouchableOpacity
      style={[style.input,props.containerStyle]}
      onPress={showModel}
      activeOpacity={1}
    >
      <Text>
        {!date ? "" : date.toLocaleTimeString().slice(0,5)}
      </Text>
      <ClockIcon size="sm"/>
    </TouchableOpacity>
  );
};

export default TimeInput;
