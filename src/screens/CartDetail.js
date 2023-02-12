import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Linking,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { BackIcon } from "~components/Icons";
import Button from "~components/Button";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import {
  POST_STATE,
  POST_TYPE,
  LIMIT_ADDRESS_LENGTH,
  PAYMENT_METHOD_CONDITION,
  PAYMENT_METHOD,
  EVALUATE,
} from "../constants/app_contants";
import CurrencyText from "~components/CurrencyText";
import { TextInput } from "~components/Inputs";
import Toast from "~utils/Toast";
import StarRatingComponent from "~components/StarRatingComponent";
import CommentComponent from "~components/CommentComponent";

const dateTimeFormater = (date, time) => {
  const time_string = time.slice(0, 5);
  const date_obj = new Date(date);
  return `${time_string}, ${date_obj.getDate()}/${date_obj.getMonth()}/${date_obj.getFullYear()}`;
};

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
    header: {
      width: "100%",
      height: 90,
      backgroundColor: theme.colors.BackgroundBlue,
      flexDirection: "row",
      alignItems: "center",
      // justifyContent: "center",
      paddingHorizontal: 15,
    },
    titleHeader: {
      marginLeft: 15,
      color: theme.colors.Gray[0],
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
      backgroundColor: theme.colors.ShinyOrange,
      marginLeft: 20,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 7,
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
  });

const CartDetail = (props) => {
  const style = useThemeStyles(styles);
  const { authState } = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const navigation = props.navigation;
  const route = props.route;
  const { post_id } = route.params.post;
  const [post_state, setPostState] = useState(route.params.post.post_state);
  const [cancel_modal, setCancelModal] = useState(false);
  const [review_modal, setReviewModal] = useState(false);
  const [user_review_modal, setUserReviewModal] = useState(false);
  const [post, setPost] = useState(init_post);
  const [rating_detail, setRatingDetail] = useState(null);

  useEffect(() => {
    getPostDetail();
  }, []);

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
          total: res_obj.total,
          coupon_price: res_obj.coupon_price,
        };
        setPost(new_post);
        setPostState(res_obj.post_state);

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
        console.log(res.data.data);
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
      .then(([box_chat_res, customer_res]) => {
        const box_chat_id = box_chat_res.data.box_chat_id;
        const sender = customer_res.data.data.name;
        navigation.navigate("MessageScreen", {
          box_chat_id: box_chat_id,
          sender: sender,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayPostState = () => {
    if (post_state === POST_STATE.PROCESSING) {
      return POST_STATE.PROCESSING_NA;
    } else if (post_state === POST_STATE.INCOMPLETE) {
      return POST_STATE.INCOMPLETE_NA;
    } else if (post_state === POST_STATE.COMPLETE) {
      return POST_STATE.COMPLETE_NA;
    } else {
      return POST_STATE.CANCEL_NA;
    }
  };

  const onCancel = () => {
    setCancelModal(true);
  };

  const onReview = () => {
    setReviewModal(true);
  };

  const onDelete = () => {
    Alert.alert("", "Bạn có muốn xóa bài đăng này không?", [
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
                <Typography variant="H7">Hủy đơn hàng</Typography>
              </View>
              <View style={modalStyle.content}>
                <View style={modalStyle.formItem}>
                  <Typography variant="SubTitle">
                    Lý do hủy đơn hàng:{" "}
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
      getRatings();
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
  return (
    <>
      <View style={style.default}>
        <StatusBar backgroundColor={style.statusBar.backgroundColor} />
        <View style={style.header}>
          <BackIcon
            color="Gray.0"
            onPress={() => {
              navigation.navigate("CartScreen");
            }}
          />
          <Typography variant="H5" style={style.titleHeader}>
            Chi tiết đơn hàng
          </Typography>
        </View>
        <ScrollView style={style.viewContent}>
          <View style={style.viewItemContent1}>
            <Typography variant="TextBold" style={style.title}>
              Tình trạng đơn hàng
            </Typography>
            <View style={style.label}>
              <Typography variant="Description" style={{}}>
                {displayPostState()}
              </Typography>
            </View>
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
                  <StarRatingComponent
                    // buttonStyle={modalStyle.starStyle}
                    containerStyle={{ maxWidth: 150 }}
                    starSize={20}
                    rating={post.customer.rank}
                  />
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
          </View>
        </ScrollView>
      </View>
      <CancelModal />
      <ReviewModal />
      <UserReviewModal />
    </>
  );
};
export default CartDetail;
