import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import CurrencyText from "~components/CurrencyText";
import Button from "~components/Button";
import useSocket from "~hooks/useSocket";
import useAxios from "~hooks/useAxios";
import SOCKET_ACT from "~constants/socket_contant";
import Toast from "~utils/Toast";

const IntantOrderContext = createContext();
const { Provider } = IntantOrderContext;
const COUNT_DOWN_TIME = 30;

const IntantOrderProvider = ({ children }) => {
  const { socket } = useSocket();
  const [modalVisible, setModalVisible] = useState(false);
  const [already, setAlready] = useState(false);
  const { authAxios } = useAxios();
  const [services, setServices] = useState({});
  const [post, setPost] = useState({
    post_id: "",
    customer_id: "",
    customer_name: "",
    customer_phone: "",
    post_type: 1,
    address: "",
    date: "0000-00-00",
    time: "00:00:00",
    note: "",
    total: 0,
    voucher_id: "",
    payment_method: 0,
    post_state: 2,
    services: [],
  });

  const controller = {};
  controller.startReceiving = () => {
    setAlready(true);
  };
  controller.stopReceiving = () => {
    setAlready(false);
  };
  controller.toggleReceiving = () => {
    setAlready(!already);
  };

  useEffect(() => {
    authAxios
      .get("/services")
      .then((res) => {
        const services_obj = res.data.data;
        const init_services = {};
        services_obj.map((service) => {
          init_services[service.service_id] = service;
        });
        setServices(init_services);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const listener = (msg) => {
      setModalVisible(true);
      setPost(msg);
      // console.log(msg);
    };
    if (!modalVisible && already) {
      socket.on(SOCKET_ACT.NEW_INTANT_POST, listener);
      return () => socket.off(SOCKET_ACT.NEW_INTANT_POST);
    }
  }, [socket, already, modalVisible]);
  return (
    <Provider
      value={{
        already,
        controller,
      }}
    >
      {children}
      <ModalOrder
        visible={modalVisible}
        setVisible={setModalVisible}
        post={post}
        services={services}
        setAlready={setAlready}
      />
    </Provider>
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
    wrapper: {
      backgroundColor: theme.colors.Gray[0],
      padding: 20,
      borderRadius: 20,
      minWidth: 340,
    },
    spaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: 10,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[4],
    },
    info: {
      paddingVertical: 5,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[4],
    },
    detail: {
      paddingVertical: 5,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[4],
      //   maxHeight: 200,
    },
    coupon: {
      paddingVertical: 5,
      borderStyle: "dashed",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Gray[4],
    },
    total: {
      paddingVertical: 5,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: 10,
      marginTop: 15,
    },
    acceptBtn: {
      backgroundColor: theme.colors.Verdepom,
      marginRight: 10,
    },
    cancelBtn: {
      backgroundColor: theme.colors.AlizarinRed,
    },
  });

const ModalOrder = ({ setVisible, visible, post, services, setAlready }) => {
  const style = useThemeStyles(modalStyle);
  const { authAxios } = useAxios();

  const [time, setTime] = useState(COUNT_DOWN_TIME);
  const [startCountdown, setStartCountdown] = useState(false);

  const resetTime = () => {
    setTime(COUNT_DOWN_TIME);
    setStartCountdown(true);
  };
  const onCancel = () => {
    setVisible(false);
  };
  // console.log(post)
  const onAccept = () => {
    authAxios
      .put(`post`, { post_id: post.post_id })
      .then((res) => {
        setAlready(false);
        setVisible(false);
        //     console.log(res.data.msg);
        Toast.createToast(res.data.msg);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    resetTime();
  }, [post]);

  useEffect(() => {
    if (startCountdown) {
      const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);

      if (time === 0) {
        // countdown is finished
        setStartCountdown(false);
        //
        onCancel();
      }

      return () => clearInterval(timer);
    }
  }, [time, startCountdown]);

  const renderServiceList = (service_list) => {
    return service_list.map((service, idx) => {
      const service_id = service.service_id;
      const service_init = services[service_id];
      // console.log(service_init);
      return (
        <View style={style.spaceBetween} key={idx}>
          <Typography variant="Description" color="Gray.8">
            {service_init.name}
          </Typography>
          <CurrencyText
            value={service.total}
            variant="Description"
            color="Gray.8"
            currency="vnđ"
          />
        </View>
      );
      // return <Typography>item</Typography>
    });
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
              <View style={style.wrapper}>
                <View style={style.header}>
                  <Typography variant="Subtitle">Đơn hàng mới</Typography>
                </View>
                <View style={style.info}>
                  <Typography variant="Description">
                    Khách hàng: {post.customer_name}
                  </Typography>
                  <Typography variant="Description">
                    Địa chỉ: {post.address}
                  </Typography>
                  <Typography variant="Description">
                    Số điện thoại: {post.phone_number}
                  </Typography>
                </View>
                <View style={style.detail}>
                  <View style={style.spaceBetween}>
                    <Typography variant="MiniDescription">Dịch vụ</Typography>
                    <Typography variant="MiniDescription">Số tiền</Typography>
                  </View>
                  <ScrollView style={{ maxHeight: 100 }}>
                    {renderServiceList(post.services)}
                  </ScrollView>
                </View>
                <View style={style.coupon}>
                  <View style={style.spaceBetween}>
                    <Typography variant="Description">Ưu đãi</Typography>
                    <CurrencyText
                      variant="Description"
                      value={10000}
                      prefix={"-"}
                      currency="vnđ"
                    />
                  </View>
                </View>
                <View style={style.total}>
                  <View style={style.spaceBetween}>
                    <Typography variant="Description">Tổng cộng</Typography>
                    <CurrencyText
                      value={post.total}
                      currency="vnđ"
                      variant="Description"
                    />
                  </View>
                </View>
                <View style={style.footer}>
                  <Button
                    style={style.acceptBtn}
                    size="modalBtn"
                    onPress={() => onAccept()}
                  >
                    Chấp nhận ({time})
                  </Button>
                  <Button
                    style={style.cancelBtn}
                    size="modalBtn"
                    onPress={() => onCancel()}
                  >
                    Bỏ qua
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export { IntantOrderProvider, IntantOrderContext };
