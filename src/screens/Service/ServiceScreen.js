import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import ProcessNavComponent from "~components/ProcessNavComponent";
import { PlusIcon } from "~components/Icons";
import { NormalServiceItem } from "~components/ServiceItem";
import { DateInput, TimeInput, TextInput } from "~components/Inputs";
import Button from "~components/Button";

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[1],
      flexDirection: "column",
    },
    header: {
      width: "100%",
      height: 90,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 15,
      flex: 1,
    },
    footer:{
      wrapper:{
        flex: 1, 
        backgroundColor: theme.colors.BackgroundBlue,
      },
      title:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      },
      button: {
        flex: 2,
        justifyContent:'center',
        alignItems:'center',
      }
    },
    title: {
      marginLeft: 15,
      color: "white",
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    actionButton: {
      color: theme.colors.Azure,
      style: {
        ...theme.shadow,
      },
    },
    content: {
      backgroundColor: theme.colors.Gray[0],
    },
    dateTimeInput: {
      flex:1,
      justifyContent:'flex-start',
    },
    sectionBody:{
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: 20,
      flexDirection: 'row',
    },
    textArea:{
      borderWidth: 1,
      borderColor: theme.colors.BackgroundBlue,
      width: 340,
    }
  });

const ServiceScreen = () => {
  const style = useThemeStyles(styles);

  return (
    <View style={style.default}>
      <StatusBar backgroundColor={style.statusBar.backgroundColor} />
      <View style={style.header}>
        <Typography variant="H5" style={style.title}>
          Giúp việc nhà theo giờ
        </Typography>
      </View>
      <View style={{ flex: 5 }}>
        <View style={{ flex: 1, marginTop: 20 }}>
          <ProcessNavComponent />
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <ScrollView style={style.content}>
            <Section title="Dịch vụ">
              <NormalServiceItem
                title="Dọn phòng khách"
                description="Dịch vụ dọn phòng khách bao gồm lau dọn, quét màng nhện phòng khách"
                priceInfo={{
                  calcBy: {
                    title: "Diện tích",
                    unitTitle: "m2",
                  },
                  unitPrice: {
                    title: "VNĐ/m2",
                    num: "12.000",
                  },
                }}
              />
              <NormalServiceItem
                title="Dọn phòng bếp"
                description="Dịch vụ dọn nhà bếp bao gồm lau dọn, quét màng nhện nhà bếp"
                priceInfo={{
                  calcBy: {
                    title: "Diện tích",
                    unitTitle: "m2",
                  },
                  unitPrice: {
                    title: "VNĐ/m2",
                    num: "10.000",
                  },
                }}
              />
            </Section>
            <Section title="Dịch vụ thêm">
              <NormalServiceItem
                title="Lau dọn bàn ghế"
                priceInfo={{
                  calcBy: {
                    title: "Số lượng",
                    unitTitle: "cái",
                  },
                  unitPrice: {
                    title: "VNĐ/cái",
                    num: "10.000",
                  },
                }}
              />
            </Section>
            <Section title="Thời gian">
              <View style={style.sectionBody}>
                <View style={style.dateTimeInput}>
                  <Typography style={{marginBottom: 5}}>Ngày:</Typography>
                  <DateInput/>
                </View>
                <View style={style.dateTimeInput}>
                  <Typography style={{marginBottom: 5}}>Giờ:</Typography>
                  <TimeInput/>
                </View>
              </View>
            </Section>
            <Section title="Ghi chú">
              <View style={[style.sectionBody]}>
                <TextInput
                  style={style.textArea}
                  placeholder="Ghi chú thêm"
                  titleStyle="blackTitle"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </Section>
          </ScrollView>
        </View>
      </View>
      <View style={style.footer.wrapper}>
        <View style={style.footer.title}>
          <Typography variant="H6" color="Gray.0">Tổng tiền:</Typography>
          <Typography variant="H6" color="Gray.0">500.000 VNĐ</Typography>
        </View>
        <View style={style.footer.button}>
          <Button variant="secondary" size="sm">Tiếp theo</Button>
        </View>
      </View>
    </View>
  );
};

const sectionStyle = (theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.Gray[0],
      marginTop: 10
    },
    header: {
      height: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      borderBottomColor: theme.colors.Gray[3],
      borderBottomWidth: 1,
    },
    body: {
    },
  });

const Section = ({ title = "", children }) => {
  const style = useThemeStyles(sectionStyle);
  return (
    <View style={style.wrapper}>
      <View style={style.header}>
        <Typography variant="Subtitle">{title}</Typography>
        <PlusIcon size="sm" color="Gray.10" />
      </View>
      <View style={style.body}>{children}</View>
    </View>
  );
};

export default ServiceScreen;
