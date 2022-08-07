import React from 'react'
import { StyleSheet, View, ScrollView,TextInput } from "react-native";
import NotificationItem from '~components/NotificationItem';
import useThemeStyles from '~hooks/useThemeStyles';

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 5,
    flexDirection: "column",
    justifyContent: "center"
  },
  content:{
    flexGrow:1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
})

const NotificationTab = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
      <ScrollView  contentContainerStyle={style.content}>
        <NotificationItem />
      </ScrollView>
    </View >
  )
}
export default NotificationTab