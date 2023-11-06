export const ID_PREFIX = {
    CUSTOMER_ACCOUNT:  "CUS_",
    ADMIN_ACCOUNT: "ADM_",
    HELPER_ACCOUNT: "HEL_",
    POST: "POS_",
    POST_DETAIL: "POD_",
    SERVICE: "SER_",
    VOUCHER: "VOU_",
    VOUCHER_RANGE: "VOR_",
    NOTIFICATION: "NTF_",
    BOX_CHAT: "BOX_",
    ADVERTISERMENT: "ADV_",
    CUSTOMER_ADDRESS: "CAD_",
    FEEDBACK: "FEB_",
};

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
}

// constant for voucher table
export const VOUCHER_TYPE = {
    DISCOUNT_PERCENT: 0, // voucher tính theo %
    DISCOUNT_PRICE: 1, // voucher tính theo số tiền
}
export const PAYMENT_METHOD_CONDITION = {
    ALL: 0,
    COD: 1, // áp dụng cho đơn hàng có payment method COD
    VNPAY: 2, // áp dụng cho đơn hàng có payment method VNPAY
}

// constant for posts
export const POST_TYPE = {
    HOURLY: 0, // đơn hàng theo giờ
    INSTANT: 1, // đơn hàng tức thì
}

export const POST_STATE = {
    CANCEL: 0, // đã hủy
    COMPLETE: 1, // hoàn thành
    PROCESSING: 2, //chờ xử lý
    INCOMPLETE: 3, // chưa hoàn thành
}

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

// constant for schedule table

export const MONDAY = 0;
export const TUESDAY = 1;
export const WEDNESDAY = 2;
export const THURSDAY = 3;
export const FRIDAY = 4;
export const SATURDAY = 5;
export const SUNDAY = 6;
export const DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SATURDAY];

// APP
export const TIMESERVING_HOURS = 3; // 3h
export const MIN_TIME_FREE_HELPER = 2; // 3h
export const TIMESERVING_MILISEC = 10800000; // 3 * 60 * 60 *1000 = 10800000 miliseconds
export const BREAK_TIME_MINUS = 30; // 30 minus
export const BREAK_TIME_MILISEC = 1800000; // 3 * 60 * 1000 = 1800000 miliseconds