import React from 'react'
import { Image, View,StyleSheet } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';

const styles = (theme) => StyleSheet.create({
    lg: {
        width: 60,
        height: 60,
    },
    md: {
        width: 40,
        padding: 40,
    },
    sm: {
        width: 20,
        padding: 20,
    },
    ssm:{
        width: 15,
        padding: 15,
    },
    circle:{
        borderRadius: 50,
    },
    square:{
        borderRadius: 5,
    }
})

const AvatarComponent = ({
    containerAvatarStyle,
    avatarStyle,
    size = "md",
    type="circle",
    img="https://reactnative.dev/img/tiny_logo.png" ,
    ...other}) => {

    const style = useThemeStyles(styles);
    return ( 
        <View style={[containerAvatarStyle]}>
            <Image 
                style={[avatarStyle,style[size],style[type]]}
                source={{
                    uri: img,
                }}
            />
        </View>
    );
}

export default AvatarComponent;