import React from 'react';
import { View, StyleSheet } from "react-native"
import Typography from "~components/Typography";
import useThemeStyles from '~hooks/useThemeStyles';

const styles = (theme) => StyleSheet.create({
  wrapper: {
    width: "100%",
    minHeight: 50,
    backgroundColor: theme.colors.BackgroundBlue,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: theme.colors.Gray[0]
  }
})

const Header = (props) => {
    const style = useThemeStyles(styles);
    return (
        <View style={style.wrapper}>
            <Typography variant = "H2" style={style.title}>{props.title}</Typography>
        </View>
    );
}

export default Header;