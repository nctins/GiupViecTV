// constant for posts table
export const PAYMENT_METHOD = {
    COD: 0, // tiền mặt
    VNPAY: 1, // thanh toán vnpay
};

// constant for services table
export const SERVICE_TYPE = {
    NORMAL: 0,
    BONUS: 1,
    NORMAL_NA: "Dịch vụ thông thường",
    BONUS_NA: "Dịch vụ thêm",
};

export const INPUT_FORMAT = {
    RADIO: 0,
    TEXTBOX: 1,
}

// constant for voucher table
export const VOUCHER_TYPE = {
    DISCOUNT_PERCENT: 0, // voucher tính theo %
    DISCOUNT_PERCENT_NA: "Giảm giá theo phần trăm",
    DISCOUNT_PRICE: 1, // voucher tính theo số tiền
    DISCOUNT_PRICE_NA: "Giảm giá theo số tiền",
}
export const PAYMENT_METHOD_CONDITION = {
    ALL: 0,
    COD: 1, // áp dụng cho đơn hàng có payment method COD
    VNPAY: 2, // áp dụng cho đơn hàng có payment method VNPAY,
    VNPAY_NA: "VNPAY",
    COD_NA: "Tiền mặt",
    ALL_NA: "Mọi hình thức thanh toán"
}

// constant for posts
export const POST_TYPE = {
    HOURLY: 0, // đơn hàng theo giờ
    INSTANT: 1, // đơn hàng tức thì
    HOURLY_NA: "Giúp việc theo giờ",
    INSTANT_NA: "Giúp việc tức thì"
}

export const POST_STATE = {
    CANCEL: 0, // đã hủy
    CANCEL_NA: "Đã hủy",
    COMPLETE: 1, // hoàn thành
    COMPLETE_NA: "Đã hoàn thành",
    PROCESSING: 2, //chờ xử lý
    PROCESSING_NA: "Đang chờ xử lý",
    INCOMPLETE: 3,
    INCOMPLETE_NA: "Chưa hoàn thành",
}

export const LIMIT_ADDRESS_LENGTH = {
    LENGTH: 30,
}

export const USER_ROLE = {
    CUSTOMER: "customer",
    HELPER: "helper",
    ADMIN: "admin",
    CUSTOMER_NA: "Khách hàng",
    HELPER_NA: "Người giúp việc",
    ALL: "Tất cả người dùng"
}

export const TYPE_NOTIFICATION = {
    SYSTEM: 0,
    COUPON: 1,
    SYSTEM_NA: "Hệ thống",
    COUPON_NA: "Khuyến mãi"
}

export const NOTIFICATION_MODULE = {
    NONE: "NONE",
    POST: "POST",
    ADVS: "ADVS",
    COUPON: "COUPON",
}

export const ICON_CODE = {
    LOGO: "logoIcon",
    COUPON: "coupon",
}

export const DEFAULT_PRICE = {
    FEE: 5,
}