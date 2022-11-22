import React, { createContext, useContext, useEffect, useState } from "react";
import {
  INPUT_FORMAT,
  PAYMENT_METHOD,
  POST_TYPE,
} from "~constants/app_contants";
import { AuthContext } from "./AuthContext";
import { AxiosContext } from "./AxiosContext";

const ServiceContext = createContext();
const { Provider } = ServiceContext;

const ServiceProvider = ({ children, navigation, post_type }) => {
  const { authAxios } = useContext(AxiosContext);
  const { authState } = useContext(AuthContext);

  const initdatetime = new Date("00-00-00 00:00:00")

  const [post, setPost] = useState({
    customer_name: authState.user.name,
    address: "",
    phone_number: authState.user.phone,
    date: initdatetime,
    time: initdatetime,
    note: "",
    services: {},
    voucher_code: "",
    payment_method: PAYMENT_METHOD.COD,
    total: 0,
  });
  const [addresses, setAddresses] = useState([]);

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
    setPost(new_post);
  };

  useEffect(() => {
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

        // get address state
        const address_obj = address_res.data.data;
        const address_list = address_obj.map((address, idx) => {
          return idx == 0
            ? {
                ...address,
                is_select: true,
              }
            : {
                ...address,
                is_select: false,
              };
        });

        // get date
        const current_datetime = new Date();

        setPostData({
          services: initServices,
          address: address_obj[0].address,
          date: current_datetime,
          time: current_datetime,
        });
        setAddresses(address_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          };
        }
      })
      .filter((value) => value !== undefined);
    const data = {
      post_type: post_type,
      address: post.address,
      date: post.date.toISOString().slice(0, 10),
      time: post.time.toLocaleTimeString(),
      note: post.note,
      total: post.total,
      voucher_id: post.voucher_code,
      payment_method: post.payment_method,
      services: post_detail,
    };
    authAxios
      .post("/post", data)
      .then((res) => {
        console.log(res.data.msg);
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Provider
      value={{
        post,
        post_type,
        setPostData,
        controller,
      }}
    >
      {children}
    </Provider>
  );
};

export { ServiceContext, ServiceProvider };
