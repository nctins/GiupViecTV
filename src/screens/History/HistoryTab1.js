import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView,TextInput, RefreshControl } from "react-native";
import CartItem from '~components/CartItem';
import useThemeStyles from '~hooks/useThemeStyles';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import {POST_STATE} from "../../constants/app_contants";

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

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HistoryTab1 = ({navigation}) => {
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

  const getOrder = async () => {
    authAxios
      .get("posts/helper")
      .then(async (response) => {
        let arrOrder = response.data.data;
        arrOrder = arrOrder.filter((e) => {
          return e.post_state === POST_STATE.COMPLETE;
        });
        setOrders(arrOrder);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
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
export default HistoryTab1