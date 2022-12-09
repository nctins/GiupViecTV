import { VOUCHER_TYPE } from "~constants/app_contants";

const Caculator = {};

Caculator.toPercent = (value) => {
  const float_value = parseFloat(value);
  return `${parseInt(float_value * 100)}%`;
};

Caculator.toCharMonney = (value) => {
  const int_value = Math.abs(parseInt(value));

  if (int_value < 1000) {
    return `${int_value} đ`;
  }
  if (int_value >= 1000000) {
    return `${int_value / 1000000} Tr`;
  }
  return `${int_value / 1000}k`;
};

Caculator.calcTotalOrder = (post) => {
  const total = parseInt(post.total);
  const coupon_price = parseInt(post.coupon_price);
  const result = total - coupon_price;
  if (result <= 0) {
    return 0;
  }
  return result;
};

Caculator.calcCouponPrice = (total, voucher) => {
  const post_total = parseInt(total);
  let coupon_price = 0;
  if (voucher.voucher_type == VOUCHER_TYPE.DISCOUNT_PRICE) {
    coupon_price = parseInt(voucher.discount_price);
  } else {
    const percent = parseFloat(voucher.discount_percent);
    coupon_price = percent * post_total;
  }

  if (
    voucher.max_discount_price &&
    coupon_price > parseInt(voucher.max_discount_price)
  ) {
    return parseInt(voucher.max_discount_price);
  }

  if (post_total < coupon_price) {
    return post_total;
  }
  return coupon_price;
};

export default Caculator;
