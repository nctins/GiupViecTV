import React from 'react'
import { Image, View,StyleSheet } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';

const styles = (theme) => StyleSheet.create({
    llg: {
        width: 120,
        height: 120,
    },
    lg: {
        width: 60,
        height: 60,
    },
    md: {
        width: 40,
        height: 40,
    },
    sm: {
        width: 20,
        height: 20,
    },
    ssm:{
        width: 15,
        height: 15,
    },
    circle:{
        borderRadius: 120,
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
    const sizeStyle = style[size] ? style[size] : {width: size, height: size};
    return ( 
        <View style={[containerAvatarStyle]}>
            <Image 
                style={[avatarStyle, sizeStyle, style[type]]}
                source={{
                    uri: img,
                }}
            />
        </View>
    );
}

export default AvatarComponent;