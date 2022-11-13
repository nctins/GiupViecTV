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
    INCOMPLETE: 3,
}