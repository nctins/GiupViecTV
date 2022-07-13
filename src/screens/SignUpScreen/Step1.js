import React from "react";
import { BgImageLayout } from "~components/Layout";
import * as Icons from "~components/Icons";
import { SIGNUP_BG } from "assets/images";
import { View } from "react-native";

const Step1 = () => {
  return (
    <BgImageLayout background={SIGNUP_BG}>
      <View style={{ flex: 1}}>
        {/* {Object.values(Icons).map((Element, idx) => {
          return (<Element key={idx} size={"md"} style={{flex:1}}></Element>)
        })} */}
      </View>
    </BgImageLayout>
  );
};

export default Step1;
