import React from 'react';
import { View } from "react-native"
import Typography from "~components/Typography";

const Header = (props) => {
    return (
        <View style={props.style.default}>
            <Typography variant = "H1" style={props.style.title}>{props.title}</Typography>
        </View>
    );
}

export default Header;