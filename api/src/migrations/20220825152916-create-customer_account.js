"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customer_account", {
      customer_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
        comment: "tạo theo hàm uniqid(\"CUS_\")",
      },
      email: {
        type: Sequelize.STRING(100)
      },
      password: {
        type: Sequelize.CHAR(60),
      },
      name: {
        type: Sequelize.STRING(30),
      },
      address: {
        type: Sequelize.STRING(150),
      },
      phone: {
        type: Sequelize.CHAR(10),
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
    await queryInterface.dropTable("customer_account");
  },
};
