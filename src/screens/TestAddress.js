import React, { useContext, useState } from "react";
import { BgImageLayout } from "~components/Layout";
import { LOGIN_BG } from "assets/images";
import Button from "~components/Button";
import Typography from "~components/Typography";
import { TextInput } from "~components/Inputs";
import { Pressable, View, Alert } from "react-native";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import { API_GOOGLE } from "../constants/api";

const TestAddress = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  
  const getDistance = async () => {
    publicAxios
      .post("https://addressvalidation.googleapis.com/v1:validateAddress?key=" + API_GOOGLE, {
        address: {
            regionCode: "US",
            locality: "Mountain View",
            addressLines: ["1600 Amphitheatre Pkwy"]
        }
      })
      .then(async (response) => {
        console.log(response);
      })
      .catch(async (error) => {
        console.log(error.response);
      });
  };

  return (
    <BgImageLayout background={LOGIN_BG}>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Typography variant="H4" color="Gray.8" style={{ marginBottom: 10 }}>
          Địa chỉ
        </Typography>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{ marginBottom: 20 }}
            value={origin}
            onChangeText={(text) => setOrigin(text)}
          />
          <TextInput
            style={{ marginBottom: 20 }}
            value={destination}
            onChangeText={(text) => setDestination(text)}
          />
        </View>
        <Button variant="primary" size="sm" onPress={() => getDistance()}>
          get distance
        </Button>
      </View>
    </BgImageLayout>
  );
};

export default TestAddress;
