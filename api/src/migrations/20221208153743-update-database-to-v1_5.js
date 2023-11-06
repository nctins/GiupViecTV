'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // update helper_account table
    await queryInterface.addColumn("helper_account", "last_payment_date", {
      type: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("helper_account", "last_payment_date");
  }
};
