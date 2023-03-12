import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  INPUT_FORMAT,
  PAYMENT_METHOD,
  POST_TYPE,
} from "~constants/app_contants";
import Caculator from "~utils/Caculator";
import Toast from "~utils/Toast";
import { AuthContext } from "./AuthContext";
import { AxiosContext } from "./AxiosContext";

const ServiceContext = createContext();
const { Provider } = ServiceContext;

const ServiceProvider = ({
  children,
  navigation,
  post_type,
  externalState,
}) => {
  const { authAxios } = useContext(AxiosContext);
  const { authState } = useContext(AuthContext);

  const [serviceIds, setServiceIds] = useState([]);
  const [addressIds, setAddressIds] = useState([]);
  const [currentScreen, setCurrentScreen] = externalState["currentScreen"];
  const [vouchers, setVouchers] = useState([]);

  const initdatetime = new Date("00-00-00 00:00:00");
  const [post, setPost] = useState({
    customer_name: authState.user.name,
    address: "",
    place_id: "",
    phone_number: authState.user.phone,
    date: initdatetime,
    time: initdatetime,
    note: "",
    services: {},
    voucher_code: "",
    payment_method: PAYMENT_METHOD.COD,
    total: 0,
    coupon_price: 0,
  });
  const [addresses, setAddresses] = useState({});

  const isNotEmpty = (value) => {
    return !(value == null);
  };

  const setPostData = ({
    customer_name,
    address,
    phone_number,
    date,
    time,
    note,
    services,
    voucher_code,
    payment_method,
    total,
    coupon_price,
  }) => {
    let new_post = post;
    if (isNotEmpty(customer_name)) {
      new_post = { ...new_post, customer_name: customer_name };
    }
    if (isNotEmpty(address)) {
      new_post = { ...new_post, address: address };
    }
    if (isNotEmpty(phone_number)) {
      new_post = { ...new_post, phone_number: phone_number };
    }
    if (isNotEmpty(date)) {
      new_post = { ...new_post, date: date };
    }
    if (isNotEmpty(time)) {
      new_post = { ...new_post, time: time };
    }
    if (isNotEmpty(note)) {
      new_post = { ...new_post, note: note };
    }
    if (isNotEmpty(services)) {
      new_post = { ...new_post, services: services };
    }
    if (isNotEmpty(voucher_code)) {
      new_post = { ...new_post, voucher_code: voucher_code };
    }
    if (isNotEmpty(payment_method)) {
      new_post = { ...new_post, payment_method: payment_method };
    }
    if (isNotEmpty(total)) {
      new_post = { ...new_post, total: total };
    }
    if (isNotEmpty(coupon_price)) {
      new_post = { ...new_post, coupon_price: coupon_price };
    }
    setPost(new_post);
  };

  useEffect(() => {
    getPostData();
    getVouchers();
  }, []);

  const getVouchers = () => {
    authAxios.get(`/customer/${authState.user.id}/vouchers`).then((res) => {
      setVouchers(res.data.data);
    });
  };

  const getPostData = () => {
    Promise.all([
      authAxios.get("/services"),
      authAxios.get(`customer/${authState.user.id}/addresses`),
    ])
      .then(([service_res, address_res]) => {
        // get serivce state
        const services_obj = service_res.data.data;
        let initServices = {};
        services_obj.forEach((service) => {
          let initServiceValues = {};
          if (service.input_format == INPUT_FORMAT.TEXTBOX) {
            initServiceValues = {
              seq_nb: 0,
              value: 0,
              multie_field_value: 1,
              total: 0,
            };
          } else {
            initServiceValues = {
              seq_nb: service.items[0].seq_nb,
              value: 1,
              multie_field_value: 1,
              total: parseInt(service.items[0].unit_price),
            };
          }

          initServices[service.service_id] = {
            is_select: false,
            service_init: service,
            service_value: initServiceValues,
          };
        });

        // get date
        const current_datetime = new Date();

        setPostData({
          services: initServices,
          date: current_datetime,
          time: current_datetime,
        });
        setServiceIds(Object.keys(initServices));

        // get address state
        const address_obj = address_res.data.data;
        let initAddresses = {};
        address_obj.map((address, idx) => {
          initAddresses[address.customer_address_id] = { ...address };
        });
        setAddresses(initAddresses);
        setAddressIds(Object.keys(initAddresses));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const controller = {};
  controller.createPost = () => {
    const post_detail = Object.entries(post.services)
      .map(([service_id, { is_select, service_value }]) => {
        if (is_select) {
          return {
            service_id: service_id,
            service_seq_nb: service_value.seq_nb,
            value: service_value.value,
            multiple_field_value: service_value.multie_field_value,
            total: service_value.total,
          };
        }
      })
      .filter((value) => value !== undefined);
    const data = {
      post_type: post_type,
      customer_name: post.customer_name,
      customer_phone: post.phone_number,
      address: post.address,
      date: post.date.toISOString().slice(0, 10),
      time: post.time.toLocaleTimeString(),
      note: post.note,
      total: Caculator.calcTotalOrder(post),
      coupon_price: post.coupon_price,
      voucher_id: post.voucher_code,
      payment_method: post.payment_method,
      services: post_detail,
    };
    authAxios
      .post("/post", data)
      .then((res) => {
        console.log(res.data.data);
        if(res.data.data){
          Alert.alert("", "Đã tìm được người giúp việc!");
          navigation.navigate("Đơn hàng");
        }else{
          Alert.alert("", "Không có người giúp việc nào rảnh trong thời gian này, vui lòng thay đổi thời gian khác!");
          setCurrentScreen("ServiceScreen");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  controller.onChooseAddress = (address_id) => {
    setPostData({ address: addresses[address_id].address });
    setCurrentScreen("ServiceScreen");
  };

  controller.goToPaymentScreen = () => {
    if (post.total == 0) {
      Alert.alert("", "Vui lòng chọn ít nhất 1 dịch vụ");
      return;
    }
    setCurrentScreen("PaymentScreen");
  };

  controller.backToHomeScreen = () => {
    navigation.navigate("HomeScreen");
  };

  controller.createAddress = (title, address, placeID) => {
    const data = {
      address_title: title,
      address: address,
      place_id: placeID,
    };
    authAxios
      .post(`/customer/${authState.user.id}/address`, data)
      .then((res) => {
        const resObj = res.data.data;
        console.log(resObj.msg);
        const address_obj = resObj.address;
        setAddresses({
          ...addresses,
          [address_obj.customer_address_id]: address_obj,
        });
        const new_addressIds = addressIds;
        new_addressIds.push(address_obj.customer_address_id);
        setAddressIds(new_addressIds);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  controller.deleteAddress = (address_id) => {
    authAxios
      .put(`/customer/${authState.user.id}/address/${address_id}`, {
        is_delete: 1,
      })
      .then((res) => {
        const new_addressIds = addressIds.filter((id) => id != address_id);
        setAddressIds(new_addressIds);
      })
      .catch((err) => {
        Toast.createToast("có lỗi xảy ra");
      });
  };

  controller.deleteService = (service_id) => {
    const services = post.services;
    const new_services = {
      ...services,
      [service_id]: {
        ...services[service_id],
        is_select: false,
      },
    };
    setPostData({ services: new_services });
  };

  controller.updateAddress = ({ address_id, title, address, place_id }) => {
    authAxios
      .put(`/customer/${authState.user.id}/address/${address_id}`, {
        address_title: title,
        address: address,
        place_id: place_id,
      })
      .then((res) => {
        const address_obj = {
          ...addresses[address_id],
          address_title: title,
          address: address,
        };
        setAddresses({ ...addresses, [address_id]: address_obj });
      })
      .catch((err) => {
        Toast.createToast("có lỗi xảy ra");
      });
  };

  return (
    <Provider
      value={{
        post,
        post_type,
        setPostData,
        addresses,
        addressIds,
        serviceIds,
        currentScreen,
        controller,
        vouchers,
      }}
    >
      {children}
    </Provider>
  );
};

export { ServiceContext, ServiceProvider };
