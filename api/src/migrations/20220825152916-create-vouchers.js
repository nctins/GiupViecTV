"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vouchers", {
      voucher_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
        comment: "tạo theo hàm uniqid(\"VOU_\")",
      },
      voucher_name: {
        type: Sequelize.STRING(150),
        comment: "tên voucher"
      },
      voucher_type: {
        type: Sequelize.TINYINT(1),
        comment: "0: tính theo discount_percent, 1: tính theo discount_price",
      },
      voucher_description: {
        type: Sequelize.TEXT,
      },
      discount_percent: {
        type: Sequelize.DECIMAL(5,4),
        comment: "chiết khấu %. các giá trị hợp lệ: 100%: 1.0000, 35%: 0.3500,... ",
      },
      discount_price: {
        type: Sequelize.INTEGER(9),
        comment: "chiết khấu theo tiền (null nếu type = 0)",
      },
      min_post_price: {
        type: Sequelize.INTEGER(9),
        comment: "áp dụng cho đơn hàng tối thiểu",
      },
      max_discount_price: {
        type: Sequelize.INTEGER(9),
        comment: "số tiền giảm giá tối đa (null nếu type = 1)",
      },
      quantity: {
        type: Sequelize.INTEGER(5),
        comment: "số lượng voucher",
      },
      payment_method_condition: {
        type: Sequelize.TINYINT(1),
        comment: "0: áp dụng cho tất cả payment method, 1: áp dụng cho COD, 2: áp dụng cho VNPAY",
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      create_user: {
        type: Sequelize.CHAR(22),
      },
      create_date: {
        type: Sequelize.DATE,
      },
      update_user: {
        type: Sequelize.CHAR(22),
      },
      update_date: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vouchers");
  },
};
