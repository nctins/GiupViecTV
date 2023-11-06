'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("notifications", "notification_module", {
      type: Sequelize.STRING(30),
      comment: "module của thông báo (post, coupon, adv)",
    });
    
    await queryInterface.addColumn("notifications", "module_object_id", {
      type: Sequelize.CHAR(30),
      comment: "id cũa đối tượng thuộc module (post_id, voucher_id, adv_id)",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("notifications", "notification_module");
    await queryInterface.removeColumn("notifications", "module_object_id");
  }
};
