"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("advertisements", {
      advertisement_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
        comment: "tạo theo hàm uniqid(\"ADV_\")",
      },
      poster_path: {
        type: Sequelize.STRING(100),
        comment: "path hình poster quảng cáo",
      },
      advertisement_title: {
        type: Sequelize.STRING(50),
      },
      advertisement_content: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("advertisements");
  },
};
