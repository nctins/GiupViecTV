import React from 'react'
import { StyleSheet, View } from "react-native";
import Header from '~components/Header';
import SafeView from '~components/SafeView';
import StatusBar from '~components/StatusBar';
import useThemeStyles from '~hooks/useThemeStyles';
import TabNavigatorHistory from './TabNavigatorHistory';

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

const HistoryScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <>
    <StatusBar/>
    <SafeView>
      <Header title="Lịch sử" />
      <TabNavigatorHistory />
    </SafeView>
    </>
  )
}
export default HistoryScreen