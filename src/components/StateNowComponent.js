import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback , ScrollView,TextInput,Animated, Easing } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";

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

const OnStateUI = () => {
    const style = useThemeStyles(styles);
    const scaleCircle = useRef(new Animated.Value(1)).current;
    const opacityCircle = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        Animated.loop(
            Animated.parallel([Animated.timing(scaleCircle, {toValue: 3,duration: 2000,useNativeDriver: true})
                        ,Animated.timing(opacityCircle, {toValue: 0,duration: 2000,useNativeDriver: true})])
        ).start();
    },[scaleCircle,opacityCircle])

    return (
    <Animated.View 
        style={[StyleSheet.absoluteFillObject,
                style.circleView,
                {
                transform: [
                    {
                    scale: scaleCircle,
                    },
                ],
                opacity: opacityCircle
                },
        ]}
    />
    );
}

const StateNowComponent = () => {
  	const style = useThemeStyles(styles);
  	const [stateWork,setStateWord] = useState(false);

	const changeStateWord = () => {
		setStateWord(!stateWork);
  	}

  	return (
		<View style={style.animationView}>
            {stateWork?<OnStateUI /> : null}
            <TouchableWithoutFeedback style={style.circleView} onPress={changeStateWord}>
                <Typography color='BackgroundBlue' variant="H1">{stateWork?"ON":"OFF"}</Typography>
            </TouchableWithoutFeedback>
        </View>
  	)
}
export default StateNowComponent