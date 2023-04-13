import React, { useState, useEffect, useContext } from "react";
import {StyleSheet, View, ScrollView, Linking, Modal, Pressable, TouchableWithoutFeedback, Alert, Dimensions} from "react-native";
import { WebView } from 'react-native-webview';
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import Button from "~components/Button";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import { SocketContext } from "~contexts/SocketContext";
import {POST_STATE, PAYMENT_METHOD, EVALUATE, VNPAY_RESPONSE_CODE} from "../constants/app_contants";
import CurrencyText from "~components/CurrencyText";
import { TextInput } from "~components/Inputs";
import Toast from "~utils/Toast";
import StarRatingComponent from "~components/StarRatingComponent";
import CommentComponent from "~components/CommentComponent";
import DateFormater from "~utils/Dateformater";
import DetailHeader from "~components/DetailHeader";
import StatusBar from "~components/StatusBar";
import SafeView from "~components/SafeView";

const dateTimeFormater = (date, time) => {
  const time_string = time.slice(0, 5);
  return `${time_string}, ${DateFormater(date)}`;
};

const { width, height } = Dimensions.get("window");

const init_post = {
  address: "",
  date: "0000-00-00T00:00:00.000Z",
  time: "00:00:00",
  services: [],
  customer: {
    id: "",
    name: "",
    phone: "",
    rank: 0,
  },
  helper: {
    id: "",
    name: "",
    phone: "",
    rank: 0,
  },
  total: 0,
  coupon_price: 0,
};

const styles = (theme) =>
  StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: theme.colors.Gray[1],
      flexDirection: "column",
    },
    title: {
      color: theme.colors.Gray[8],
    },
    viewContent: {
      flexGrow: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.Gray[0],
      paddingHorizontal: 20,
    },
    viewItemContent1: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomColor: theme.colors.Gray[8],
      borderBottomWidth: 1,
      borderStyle: "dashed",
    },
    viewItemContent2: {
      flexDirection: "column",
      paddingVertical: 10,
      borderBottomColor: theme.colors.Gray[8],
      borderBottomWidth: 1,
      borderStyle: "dashed",
    },
    viewButton: {
      marginTop: 20,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: 350,
      height: 40,
      paddingHorizontal: 0,
      paddingVertical: 0,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.BackgroundBlue,
    },
    statusBar: {
      backgroundColor: theme.colors.BackgroundBlue,
    },
    label: {
      marginLeft: 20,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      borderWidth: 1,
    },
    processing_label: {
      backgroundColor: theme.colors.Gray[0],
      borderColor: theme.colors.ShinyOrange,
      color: "ShinyOrange",
    },
    complete_label: {
      backgroundColor: theme.colors.Gray[0],
      borderColor: theme.colors.Verdepom,
      color: "Verdepom",
    },
    incomplete_label: {
      backgroundColor: theme.colors.Gray[0],
      borderColor: theme.colors.ShinyOrange,
      color: "ShinyOrange",
    },
    cancel_label: {
      backgroundColor: theme.colors.Gray[0],
      borderColor: theme.colors.StrawberryRed,
      color: "StrawberryRed",
    },
    star_container: { 
      width: 70, 
      backgroundColor: theme.colors.BackgroundBlue, 
      padding: 3, 
      borderRadius: 2, 
      marginLeft: 3,
    },
    btnGroup: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    completeBtn: {
      backgroundColor: theme.colors.Verdepom,
      margin: 10,
    },
    reviewBtn: {
      backgroundColor: theme.colors.Azure,
      margin: 10,
    },
    cancelBtn: {
      backgroundColor: theme.colors.AlizarinRed,
      margin: 10,
    },
    infoBtn: {
      backgroundColor: theme.colors.AlizarinRed,
    },
    modal: {
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
      header: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 10,
        borderStyle: "dashed",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.Gray[4],
      },
      footer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 10,
        marginTop: 15,
      },
      acceptBtn: {
        backgroundColor: theme.colors.SpringGreen,
        marginRight: 10,
      },
      cancelBtn: {
        backgroundColor: theme.colors.AlizarinRed,
      },
      content: {
        paddingVertical: 15,
        maxHeight: 300,
      },
      formItem: {
        alignSelf: "center",
        width: 250,
        marginTop: 5,
        // flexDirection: "row",
        // justifyContent: "space-between",
      },
      starColor: theme.colors.ZincYellow,
    },
    paymentModal: {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: theme.colors.Transparency,
      },
      webViewContainer: {
        width: "100%",
        height: "100%",
      },
      cancelButton: {
        width: 60,
        height: 60,
        position: "absolute",
        top: height - 200,
        left: width - 100,
        paddingHorizontal: 0,
        paddingVertical: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }
    }
  });

const CartDetail = (props) => {
  const style = useThemeStyles(styles);
  const { authState } = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const { socket } = useContext(SocketContext);
  const navigation = props.navigation;
  const route = props.route;
  const { post_id } = route.params.post;
  const [post_state, setPostState] = useState(route.params.post.post_state);
  const [cancel_modal, setCancelModal] = useState(false);
  const [review_modal, setReviewModal] = useState(false);
  const [user_review_modal, setUserReviewModal] = useState(false);
  const [uri, setUri] = useState("https://github.com/facebook/react-native");
  const [payment_modal, setPaymentModal] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [post, setPost] = useState(init_post);
  const [rating_detail, setRatingDetail] = useState(null);
  const [is_overdue, setIsOverdue] = useState(false);

  useEffect(() => {
    getPostDetail();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if(data.isPayment || data.isPayment == "1"){
        Alert.alert("", "Thanh toán thành công!", [
          {
            text: "OK",
            onPress: () => {
              authAxios
                .put(`post`, {post_id: post_id, post_state: POST_STATE.COMPLETE, helper_id: post.helper.id})
                .then((res) => {
                  console.log(res.data.data);
                  getPostDetail();
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
        ]);
      }else if(data.isPayment == "0" && data.code){
        let msg = ""
        msg = VNPAY_RESPONSE_CODE['CODE_' + data.code]
        if(msg.length <= 0){
          msg = VNPAY_RESPONSE_CODE.CODE;
        }
        Alert.alert("Thanh toán không thành công!", msg, [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
      }
      setUri("");
      setPaymentModal(false);
    };
    socket.on(post.post_id, listener);
    return () => socket.off(post.post_id);
  }, [post]);

  const getPostDetail = () => {
    // console.log(`post/${post.post_id}`);
    authAxios
      .get(`post`, { params: { post_id: post_id } })
      .then((res) => {
        const res_obj = res.data.data;
        const new_post = {
          address: res_obj.address,
          date: res_obj.date,
          time: res_obj.time,
          services: res_obj.services,
          customer: {
            id: res_obj.customer_id,
            name: res_obj.customer_name,
            phone: res_obj.customer_phone,
            rank: res_obj.customer_rank,
          },
          helper: {
            id: res_obj.helper_id,
            name: res_obj.helper_name,
            phone: res_obj.helper_phone,
            rank: res_obj.helper_rank,
          },
          payment_method: res_obj.payment_method,
          post_id: res_obj.post_id,
          total: res_obj.total,
          coupon_price: res_obj.coupon_price,
        };
        setPost(new_post);
        setPostState(res_obj.post_state);
        setIsOverdue(checkOverdue(res_obj));

        if (res_obj.post_state == POST_STATE.COMPLETE) {
          getRatingDetail(post_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRatingDetail = (post_id) => {
    authAxios
      .get(`rating/post/${post_id}`)
      .then((res) => {
        // console.log(res.data.data);
        setRatingDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCall = (phone_number) => {
    Linking.openURL(`tel:${phone_number}`);
  };

  const onChat = () => {
    // console.log(post)
    if (!post.customer.id) {
      return;
    }
    Promise.all([
      authAxios.get("box-chat-id", {
        params: { helper_id: post.helper.id },
      }),
      authAxios.get(`helper/${post.helper.id}`),
    ])
      .then(([box_chat_res, helper_res]) => {
        const box_chat_id = box_chat_res.data.box_chat_id;
        const num_unread_message = box_chat_res.data.num_unread_message;
        
        const sender = helper_res.data.data.name;
        const avatar_url = helper_res.data.data.avatar_url;

        navigation.navigate("MessageScreen", {
          box_chat_id: box_chat_id,
          sender: sender,
          avatar_url: avatar_url,
          sender_id: post.helper.id,
          num_unread_message: num_unread_message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayPostStateLabel = () => {
    let label_style = {};
    let state_name = "";
    // let title_color = "Gray.8"
    switch (post_state) {
      case POST_STATE.PROCESSING:
        label_style = style.processing_label;
        state_name = POST_STATE.PROCESSING_NA;
        break;

      case POST_STATE.INCOMPLETE:
        label_style = style.incomplete_label;
        state_name = POST_STATE.INCOMPLETE_NA;
        break;

      case POST_STATE.COMPLETE:
        label_style = style.complete_label;
        state_name = POST_STATE.COMPLETE_NA;
        break;
    
      default: // POST_STATE.CANCEL_NA
        label_style = style.cancel_label;
        state_name = POST_STATE.CANCEL_NA;
        break;
    }
    const title_color = label_style.color;
    return (
      <View style={[style.label, label_style]}>
        <Typography variant="Description" color={title_color}>
          {state_name}
        </Typography>
      </View>
    )
  };

  const onCancel = () => {
    setCancelModal(true);
  };

  const onReview = () => {
    setReviewModal(true);
  };

  const onDelete = () => {
    Alert.alert("", "Bạn có muốn xóa lịch hẹn này không?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "OK",
        onPress: () => {
          authAxios
            .delete(`post?post_id=${post_id}`)
            .then((res) => {
              Toast.createToast(res.data.msg);
            })
            .catch((err) => {
              Toast.createToast("Có lỗi xảy ra vui lòng thử lại!");
              console.log(err);
            });
        },
      },
    ]);
  };

  const PriceItem = ({ title, value }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="Description">{title}</Typography>
        <CurrencyText variant="Description" value={value} currency="VNĐ" />
      </View>
    );
  };

  const CouponItem = ({ title, value }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="Description">{title}</Typography>
        <CurrencyText
          prefix="-"
          variant="Description"
          value={value}
          currency="VNĐ"
        />
      </View>
    );
  };

  const PaymentMethodItem = ({ value }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="Description">Phương thức thanh toán</Typography>
        {value == PAYMENT_METHOD.VNPAY ? (
          <Typography variant="Description">VNPAY</Typography>
        ) : (
          <Typography variant="Description">Tiền mặt</Typography>
        )}
      </View>
    );
  };

  const onPaymentVnpay = () => {
    authAxios
      .post(`payment/createPayment`, {post_id: post.post_id})
      .then((res) => {
        console.log(res.data.data);
        setUri(res.data.data.uri);
        setPaymentModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const PaymentModal = () => {
    const modalStyle = style.paymentModal;

    const onCancel = () => {
      Alert.alert("", "Bạn có muốn hủy thanh toán không?", [
        { text: "Cancel", onPress: () => {} },
        {
          text: "OK",
          onPress: () => {
            setPaymentModal(false); 
            setUri("");
          },
        },
      ]);
    }

    return (
      <Modal animationType="none" transparent={true} visible={payment_modal}>
        <View style={modalStyle.container}>
          <View style={modalStyle.webViewContainer}>
            <WebView
              source={{
                uri: uri,
              }}
              style={modalStyle.container}
            />
            <Button style={modalStyle.cancelButton} radius={100} variant="cancel" onPress={onCancel} >Hủy</Button>
          </View>
        </View>
      </Modal>
    );
  };

  const CancelModal = () => {
    const modalStyle = style.modal;
    const [reason_cancel, setReasonCancel] = useState("");
    const onSubmit = () => {
      if (reason_cancel === "") {
        Toast.createToast("vui lòng nhập lý do");
        return;
      }
      authAxios
        .put(`post`, {
          post_id: post_id,
          post_state: POST_STATE.CANCEL,
          reason_cancel: reason_cancel,
        })
        .then((res) => {
          Toast.createToast(res.data.msg);
          navigation.navigate("CartScreen");
          // navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
          Toast.createToast("có lỗi xảy ra vui lòng thử lại");
          setCancelModal(false);
        });
    };

    return (
      <Modal animationType="none" transparent={true} visible={cancel_modal}>
        <View style={modalStyle.centeredView}>
          <View style={modalStyle.modalView}>
            <View style={modalStyle.wrapper}>
              <View style={modalStyle.header}>
                <Typography variant="H7">Hủy lịch hẹn</Typography>
              </View>
              <View style={modalStyle.content}>
                <View style={modalStyle.formItem}>
                  <Typography variant="SubTitle">
                    Lý do hủy:{" "}
                  </Typography>
                  <TextInput
                    variant="modalForm"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={reason_cancel}
                    onChangeText={(text) => {
                      setReasonCancel(text);
                    }}
                  />
                </View>
              </View>
              <View style={modalStyle.footer}>
                <Button
                  style={modalStyle.acceptBtn}
                  size="modalBtn"
                  onPress={() => onSubmit()}
                >
                  Xác nhận
                </Button>
                <Button
                  style={modalStyle.cancelBtn}
                  size="modalBtn"
                  onPress={() => setCancelModal(false)}
                >
                  Quay về
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ReviewModal = () => {
    const modalStyle = style.modal;
    const [starCount, setStarCount] = useState(3);
    const [comment, setComment] = useState("");
    const evaluate = EVALUATE;
    const onSubmit = () => {
      let data = {
        post_id: post_id,
        target_id: post.helper.id,
        rank: starCount,
        content: comment,
      };
      authAxios
        .post("/rating", data)
        .then((res) => {
          setReviewModal(false);
          Toast.createToast(res.data.msg);
          navigation.navigate("CartScreen");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return (
      <Modal animationType="none" transparent={true} visible={review_modal}>
        <View style={modalStyle.centeredView}>
          <View style={modalStyle.modalView}>
            <View style={modalStyle.wrapper}>
              <View style={modalStyle.header}>
                <Typography variant="H7">Đánh giá người giúp việc</Typography>
              </View>
              <View style={modalStyle.content}>
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                  <Typography variant="H3" color={evaluate[starCount].color}>
                    {evaluate[starCount].msg}
                  </Typography>
                </View>
                <View style={modalStyle.formItem}>
                  <Typography variant="SubTitle">Đánh giá: </Typography>
                  <StarRatingComponent
                    // buttonStyle={modalStyle.starStyle}
                    containerStyle={{ maxWidth: 150 }}
                    starSize={30}
                    disabled={false}
                    rating={starCount}
                    selectedStar={(rating) => setStarCount(rating)}
                  />
                </View>
                <View style={modalStyle.formItem}>
                  <Typography variant="SubTitle">Nhận xét: </Typography>
                  <TextInput
                    variant="modalForm"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={comment}
                    onChangeText={(text) => {
                      setComment(text);
                    }}
                  />
                </View>
              </View>
              <View style={modalStyle.footer}>
                <Button
                  style={modalStyle.acceptBtn}
                  size="modalBtn"
                  onPress={() => onSubmit()}
                >
                  OK
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const UserReviewModal = () => {
    const modalStyle = style.modal;

    const [ratings, setRatings] = useState([]);
    useEffect(() => {
      if(user_review_modal) {
        getRatings();
      }
    }, [user_review_modal]);

    const getRatings = () => {
      if (post.helper.id == "") {
        return;
      }
      authAxios
        .get(`rating/helper/${post.helper.id}`)
        .then((res) => {
          setRatings(res.data.data);
        })
        .catch((err) => {
          setRatings([]);
          console.log(err);
        });
    };

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={user_review_modal}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setUserReviewModal(false);
          }}
        >
          <View style={modalStyle.centeredView}>
            <TouchableWithoutFeedback>
              <View style={modalStyle.modalView}>
                <View style={modalStyle.wrapper}>
                  <View style={modalStyle.header}>
                    <Typography variant="H7">
                      Đánh giá về {post.helper.name}
                    </Typography>
                  </View>
                  <ScrollView style={modalStyle.content}>
                    {ratings.map((rating, idx) => {
                      return (
                        <CommentComponent
                          key={idx}
                          data={{
                            user_name: rating.user_name,
                            date: rating.date_time,
                            content: rating.content,
                            rating: rating.rank,
                          }}
                        />
                      );
                    })}
                    <View style={{ height: 50 }}></View>
                  </ScrollView>
                  <View style={modalStyle.footer}>
                    <Button
                      style={style.cancelBtn}
                      size="modalBtn"
                      onPress={() => {
                        setUserReviewModal(false);
                      }}
                    >
                      Đóng
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

  const checkOverdue = (post_obj) => {
    // console.log(post_obj);
    if (!post_obj || post_obj.post_state != POST_STATE.INCOMPLETE) {
      return false;
    }
    if (!post_obj.date) {
      return false;
    }
    const current = new Date();
    let post_date = post_obj.date instanceof Date ? post_obj.date : new Date(post_obj.date);
    const time = post.time;
    post_date.setHours( time.slice(0,2), time.slice(3,5), 0, 0 );
    return current >= post_date;
  }

  return (
    <>
      <StatusBar/>
      <SafeView>
        <DetailHeader title="Chi tiết lịch hẹn" navigation={navigation}/>
        <View style={style.default}>
          <ScrollView style={style.viewContent}>
            <View style={style.viewItemContent1}>
              <Typography variant="TextBold" style={style.title}>
                Tình trạng
              </Typography>
              {displayPostStateLabel()}
              {/* <View style={style.label}>
                <Typography variant="Description" style={{}}>
                  {displayPostState()}
                </Typography>
              </View> */}
            </View>
            <View style={[style.viewItemContent2]}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Typography variant="TextBold" style={style.title}>
                  Thông tin khách hàng
                </Typography>
              </View>
              <Typography variant="Description">
                Họ và tên: {post.customer.name}{" "}
              </Typography>
              <Typography variant="Description">
                Địa chỉ: {post.address}{" "}
              </Typography>
              <Typography variant="Description">
                Thời gian: {dateTimeFormater(post.date, post.time)}
              </Typography>
              <Typography variant="Description">
                Số điện thoại: {post.customer.phone}
              </Typography>
            </View>
            <View style={[style.viewItemContent2]}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Typography variant="TextBold" style={style.title}>
                  Dịch vụ
                </Typography>
              </View>
              {post.services.map((ele, idx) => {
                return (
                  <PriceItem
                    key={idx}
                    title={ele.service_name}
                    value={ele.total}
                  />
                );
              })}
              <CouponItem title={"Ưu đãi"} value={post.coupon_price} />
              <PriceItem title={"Tổng cộng"} value={post.total} />
              <PaymentMethodItem value={post.payment_method} />
            </View>
            {post.helper.id != "" && (
              <View style={[style.viewItemContent2]}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Typography variant="TextBold" style={style.title}>
                    Thông tin người giúp việc
                  </Typography>
                </View>
                <Typography variant="Description">
                  Họ và tên: {post.helper.name}
                </Typography>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="Description">
                    Số điện thoại: {post.helper.phone}
                  </Typography>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      style={{ marginRight: 8 }}
                      onPress={() => onCall(post.helper.phone)}
                    >
                      <Typography variant="Description" color="PersianBlue">
                        [gọi điện]
                      </Typography>
                    </Pressable>
                    <Pressable onPress={() => onChat()}>
                      <Typography variant="Description" color="PersianBlue">
                        [nhắn tin]
                      </Typography>
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Typography variant="Description">
                      Hạng người giúp việc:
                    </Typography>
                    <View style={style.star_container}>
                      <StarRatingComponent
                        starSize={12}
                        rating={post.helper.rank}
                      />
                    </View>
                  </View>
                  {post.helper.rank > 0 && (
                    <Pressable
                      style={{ marginRight: 8 }}
                      onPress={() => {
                        setUserReviewModal(true);
                      }}
                    >
                      <Typography variant="Description" color="PersianBlue">
                        [Xem chi tiết]
                      </Typography>
                    </Pressable>
                  )}
                </View>
              </View>
            )}
            <View style={style.btnGroup}>
              {post_state == POST_STATE.INCOMPLETE && (
                <Button
                  style={style.cancelBtn}
                  size="modalBtn"
                  onPress={() => onCancel()}
                >
                  Hủy
                </Button>
              )}
              {post_state == POST_STATE.PROCESSING && (
                <Button
                  style={style.cancelBtn}
                  size="modalBtn"
                  onPress={() => onDelete()}
                >
                  Xóa
                </Button>
              )}
              {post_state == POST_STATE.COMPLETE && !rating_detail && (
                <Button
                  style={style.reviewBtn}
                  size="modalBtn"
                  onPress={() => onReview()}
                >
                  Đánh giá
                </Button>
              )}
              {
                post.payment_method == PAYMENT_METHOD.VNPAY 
                && is_overdue
                &&(
                  <Button
                    style={style.reviewBtn}
                    size="modalBtn"
                    onPress={onPaymentVnpay}
                  >
                    Thanh toán
                  </Button>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeView>
      <CancelModal />
      <ReviewModal />
      <UserReviewModal />
      <PaymentModal />
    </>
  );
};
export default CartDetail;
