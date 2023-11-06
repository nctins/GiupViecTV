"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("feedbacks", {
      feedback_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
        comment: "tạo theo hàm uniqid(\"FEB_\")",
      },
      user_id: {
        type: Sequelize.CHAR(22),
      },
      create_user: {
        type: Sequelize.CHAR(22),
      },
      create_date: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("feedbacks");
  },
};
