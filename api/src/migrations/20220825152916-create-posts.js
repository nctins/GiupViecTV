"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      post_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
      },
      customer_id: {
        type: Sequelize.CHAR(22),
      },
      post_type: {
        type: Sequelize.TINYINT(1),
        comment: "0: đơn hàng theo giờ, 1: đơn hàng tức thì",
      },
      helper_id: {
        type: Sequelize.CHAR(22),
        comment: "id của ngv nhận đơn hàng",
      },
      payment_method: {
        type: Sequelize.TINYINT(1),
        comment: "0 - TIỀN MẶT || 1 - VNPAY",
        defaultValue: 0,
      },
      address: {
        type: Sequelize.STRING(150),
      },
      date: {
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.TIME,
      },
      note: {
        type: Sequelize.TEXT,
      },
      total: {
        type: Sequelize.INTEGER(9),
      },
      voucher_id: {
        type: Sequelize.CHAR(22),
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
    await queryInterface.dropTable("posts");
  },
};
