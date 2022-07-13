import React from "react";
import { BgImageLayout } from "~components/Layout";
import * as Icons from "~components/Icons";
import { SIGNUP_BG } from "assets/images";
import { View } from "react-native";
import { TextInput } from "~components/Inputs";

const Step1 = () => {
  return (
    <BgImageLayout background={SIGNUP_BG}>
      <View style={{ flex: 1, alignItems:'center'}}>
        <TextInput placeholder="hello touch here to edit" isPassword title={"Password"}/>
      </View>
    </BgImageLayout>
  );
};

export default Step1;
