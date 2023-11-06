'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // update posts table
    await queryInterface.addColumn("helper_account", "avatar_url", {
      type: Sequelize.TEXT,
    })
    await queryInterface.addColumn("customer_account", "avatar_url", {
      type: Sequelize.TEXT,

    })
    await queryInterface.addColumn("admin_account", "avatar_url", {
      type: Sequelize.TEXT,

    })
    await queryInterface.addColumn("vouchers", "voucher_url", {
      type: Sequelize.TEXT,

    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // undo posts table
    // await queryInterface.removeColumn("helper_account", "avatar_url");
    await queryInterface.removeColumn("customer_account", "avatar_url");
    await queryInterface.removeColumn("admin_account", "avatar_url");
    await queryInterface.removeColumn("vouchers", "voucher_url");
  }
};
