'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * add place_id to table
     *
     */

    // add service work table 
    await queryInterface.createTable("system_control", {
      name: {
        type: Sequelize.CHAR(30),
        primaryKey: true,
      },
      value: {
        type: Sequelize.TEXT,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("system_control");
  }
};
