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
  ALL: 0,
  COD: 1, // áp dụng cho đơn hàng có payment method COD
  VNPAY: 2, // áp dụng cho đơn hàng có payment method VNPAY,
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
  LENGTH: 60,
};

// constant for notification table
export const ICON_CODE = {
  LOGO: "logoIcon", // icon hiển thị là logo khi thông báo loại hệ thống (do admin tạo)
  ORDER: "order", // icon đơn hàng khi thông báo loại cập nhật đơn hàng 
  COUPON: "coupon", // icon khuyến mãi khi thông báo loại khuyến mãi (do admin tạo)
};

// ranking name

export const EVALUATE = [
  { msg: "", color: "Gray.8" },
  { msg: "Rất tệ", color: "AlizarinRed" },
  { msg: "Tệ", color: "AlizarinRed" },
  { msg: "Bình thường", color: "Verdepom" },
  { msg: "Tốt!", color: "Verdepom" },
  { msg: "Rất tốt!", color: "Verdepom" },
];


export const DEFAULT_IMAGE_ERROR = "https://res.cloudinary.com/dru3umoml/image/upload/v1670421546/images/601082646d6bf4446451b0a4_6002086f72b72717ae01d954_google-doc-error-message_g1wpwa.png"
export const DEFAULT_AVATAR = "https://reactnative.dev/img/tiny_logo.png";

// APP
export const TIMESERVING_HOURS = 3; // 3h
export const TIMESERVING_MILISEC = 10800000; // 3 * 60 * 60 *1000 = 10800000 miliseconds
export const BREAK_TIME_MINUS = 30; // 30 minus
export const BREAK_TIME_MILISEC = 1800000; // 3 * 60 * 1000 = 1800000 miliseconds

export const VNPAY_RESPONSE_CODE = {
  CODE_00: "Thanh toán thành công",
  CODE_07: "Trừ tiền thành công.\nGiao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
  CODE_09: "Thẻ/Tài khoản của bạn chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  CODE_10: "Bạn xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
  CODE_11: "Đã hết hạn chờ thanh toán. \nXin bạn vui lòng thực hiện lại giao dịch.",
  CODE_12: "Thẻ/Tài khoản của bạn đã bị khóa.",
  CODE_13: "Bạn nhập sai mật khẩu xác thực giao dịch (OTP). \nXin bạn vui lòng thực hiện lại giao dịch.",
  CODE_24: "Bạn đã hủy thanh toán",
  CODE_51: "Tài khoản của bạn không đủ số dư để thực hiện giao dịch.",
  CODE_65: "Tài khoản của bạn đã vượt quá hạn mức giao dịch trong ngày.",
  CODE_75: "Ngân hàng thanh toán đang bảo trì.",
  CODE_79: "Nhập sai mật khẩu thanh toán quá số lần quy định.",
  CODE: "Phát sinh lỗi khi giao dịch. \nvui lòng liên hệ admin để biết thêm thông tin chi tiết!",
};

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
