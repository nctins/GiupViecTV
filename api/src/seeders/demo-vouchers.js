'use strict';

const vouchers = [
  {
    "voucher_id": "VOU_6pvn3vlh08t585",
    "voucher_name": "Giảm 15k cho đơn hàng có giá trị từ 250k",
    "voucher_type": 1,
    "voucher_description": "Giảm 10k cho đơn hàng có giá trị từ 200k áp dụng cho tất cả các dịch vụ.",
    "discount_percent": null,
    "discount_price": 15000,
    "min_post_price": 250000,
    "max_discount_price": 15000,
    "quantity": 100,
    "payment_method_condition": 0,
    "start_date": "2023-04-01 00:00:00",
    "end_date": "2024-01-19 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-04-28 07:39:02",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:56:15",
    "is_delete": 0,
    "voucher_code": "lh08shfr",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684335374/images/irzom674eom24txv1z5w.jpg"
  },
  {
    "voucher_id": "VOU_6pvn3vlh08u68c",
    "voucher_name": "Giảm 30k cho đơn hàng có giá trị từ 500k",
    "voucher_type": 1,
    "voucher_description": "Giảm 10k cho đơn hàng có giá trị từ 200k áp dụng cho tất cả các dịch vụ.",
    "discount_percent": null,
    "discount_price": 30000,
    "min_post_price": 500000,
    "max_discount_price": 30000,
    "quantity": 100,
    "payment_method_condition": 1,
    "start_date": "2023-04-01 00:00:00",
    "end_date": "2024-01-19 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-04-28 07:39:50",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:56:26",
    "is_delete": 0,
    "voucher_code": "lh08tx73",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684335386/images/sc3f9onzj3h2kpxpzzy1.jpg"
  },
  {
    "voucher_id": "VOU_6pvn3vlh08w7in",
    "voucher_name": "Giảm 5% cho đơn hàng có giá trị từ 150k",
    "voucher_type": 0,
    "voucher_description": "Giảm 5% tối đa 20000 cho đơn hàng có giá trị từ 150k áp dụng cho tất cả các dịch vụ.",
    "discount_percent": 0.05,
    "discount_price": null,
    "min_post_price": 150000,
    "max_discount_price": 20000,
    "quantity": 100,
    "payment_method_condition": 0,
    "start_date": "2023-04-01 00:00:00",
    "end_date": "2024-01-19 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-04-28 07:41:25",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:58:30",
    "is_delete": 0,
    "voucher_code": "lh08w1u4",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684335510/images/ral9qrn8zb47o3jmhsn2.png"
  },
  {
    "voucher_id": "VOU_6pvn3vlh08y5b6",
    "voucher_name": "Giảm 10% cho đơn hàng có giá trị từ 1.500k",
    "voucher_type": 0,
    "voucher_description": "Giảm 10% tối đa 200000 cho đơn hàng có giá trị từ 1.500k áp dụng cho tất cả các dịch vụ.",
    "discount_percent": 0.1,
    "discount_price": null,
    "min_post_price": 1500000,
    "max_discount_price": 200000,
    "quantity": 100,
    "payment_method_condition": 0,
    "start_date": "2023-04-01 00:00:00",
    "end_date": "2024-01-19 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-04-28 07:42:55",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:59:54",
    "is_delete": 0,
    "voucher_code": "lh08y3xl",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684335593/images/ei6ggvztkdjgh8qqpua9.jpg"
  },
  {
    "voucher_id": "VOU_dq241elhovc4dh",
    "voucher_name": "giảm giá 20.000 VNĐ",
    "voucher_type": 1,
    "voucher_description": "giảm giá 20.000 VNĐ",
    "discount_percent": null,
    "discount_price": 20000,
    "min_post_price": 0,
    "max_discount_price": 20000,
    "quantity": 5,
    "payment_method_condition": 0,
    "start_date": "2023-05-01 00:00:00",
    "end_date": "2023-05-31 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-05-15 13:16:07",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-15 13:16:29",
    "is_delete": 1,
    "voucher_code": "lhovbsym",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684156568/images/byzycbufuq4e7fpdpcm1.png"
  },
  {
    "voucher_id": "VOU_g2pcl104l91ix8gn",
    "voucher_name": "Giảm 20% (tối đa 100k) cho đơn hàng từ 500k.",
    "voucher_type": 0,
    "voucher_description": "Giảm 20% - tối đa 100k cho đơn hàng có giá trị từ 500k trở lên áp dụng cho tất cả các địch vụ",
    "discount_percent": 0.2,
    "discount_price": null,
    "min_post_price": 500000,
    "max_discount_price": 100000,
    "quantity": 100,
    "payment_method_condition": 0,
    "start_date": "2023-01-01 00:00:00",
    "end_date": "2023-12-31 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2022-01-01 00:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:58:08",
    "is_delete": 0,
    "voucher_code": "iob0ucoa",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684335488/images/srwlhndnxvsrdllgaahe.jpg"
  },
  {
    "voucher_id": "VOU_g2pcl464l91inos5",
    "voucher_name": "Giảm 50k cho đơn hàng từ 500k.",
    "voucher_type": 1,
    "voucher_description": "Giảm 50k cho đơn hàng có giá trị từ 500k trở lên áp dụng cho tất cả các địch vụ",
    "discount_percent": null,
    "discount_price": 50000,
    "min_post_price": 500000,
    "max_discount_price": 50000,
    "quantity": 100,
    "payment_method_condition": 0,
    "start_date": "2023-01-01 00:00:00",
    "end_date": "2023-12-31 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2022-01-01 00:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:50:00",
    "is_delete": 0,
    "voucher_code": "iob0ucoj",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684335000/images/nu79irptn15lxla1e9wd.png"
  },
  {
    "voucher_id": "VOU_g2pcl5ggl91j69bn",
    "voucher_name": "Giảm 10k cho đơn hàng có giá trị từ 200k",
    "voucher_type": 1,
    "voucher_description": "Giảm 10k cho đơn hàng có giá trị từ 200k áp dụng cho tất cả các dịch vụ.",
    "discount_percent": null,
    "discount_price": 10000,
    "min_post_price": 200000,
    "max_discount_price": 10000,
    "quantity": 100,
    "payment_method_condition": 1,
    "start_date": "2022-01-01 00:00:00",
    "end_date": "2022-01-02 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2022-01-01 00:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:40:49",
    "is_delete": 0,
    "voucher_code": "iob0ucsj",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684334448/images/bbqmvb47nsy07quc1dka.png"
  },
  {
    "voucher_id": "VOU_g2pcl734l91j2kwy",
    "voucher_name": "Giảm 50% (tối đa 25k) cho dịch vụ dọn phòng khách",
    "voucher_type": 0,
    "voucher_description": "Giảm 50% - tối đa 25k cho áp dụng cho địch vụ dọn phòng khách.",
    "discount_percent": 0.2,
    "discount_price": null,
    "min_post_price": 0,
    "max_discount_price": 25000,
    "quantity": 100,
    "payment_method_condition": 0,
    "start_date": "2023-01-01 00:00:00",
    "end_date": "2023-12-31 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2022-01-01 00:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-17 14:58:17",
    "is_delete": 0,
    "voucher_code": "iob0ucoe",
    "voucher_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684335497/images/l5iafokl5kfdc8uuvnki.jpg"
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('vouchers', vouchers, {});
     
    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('vouchers', null, {});
     
    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
