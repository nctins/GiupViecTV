import React, { useEffect, useState } from "react";
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

const DateInput = ({ value = null, auto_completed = true, ...props }) => {
  const current = new Date();
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (auto_completed) {
      const init = value || current;
      setDate(init);
    } else {
      setDate(value);
    }
  }, [value, date])

  const onChange = (event, selectedDate) => {
    selectedDate.setHours(0,0,0,0);
    if(event.type === 'set') {
      if (props.onChange) {
        props.onChange(selectedDate);
      }
      setDate(selectedDate);
    } else {
      setDate(null);
    }
  };

  const showModel = () => {
    DateTimePickerAndroid.open({
      value: date || current,
      onChange,
      mode: "date",
      is24Hour: true,
      minimumDate: current,
    });
  };

  const style = useThemeStyles(styles);
  return (
    <TouchableOpacity
      style={[style.input, props.containerStyle]}
      onPress={showModel}
      activeOpacity={1}
    >
      <Text>
        {!date ?
          ""
          : `${date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}`
        }
      </Text>
      <CalendarIcon size="sm" />
    </TouchableOpacity>
  );
};

export default DateInput;
