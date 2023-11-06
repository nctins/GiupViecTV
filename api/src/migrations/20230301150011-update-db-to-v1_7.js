'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * add place_id to table
     *
     */

    // customer_account
    await queryInterface.addColumn("customer_account", "place_id", {
      type: Sequelize.TEXT,
    });

    // helper_account
    await queryInterface.addColumn("helper_account", "place_id", {
      type: Sequelize.TEXT,
    });
    
    // customer_address
    await queryInterface.addColumn("customer_address", "place_id", {
      type: Sequelize.TEXT,
    });
    
    // customer_address
    await queryInterface.addColumn("posts", "place_id", {
      type: Sequelize.TEXT,
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("customer_account", "place_id");
    await queryInterface.removeColumn("helper_account", "place_id");
    await queryInterface.removeColumn("customer_address", "place_id");
    await queryInterface.removeColumn("posts", "place_id");
  }
};
