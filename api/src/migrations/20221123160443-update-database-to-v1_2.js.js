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
    await queryInterface.addColumn("posts", "customer_name", {
      type: Sequelize.STRING(30),
    })
    await queryInterface.addColumn("posts", "customer_phone", {
      type: Sequelize.CHAR(10),
    })

    // update post_details table
    await queryInterface.addColumn("post_detail", "total", {
      type: Sequelize.INTEGER(9),
    })
    
    // update post_details table
    await queryInterface.addColumn("feedbacks", "content", {
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
    await queryInterface.removeColumn("posts", "customer_name");
    await queryInterface.removeColumn("posts", "customer_phone");

    // undo post_detail table
    await queryInterface.removeColumn("post_detail", "total");

    // undo feedbacks table
    await queryInterface.removeColumn("feedbacks", "content");
  }
};
