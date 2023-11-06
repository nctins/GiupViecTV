import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, ScrollView,TextInput, RefreshControl } from "react-native";
import CartItem from '~components/CartItem';
import useThemeStyles from '~hooks/useThemeStyles';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import {POST_STATE} from "../../constants/app_contants";
import { useFocusEffect } from "@react-navigation/native";

const styles = (theme) => StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    flexDirection: "column",
    justifyContent: "center"
  },
  content:{
    flexGrow:1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  TextInputView: {
    width: "100%",
    flexDirection:"row",
    justifyContent: "center"
  },
  textInput: {
    width: "90%",
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: theme.colors.Gray[1],
    marginTop: 10,
    marginBottom: 10,
  },
})

const OrderTab1 = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orders,setOrders] = useState([]);

  const onRefresh = React.useCallback(() => {getOrder();}, []);

  useFocusEffect(useCallback(()=>{
    getOrder();
  },[]))

  const getOrder = async () => {
    setRefreshing(true);
    authAxios
      .get("posts/helper/currentDate")
      .then(async (response) => {
        let arrOrder = response.data.data;
        arrOrder = arrOrder.filter((e) => {
          return e.post_state === POST_STATE.INCOMPLETE;
        })
        setOrders(arrOrder);
        setRefreshing(false);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
        setRefreshing(false);
      });
  }

  const displayOrders = () => {
    return orders.map((e,index) => {
      return <CartItem key={index} order={e} navigation={navigation} type = {3}></CartItem>
    })
  }

  return (
    <View style={style.default}>
      {/* 
      <View style={style.TextInputView}>
        <TextInput 
          style={style.textInput}
          placeholder="Search"
        />
    </View>
    */}
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
    </View >
  )
}
export default OrderTab1