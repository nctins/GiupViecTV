"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      service_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
      },
      service_name: {
        type: Sequelize.STRING(100),
      },
      service_description: {
        type: Sequelize.TEXT,
      },
      service_type: {
        type: Sequelize.TINYINT(1),
        comment: "0: normal, 1: bonus",
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
    await queryInterface.dropTable("services");
  },
};
