'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // update post table
    await queryInterface.addColumn("posts", "coupon_price", {
      type: Sequelize.INTEGER(9)
    })

    // update token table
    await queryInterface.addColumn("tokens", "expo_notifi_token", {
      type: Sequelize.CHAR(22)
    })
    await queryInterface.addColumn("tokens", "otp", {
      type: Sequelize.CHAR(5)
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("posts", "coupon_price");
    await queryInterface.removeColumn("tokens", "expo_notifi_token");
    await queryInterface.removeColumn("tokens", "otp");
  }
};
