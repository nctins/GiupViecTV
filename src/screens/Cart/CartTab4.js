import React from 'react'
import { StyleSheet, View, ScrollView } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";

const styles = (theme) => StyleSheet.create({
  default:{
    flex:1,
  },
})

const CartTab4 = () => {
  const style = useThemeStyles(styles);

  return (
    <ScrollView  style={{flex:1}}>
        <Typography variant = "H1" >CartTab4</Typography>
    </ScrollView >
  )
}
export default CartTab4