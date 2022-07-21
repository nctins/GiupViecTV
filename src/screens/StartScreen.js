import React from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar } from "react-native";
// import Svg, { Path } from "react-native-svg"
import useThemeStyles from '~hooks/useThemeStyles';

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
  }
})

const StartScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <SafeAreaView  style={{flex:1}}>
    </SafeAreaView >
  )
}
export default StartScreen