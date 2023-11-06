"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tokens", {
      user_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      socket_id: {
        type: Sequelize.CHAR(20),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tokens");
  },
};
