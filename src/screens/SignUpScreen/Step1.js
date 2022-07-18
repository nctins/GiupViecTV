import React from "react";
import { BgImageLayout } from "~components/Layout";
import * as Icons from "~components/Icons";
import { SIGNUP_BG } from "assets/images";
import { StyleSheet, View } from "react-native";
import { TextInput } from "~components/Inputs";
import Button, { IconButton } from "~components/Button";
import { BackIcon, FacebookIcon, GoogleIcon } from "~components/Icons";
import Typography from "~components/Typography";
import useTheme from "~hooks/useTheme";
import ObjMapper from "object-mapper";
import useThemeStyles from "~hooks/useThemeStyles";

const Step1 = () => {
  const theme = useTheme();
  const styled = useThemeStyles(styles);
  return (
    <BgImageLayout background={SIGNUP_BG}>
      <View style={{ alignItems: "flex-start" }}>
        <IconButton style={{ margin: 20 }} icon={<BackIcon color="Gray.0" />} />
      </View>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Typography variant="H5" color="Gray.0">
          Đăng ký
        </Typography>
      </View>
      <View style={{ alignItems: "center", marginTop:30 }}>
        <TextInput placeholder="Hứa không gửi email spam" title={"Email"} />
        <TextInput
          placeholder="Mọi người liên lạc bạn theo số này nè"
          title={"Số điện thoại"}
        />
        <TextInput
          placeholder="Bạn thích mọi người gọi bạn là gì ?"
          title={"Tên"}
        />
      </View>
      <View style={{ alignItems: "center", marginTop:50 }}>
        <View style={styled.card}>
          <Typography style={styled.cardTitle}>Đăng ký với</Typography>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styled.circleIcon}>
              <FacebookIcon />
            </View>
            <View style={styled.circleIcon}>
              <GoogleIcon />
            </View>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop:50 }}>
        <Button size="lg" isShadow>
          Tiếp theo
        </Button>
      </View>
    </BgImageLayout>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    circleIcon: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: ObjMapper.getKeyValue(theme.colors, "Gray.0"),
      borderRadius: 100,
      width: 60,
      height: 60,
      marginTop: 10,
      ...theme.shadow,
    },
    cardTitle: {
      alignSelf: "center",
      color: ObjMapper.getKeyValue(theme.colors, "Gray.9"),
      marginTop: 10
    },
    card: {
      width: 255,
      height: 120,
      borderRadius: 12,
      backgroundColor: ObjMapper.getKeyValue(theme.colors, "Gray.2"),
    },
  });

export default Step1;
