import React from 'react'
import { StyleSheet, View, ScrollView,TextInput } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    flexDirection: "column",
    justifyContent: "center"
  },
})

const TimeTab = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
    </View >
  )
}
export default TimeTab