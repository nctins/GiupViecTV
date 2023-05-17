import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { PlusIcon } from "~components/Icons";
import { NormalServiceItem, RadioServiceItem } from "~components/ServiceItem";
import { DateInput, TimeInput, TextInput } from "~components/Inputs";
import Button from "~components/Button";
import { AxiosContext } from "~contexts/AxiosContext";
import { SERVICE_TYPE, INPUT_FORMAT, POST_TYPE } from "~constants/app_contants";
import useServiceContext from "~hooks/useServiceContext";
import CurrencyText from "~components/CurrencyText";
import DateFormater from "~utils/Dateformater";

const styles = (theme) =>
  StyleSheet.create({
    content: {
      flex: 7,
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 10,
      backgroundColor: theme.colors.Gray[0]
    },
    footer: {
      wrapper: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.colors.BackgroundBlue,
      },
      title: {
        // flex: 1,
        height: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
      },
      button: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
      },
    },
    dateTimeInput: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    dateTimeItem: {
      justifyContent: "flex-start",
      marginVertical: 3,
    },
    sectionBody: {
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: 20,
      flexDirection: "column",
    },
    textArea: {
      borderWidth: 1,
      borderColor: theme.colors.BackgroundBlue,
      width: 340,
    },
  });

const ServiceScreen = () => {
  const style = useThemeStyles(styles);
  // const { authAxios } = useContext(AxiosContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalServiceType, setModalServiceType] = useState(SERVICE_TYPE.NORMAL);
  const { post, setPostData, post_type, controller } = useServiceContext();
  const { services } = post;
  const [note, setNote] = useState(post.note);

  const ServiceItems = ({ serviceType }) => {
    return Object.entries(services).map(
      ([service_id, { is_select, service_init }], idx) => {
        if (is_select && service_init.service_type == serviceType) {
          return service_init.input_format == INPUT_FORMAT.RADIO ? (
            <RadioServiceItem key={idx} serviceId={service_id} />
          ) : (
            <NormalServiceItem key={idx} serviceId={service_id} />
          );
        }
      }
    );
  };

  const displayEndTime = () => {
    const end_time = post.end_time;
    if(!end_time) {
      return "";
    } 
    return `${end_time.toTimeString().substring(0, 5)}, ${DateFormater(end_time)}`
  }

  return (
    <View style={style.content}>
      <View
        style={{
          flex: 5,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ScrollView>
          <Section
            title="Dịch vụ"
            onPressBtn={() => {
              setModalServiceType(SERVICE_TYPE.NORMAL);
              setModalVisible(true);
            }}
          >
            <ServiceItems serviceType={SERVICE_TYPE.NORMAL} />
          </Section>
          <Section
            title="Dịch vụ thêm"
            onPressBtn={() => {
              setModalServiceType(SERVICE_TYPE.BONUS);
              setModalVisible(true);
            }}
          >
            <ServiceItems serviceType={SERVICE_TYPE.BONUS} />
          </Section>
          <Section title="Thời gian" showBtn={false}>
              <View style={style.sectionBody}>
                <View style={style.dateTimeItem}>
                  <Typography style={{ marginBottom: 5 }}>Bắt đầu vào lúc:</Typography>
                  <View style={style.dateTimeInput}>
                    <TimeInput
                      value={post.time}
                      onChange={(selectedTime) => {
                        setPostData({ time: selectedTime });
                      }}
                      containerStyle={{ flex: 1, marginEnd: 20 }}
                    />
                    <DateInput
                      value={post.date}
                      onChange={(selectedTime) => {
                        setPostData({ date: selectedTime });
                      }}
                      containerStyle={{flex: 2}}
                    />
                  </View>
                </View>
                <View style={style.dateTimeItem}>
                  <Typography style={{ marginBottom: 5 }}>Dự kiến kết thúc vào lúc :</Typography>
                  <View
                    style={[
                      style.textArea,
                      { 
                        height: 35, 
                        backgroundColor: "#f0f0f0", 
                        justifyContent: "center",
                        borderRadius: 5,
                        padding: 5
                      }
                    ]} 
                  >
                    <Typography>{displayEndTime()}</Typography>
                  </View>
                </View>
                <View style={style.dateTimeItem}>
                  <Typography style={{ marginBottom: 5 }}>Tổng thời gian làm việc (dự kiến) : {post.total_estimate_time} phút</Typography>
                </View>
              </View>
          </Section>
          <Section title="Ghi chú" showBtn={false}>
            <View style={[style.sectionBody]}>
              <TextInput
                style={style.textArea}
                placeholder="Ghi chú thêm"
                titleStyle="blackTitle"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={note}
                onChangeText={(text) => setNote(text)}
                onEndEditing={() => {
                  setPostData({ note: note });
                }}
              />
            </View>
          </Section>
        </ScrollView>
      </View>
      <View style={style.footer.wrapper}>
        <View style={style.footer.title}>
          <Typography variant="H6" color="Gray.0" style={{height: 30, padding: 5}}>
            Tổng cộng:
          </Typography>
          <CurrencyText value={post.total} variant="H6" color="Gray.0" style={{height: 30, padding: 5}}/>
        </View>
        <View style={style.footer.button}>
          <Button variant="secondary" size="modalBtn" onPress={()=>controller.goToPaymentScreen()}>
            Tiếp theo
          </Button>
        </View>
      </View>
      <ModalService
        visible={modalVisible}
        setVisible={setModalVisible}
        services={services}
        serviceType={modalServiceType}
        onSelectItem={(service_id) => {
          const new_services = {
            ...services,
            [service_id]: {
              ...services[service_id],
              is_select: true,
            },
          };
          const { service_init } = services[service_id];
          if (service_init.input_format == INPUT_FORMAT.RADIO) {
            const new_total = post.total + service_init.items[0].unit_price;
            const new_post_estimate_time = post.total_estimate_time + service_init.items[0].estimate_time;
            setPostData({ 
              services: new_services, 
              total: new_total, 
              total_estimate_time: new_post_estimate_time 
            });
          } else {
            setPostData({ services: new_services });
          }
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const modalStyle = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.Transparency,
    },
    modalView: {
      margin: 10,
      backgroundColor: theme.colors.Gray[0],
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: 250,
      width: 320,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalItem: {
      borderBottomWidth: 2,
      width: 280,
      borderColor: theme.colors.Gray[2],
      justifyContent: "center",
      alignItems: "center",
      height: 40,
    },
  });

const ModalService = ({
  setVisible,
  visible,
  services,
  serviceType,
  onSelectItem,
}) => {
  const style = useThemeStyles(modalStyle);
  const Item = ({ children, data }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          onSelectItem(data.service_id);
        }}
      >
        <View style={style.modalItem}>
          <Typography variant="Subtitle">{children}</Typography>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <TouchableWithoutFeedback
        onPress={() => {
          setVisible(false);
        }}
      >
        <View style={style.centeredView}>
          <TouchableWithoutFeedback>
            <View style={style.modalView}>
              <ScrollView style={{ flex: 1 }}>
                {Object.entries(services).map(
                  ([service_id, { service_init, is_select }]) => {
                    if (
                      !is_select &&
                      service_init.service_type == serviceType
                    ) {
                      return (
                        <Item key={service_id} data={service_init}>
                          {service_init.name}
                        </Item>
                      );
                    }
                  }
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const sectionStyle = (theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.Gray[0],
      marginTop: 10,
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
    body: {},
  });

const Section = ({
  title = "",
  children,
  onPressBtn = () => {},
  showBtn = true,
}) => {
  const style = useThemeStyles(sectionStyle);
  if (showBtn) {
    return (
      <View style={style.wrapper}>
        <View style={style.header}>
          <Typography variant="Subtitle">{title}</Typography>
          <Pressable
            onPress={() => {
              onPressBtn();
            }}
          >
            <PlusIcon size="sm" color="Gray.10" />
          </Pressable>
        </View>
        <View style={style.body}>{children}</View>
      </View>
    );
  } else {
    return (
      <View style={style.wrapper}>
        <View style={style.header}>
          <Typography variant="Subtitle">{title}</Typography>
          <View />
        </View>
        <View style={style.body}>{children}</View>
      </View>
    );
  }
};

export default ServiceScreen;
