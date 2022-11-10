import React, {useState, useEffect}  from 'react'
import { StyleSheet, View, ScrollView,TextInput } from "react-native";
import CartItem from '~components/CartItem';
import useThemeStyles from '~hooks/useThemeStyles';

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

const CartTab1 = ({navigation}) => {
  const style = useThemeStyles(styles);
  const [lstCart,setLstCart] = useState([]);
    useEffect(() => {
    //   publicAxios
    //     .post("http://10.0.2.2:6969/auth/customer/signin", {
    //       email: email,
    //       password: password,
    //     })
    //     .then(async (response) => {
    //       const { token, refreshToken } = response.data;
    //       authContext.setAuthState({
    //         accessToken: token,
    //         refreshToken,
    //         authenticated: true,
    //       });
    //       // await SecureStore.setItemAsync("token", JSON.stringify({ token, refreshToken }));
    //       setEmail("");
    //       setPassword("")
    //       navigation.push('HomeScreen', { params: 'example' })
    //     })
    //     .catch(async (error) => {
    //       if (error.response) {
    //         console.log(error.response.data);
    //       }
    //     });
  });

  return (
    <View style={style.default}>
      <View style={style.TextInputView}>
        <TextInput 
          style={style.textInput}
          placeholder="Search"
        />
      </View>
      <ScrollView  contentContainerStyle={style.content}>
        <CartItem navigation={navigation} type = {1}></CartItem>
        <CartItem navigation={navigation} type = {1}></CartItem>
        <CartItem navigation={navigation} type = {1}></CartItem>
      </ScrollView>
    </View >
  )
}
export default CartTab1