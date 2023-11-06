"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("voucher_range", {
      id: {
        type: Sequelize.CHAR(22), 
        primaryKey: true,
        comment: "tạo theo hàm uniqid(\"VOR_\")",
      },
      voucher_id: {
        type: Sequelize.CHAR(22),
      },
      service_id: {
        type: Sequelize.CHAR(22),
      },
      is_all_service: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("voucher_range");
  },
};
