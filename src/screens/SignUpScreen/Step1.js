import React from "react";
import { BgImageLayout } from "~components/Layout";
import * as Icons from "~components/Icons";
import { SIGNUP_BG } from "assets/images";
import { View } from "react-native";
import { TextInput } from "~components/Inputs";
import Button, { IconButton } from "~components/Button";
import { BackIcon } from "~components/Icons";
import Typography from "~components/Typography";

const Step1 = () => {
  return (
    <BgImageLayout background={SIGNUP_BG}>
      <View style={{alignItems:"flex-start"}}>
        <IconButton style={{margin: 20}} icon={<BackIcon color="Gray.0" />} />
      </View>
      <View style={{alignItems:"center", marginVertical:20}}>
        <Typography variant="H5" color="Gray.0" >Đăng ký</Typography>
      </View>
      <View style={{alignItems: "center" }}>
        <TextInput
          placeholder="Hứa không gửi email spam"
          title={"Email"}
        />
        <TextInput
          placeholder="Mọi người liên lạc bạn theo số này nè"
          title={"Số điện thoại"}
        />
        <TextInput
          placeholder="Bạn thích mọi người gọi bạn là gì ?"
          title={"Tên"}
        />
      </View>
      <View style={{alignItems:"center"}}>
        <Button size="lg">
          Tiếp theo
        </Button>
      </View>
    </BgImageLayout>
  );
};

export default Step1;
