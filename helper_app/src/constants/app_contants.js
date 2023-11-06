// constant for posts table
export const PAYMENT_METHOD = {
  COD: 0, // tiền mặt
  VNPAY: 1, // thanh toán vnpay
};

// constant for services table
export const SERVICE_TYPE = {
  NORMAL: 0,
  BONUS: 1,
};

export const INPUT_FORMAT = {
  RADIO: 0,
  TEXTBOX: 1,
};

// constant for voucher table
export const VOUCHER_TYPE = {
  DISCOUNT_PERCENT: 0, // voucher tính theo %
  DISCOUNT_PRICE: 1, // voucher tính theo số tiền
};
export const PAYMENT_METHOD_CONDITION = {
  ALL: 2,
  COD: 0, // áp dụng cho đơn hàng có payment method COD
  VNPAY: 1, // áp dụng cho đơn hàng có payment method VNPAY,
  VNPAY_NA: "VNPAY",
  COD_NA: "Tiền mặt",
  ALL_NA: "Mọi hình thức thanh toán",
};

// constant for posts
export const POST_TYPE = {
  HOURLY: 0, // đơn hàng theo giờ
  INSTANT: 1, // đơn hàng tức thì
  HOURLY_NA: "Giúp việc theo giờ",
  INSTANT_NA: "Giúp việc tức thì",
};

export const POST_STATE = {
  CANCEL: 0, // đã hủy
  CANCEL_NA: "Đã hủy",
  COMPLETE: 1, // hoàn thành
  COMPLETE_NA: "Đã hoàn thành",
  PROCESSING: 2, //chờ xử lý
  PROCESSING_NA: "Đang chờ xử lý",
  INCOMPLETE: 3,
  INCOMPLETE_NA: "Chưa hoàn thành",
};

export const LIMIT_ADDRESS_LENGTH = {
  LENGTH: 95,
};

export const LIMIT_MESSAGE_LENGTH = 50;

// constant for notification table
export const ICON_CODE = {
  LOGO: "logoIcon", // icon hiển thị là logo khi thông báo loại hệ thống (do admin tạo)
  ORDER: "order", // icon đơn hàng khi thông báo loại cập nhật đơn hàng 
  COUPON: "coupon", // icon khuyến mãi khi thông báo loại khuyến mãi (do admin tạo)
  ORDER_COMPLETE: "order_complete", // icon khi thông báo đơn hàng hoàn thành
  ORDER_CANCEL: "order_cancel", // icon khi thông báo đơn hàng hủy
  ORDER_MATCH: "order_matcch", // icon khi thông báo đơn hàng đả được ghép nối
};

export const NOTIFICATION_MODULE = {
  NONE: "NONE",
  POST: "POST",
  ADVS: "ADVS",
  COUPON: "COUPON",
}

// ranking name

export const EVALUATE = [
  { msg: "", color: "Gray.8" },
  { msg: "Rất tệ", color: "AlizarinRed" },
  { msg: "Tệ", color: "AlizarinRed" },
  { msg: "Bình thường", color: "Verdepom" },
  { msg: "Tốt!", color: "Verdepom" },
  { msg: "Rất tốt!", color: "Verdepom" },
];

// APP
export const TIMESERVING_HOURS = 3; // 3h
export const TIMESERVING_MILISEC = 10800000; // 3 * 60 * 60 *1000 = 10800000 miliseconds
export const BREAK_TIME_MINUS = 30; // 30 minus
export const BREAK_TIME_MILISEC = 1800000; // 3 * 60 * 1000 = 1800000 miliseconds


export const MONDAY = 0;
export const TUESDAY = 1;
export const WEDNESDAY = 2;
export const THURSDAY = 3;
export const FRIDAY = 4;
export const SATURDAY = 5;
export const SUNDAY = 6;

// const for convert Date.getDay() to app day
export const JS_DAYS = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY];
export const DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SATURDAY];