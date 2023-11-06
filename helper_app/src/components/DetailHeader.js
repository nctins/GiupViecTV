import { View, StyleSheet } from 'react-native';
import React from 'react';
import { BackIcon } from './Icons';
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from './Typography';

const styles = (theme) => StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.BackgroundBlue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {flex:1, justifyContent:"center", alignItems:"center"},
  title_text: {
    color: theme.colors.Gray[0],
    height: 30,
    textAlignVertical: "center",
    paddingTop: 6,
  },
})

const DetailHeader = ({navigation, title, onBack = null}) => {
  const style = useThemeStyles(styles);

  const goBack = () => {
    if (onBack) {
      return onBack();
    }
    return navigation.goBack();
  }

  return (
    <View style={style.wrapper}>
      <BackIcon color="Gray.0" onPress={() => goBack()} size={16}/>
      <View style={style.title}>
        <Typography variant="H6" style={style.title_text}>{title}</Typography>
      </View>
    </View>
  )
}

export default DetailHeader