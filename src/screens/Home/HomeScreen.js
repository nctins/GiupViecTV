import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar, ScrollView } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import AvatarComponent from '~components/AvatarComponent';
import Typography from "~components/Typography";
import HomeNavigator from './HomeNavigator';

const styles = (theme) => StyleSheet.create({
  	default:{
    	flex:1,
    	flexDirection: "column",
  	},
  	statusBar:{
    	backgroundColor: theme.colors.BackgroundBlue,
  	},
  	hiUserView:{
		width: "100%",
		height: 100,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
  	},
  	nameAndAddressView:{
		width: "100%",
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingVertical: 25,
		marginLeft: 10,
  	},
})

const HomeScreen = () => {
  const style = useThemeStyles(styles);

  const images = useState(["https://reactnative.dev/img/tiny_logo.png"])

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
      <View style={style.hiUserView}>
        <AvatarComponent size='lg' />
        <View style={style.nameAndAddressView}>
          <Typography variant="H7">Xin chào, Nguyễn Văn Tèo</Typography>
          <Typography variant="Description" style={{marginLeft: 0}}>KTX khu B, Đông Hòa, Dĩ An, Bình Dương</Typography>
        </View>
      </View>
      <HomeNavigator />
    </View>
  )
}
export default HomeScreen