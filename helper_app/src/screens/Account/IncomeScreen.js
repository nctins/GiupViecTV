import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, StatusBar, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import { TextInput } from "~components/Inputs";
import Button from "~components/Button";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import LoadingScreen from "~screens/LoadingScreen";
import SafeView from "~components/SafeView";
import DetailHeader from "~components/DetailHeader";
import IncomeComponent from "~components/IncomeComponent";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[0],
      flexDirection: "column",
    },
    header: {
      width: "100%",
      height: 90,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      flex: 1,
    },
    title: {
      marginLeft: 15,
      color: "white",
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    textArea: {
      marginTop: 10,
      padding: 10,
      width: 350,
      borderWidth: 1,
      fontSize: 15,
      borderColor: theme.colors.Azure,
    },
  });

const IncomeScreen = ({navigation}) => {
    const style = useThemeStyles(styles);
    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext)
    const user = authContext.authState.user;
    const [isLoading, setIsLoadding] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      getHelperIncome();
    },[])

    const getHelperIncome = () => {
      setIsLoadding(true);
      authAxios
      .get("helper/" + user.id + "/helper_income")
      .then(async (response) => {
        let helper_income = response.data.data;
        // console.log(helper_income);
        setData(helper_income);
        setIsLoadding(false);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
        setIsLoadding(false);
      });
    }

  return (
    <SafeView>
      <TouchableWithoutFeedback style={{flex:1}} onPress={() => {Keyboard.dismiss();}}>
        <ScrollView style={style.default}>
          {isLoading ? <LoadingScreen /> : null}
          <DetailHeader title="Thu nhập" navigation={navigation} />
          <View style={{ flex: 7 }}>
            {data.map((e, idx) => {
                return <IncomeComponent key={idx} navigation={navigation} data={e} setIsLoadding={setIsLoadding} />
            })}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeView>
  );
};

export default IncomeScreen;
