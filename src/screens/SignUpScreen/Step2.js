import React from "react";
import { BgImageLayout } from "~components/Layout";
import { SIGNUP_BG } from "assets/images";
import { StyleSheet, View } from "react-native";
import { TextInput } from "~components/Inputs";
import Button, { IconButton } from "~components/Button";
import { BackIcon } from "~components/Icons";
import Typography from "~components/Typography";
import useTheme from "~hooks/useTheme";
import ObjMapper from "object-mapper";
import useThemeStyles from "~hooks/useThemeStyles";

const Step2 = () => {
  const theme = useTheme();
  const styled = useThemeStyles(styles);
  return (
    <BgImageLayout background={SIGNUP_BG}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <IconButton style={{ margin: 20 }} icon={<BackIcon color="Gray.0" />} />
      </View>
      <View style={[{ flex: 5 }, styled.centerBox]}>
        <TextInput placeholder="Nhập mật khẩu" title={"Mật khẩu"} />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          title={"Xác nhận mật khẩu"}
        />
      </View>
      <View style={{ flex: 2 }}>
        <View style={[{ flex: 3 }, styled.centerBox]}>
          <Button size="lg" isShadow>
            Tiếp theo
          </Button>
        </View>
        <View style={{ flex: 2, alignItems:"center" }}>
          <Typography variant="SubTitle" color="Gray.6">
            Điều khoản và Chính sách
          </Typography>
        </View>
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
      marginTop: 10,
    },
    card: {
      width: 255,
      height: 120,
      borderRadius: 12,
      backgroundColor: ObjMapper.getKeyValue(theme.colors, "Gray.2"),
    },
    centerBox: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Step2;
