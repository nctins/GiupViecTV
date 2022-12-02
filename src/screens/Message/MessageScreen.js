import React from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar } from "react-native";
import Header from '~components/Header';
import useThemeStyles from '~hooks/useThemeStyles';
import TabNavigatorMessage from './TabNavigatorMessage';

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

const MessageScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <SafeAreaView  style={{flex:1}}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
      <Header style={style.header} title="Message" />
      <TabNavigatorMessage />
    </SafeAreaView >
  )
}
export default MessageScreen