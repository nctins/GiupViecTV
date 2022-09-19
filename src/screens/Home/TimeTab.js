import React from 'react'
import { StyleSheet, View, ScrollView,TouchableOpacity, TextInput } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { EditIcon } from '~components/Icons';
import TimeComponent from '~components/TimeComponent';

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
		backgroundColor: theme.colors.BackgroundBlue,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
  },
  viewItem:{
    width: "90%",
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  titleView:{
    width:"100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title:{

  },
  mainView:{
    flexGrow: 1,
    alignItems:"center"
  }
})

const TimeTab = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
      <View style={style.viewItem}>
        <View style={style.titleView}>
          <Typography variant="Description" style={{marginLeft: 0}}>50 đơn hàng</Typography>
          <TouchableOpacity onPress={() => {}}>
            <EditIcon />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={style.mainView}>
          <TimeComponent />
          <TimeComponent />
          <TimeComponent />
          <TimeComponent />
        </ScrollView>
      </View>
    </View >
  )
}
export default TimeTab