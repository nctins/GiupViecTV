import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView,TouchableOpacity, RefreshControl } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { EditIcon } from '~components/Icons';
import TimeComponent from '~components/TimeComponent';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import {POST_STATE, POST_TYPE} from "../../constants/app_contants";

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

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const TimeTab = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orders,setOrders] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getOrder();
    });
  }, []);

  useEffect(() => {
    getOrder();
  },[])

  const getOrder = () => {
    authAxios
      .get("posts")
      .then( (response) => {
        let arrOrder = response.data.data;
        arrOrder = arrOrder.filter((e) => {
          return e.post_state == POST_STATE.PROCESSING && e.post_type == POST_TYPE.HOURLY;
        });
        // console.log(response.data.data);
        setOrders(arrOrder);
      })
      .catch( (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }

  const displayOrders = () => {
    return orders.map((e,index) => {
      return <TimeComponent key={index} order={e} navigation={navigation} />
    })
  }

  return (
    <View style={style.default}>
      <View style={style.viewItem}>
        <View style={style.titleView}>
          <Typography variant="Description" style={{marginLeft: 0}}>{orders.length} đơn hàng</Typography>
          {/* <TouchableOpacity onPress={() => {}}>
            <EditIcon />
          </TouchableOpacity> */}
        </View>
        <ScrollView  
          contentContainerStyle={style.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {displayOrders()}
        </ScrollView>
      </View>
    </View >
  )
}
export default TimeTab