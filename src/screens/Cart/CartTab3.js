import React, {useState, useEffect, useContext, useCallback} from 'react'
import { StyleSheet, View, ScrollView,TextInput, RefreshControl } from "react-native";
import CartItem from '~components/CartItem';
import useThemeStyles from '~hooks/useThemeStyles';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import LoadingScreen from '../LoadingScreen';
import {POST_STATE} from "../../constants/app_contants";
import { useFocusEffect } from '@react-navigation/native';

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


const CartTab3 = ({navigation}) => {
  const style = useThemeStyles(styles);
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const [posts,setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getPosts();
    });
  }, []);

  // useEffect(() => {
  //   getPosts();
  // },[]);
  
  useFocusEffect(useCallback(()=>{
    getPosts();
  },[]))

  const getPosts = () => {
    // setIsLoading(true);
    setRefreshing(true);
    authAxios
      .get("posts")
      .then(async (response) => {
        let arrPost = response.data.data;
        arrPost = arrPost.filter(e => {
          return e.post_state === POST_STATE.COMPLETE
        })
        setPosts(arrPost);
        // setIsLoading(false);
        setRefreshing(false);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
        // setIsLoading(false);
        setRefreshing(false);
      });
  }

  const displayPost = () => {
    return posts.map((e,index) => {
      return <CartItem key={index} post={e} navigation={navigation} type = {e.post_state}></CartItem>
    })
  }

  return (
    <View style={style.default}>
      {isLoading ? <LoadingScreen /> : null}
      <View style={style.TextInputView}>
        {/* 
          <TextInput 
            style={style.textInput}
            placeholder="Search"
          />
        */}
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
      {displayPost()}
      </ScrollView>
    </View >
  )
}
export default CartTab3