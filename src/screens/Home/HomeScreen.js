import React, { useState, useContext, useEffect, useRef } from 'react'
import { StyleSheet, View, SafeAreaView,StatusBar, ScrollView, Animated, Easing } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import AvatarComponent from '~components/AvatarComponent';
import Typography from "~components/Typography";
import HomeNavigator from './HomeNavigator';
import { AuthContext } from "~contexts/AuthContext";

const styles = (theme) => StyleSheet.create({
  	default:{
    	flex:1,
    	flexDirection: "column",
		backgroundColor: theme.colors.BackgroundBlue,
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
		marginTop: 20,
  	},
  	nameAndAddressView:{
		width: "100%",
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingVertical: 10,
		marginLeft: 5,
		
  	},
	marqueeTextContainer: {
		overflow: "hidden",
		width: '250%',
	},
	marqueeText: {
		fontSize: 15,
		fontWeight: 'bold',
		textAlign: 'left',
		textAlignVertical: 'center',
	},
})

const HomeScreen = () => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const user = authContext.authState.user;
  const [textWidth, setTextWidth] = useState(0);
  const [anim] = useState(new Animated.Value(0));
  const speed = 3;
  const width = 100;
  const [index, setIndex] = useState(0);
  const text = user.address + "                ";

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % text.length);
    }, 150);
    return () => clearInterval(interval);
  }, [text.length]);

  const rotatedText = text.slice(index) + text.slice(0, index);

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor}/>
      <View style={style.hiUserView}>
        <AvatarComponent img={user.avatar_url} size='lg' />
        <View style={style.nameAndAddressView}>
			<Typography variant="H7">Xin chào, {user.name}</Typography>
			<Typography variant="Description" style={{marginLeft: 0}}>{user.email}</Typography>
			<Typography variant="Description" style={{marginLeft: 0}}>{user.phone}</Typography>
			<View style={style.marqueeTextContainer}>
				<Animated.Text style={[style.marqueeText]}>
					{rotatedText}
				</Animated.Text>
			</View>
        </View>
      </View>
      <HomeNavigator />
    </View>
  )
}
export default HomeScreen
