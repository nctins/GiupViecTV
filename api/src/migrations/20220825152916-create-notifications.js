"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      notification_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
        comment: "tạo theo hàm uniqid(\"NTF_\")",
      },
      user_id: {
        type: Sequelize.CHAR(22),
      },
      icon_code: {
        type: Sequelize.STRING(30),
      },
      title: {
        type: Sequelize.STRING(50),
      },
      content: {
        type: Sequelize.TEXT,
      },
      is_view: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("notifications");
  },
};
