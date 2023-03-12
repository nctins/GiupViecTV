import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import { PlusIcon } from "~components/Icons";

const styles = (theme) =>
  StyleSheet.create({
    align: {
      position: "absolute",
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      right: 30,
      bottom: 30,
    },
    button: {
      height: 60,
      width: 60,
      borderRadius: 100,
      backgroundColor: theme.colors.Azure,
      alignItems: "center",
      justifyContent: "center",
    },
  });

const ActionButton = ({ onPress = () => {}, icon = <PlusIcon color="Gray.0" /> }) => {
  const style = useThemeStyles(styles);
  return (
    <View style={style.align}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={style.button}>
            {icon}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ActionButton;
