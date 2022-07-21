import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar } from "react-native";
// import Svg, { Path } from "react-native-svg"
import Header from '~components/Header';
import useThemeStyles from '~hooks/useThemeStyles';
import TabNavigator from './TabNavigator';

// const WaveLine = (props) => (
//   <View>
//     <Svg height="100%" width="100%" viewBox="0 0 500 700" preserveAspectRatio="xMinYMin meet" {...props}>
//       <Path transform="translate(500,100), scale(-1, 1)"
//         d="M0 150c100 50 350-170 500 0V-400H0Z"
//         style={{
//           stroke: "none",
//           fill: props.color,
//         }}
//       />

//       <Path transform="translate(0,750), scale(1, -1)"
//         d="M0 150c100 50 350-170 500 0V-250H0Z"
//         style={{
//           stroke: "none",
//           fill: props.color,
//         }}
//       >
//         <Typography variant = "h2"color="red">abc</Typography>
//       </Path>
//     </Svg>
//   </View>
// )

const styles = (theme) => StyleSheet.create({
  default:{
    flex:1,
  },
  statusBar:{
    backgroundColor: theme.colors.BackgroundBlue,
  },
  header:{
    default: {
      width: "100%",
      height: "15%" ,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    title:{
      color: "white",
    }
    
  }
})

const Tab = createMaterialTopTabNavigator();

const CartScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <SafeAreaView  style={{flex:1}}>
        <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
        <Header style={style.header} title="Đơn hàng" />
        <TabNavigator />
    </SafeAreaView >
  )
}
export default CartScreen