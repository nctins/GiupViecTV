import React, { useState } from 'react'
import { StyleSheet, View, Pressable , ScrollView,TextInput, Easing } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { MotiView } from 'moti';

const styles = (theme) => StyleSheet.create({
  	default: {
    	flex: 1,
		backgroundColor: theme.colors.BackgroundBlue,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
  	},
	circleView: {
		width: 150,
		height: 150,
		borderRadius: 100,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	animationView:{
		width: 150,
		height: 150,
		borderRadius: 100,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	animation:{
		width: 150,
		height: 150,
		borderRadius: 100,
		backgroundColor: "white",
	}
})

const NowTab = () => {
  	const style = useThemeStyles(styles);
  	const [stateWork,setStateWord] = useState(true);

	const changeStateWord = () => {
		setStateWord(!stateWork);
  	}

  	return (
		<View style={style.default}>
			<View style={style.animationView}>
				{[...Array(3).keys()].map(index => {
					return ( 
						<MotiView>
							from={{opacity: 1, scale: 1}}
							animation={{opacity:0, scale: 3}}
							transition={{
								type: 'timing',
								duration: 2000,
								easing: Easing.out(Easing.ease),
								loop: true,
							}}
							key={index}
							style={[StyleSheet.absoluteFillObject,style.animation]}
						</MotiView>
					)
				})}
				<Pressable style={style.circleView} onPress={changeStateWord}>
					<Typography color='BackgroundBlue' variant="H1">{stateWork?"ON":"OFF"}</Typography>
				</Pressable>
			</View>
		</View >
  	)
}
export default NowTab