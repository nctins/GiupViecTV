"use strict";
/**
 * Update Database to version v1.1
 * Detail:
 *   - Thêm trường post_state để xác định trạng thái đơn hàng
 *   - Thêm các trường is_delete để xác định record đã bị xóa hay chưa
 *   - Thêm các trường is_active để xác định đối tượng đã public hay block
 */

module.exports = {
  async up(queryInterface, Sequelize) {

    // update table customer_account
    await queryInterface.addColumn("customer_account", "is_active", {
      type: Sequelize.BOOLEAN,
      comment: "trạng thái kích hoạt của tài khoản",
      defaultValue: 1,
    });
    await queryInterface.addColumn("customer_account", "is_delete", {
      type: Sequelize.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    });
    
    // update table helper_account
    await queryInterface.addColumn("helper_account", "is_active", {
      type: Sequelize.BOOLEAN,
      comment: "trạng thái kích hoạt của tài khoản",
      defaultValue: 0,
    });
    await queryInterface.addColumn("helper_account", "is_delete", {
      type: Sequelize.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    });
    
    // update table posts
    await queryInterface.addColumn("posts", "post_state", {
      type: Sequelize.TINYINT(1),
      comment: "0: đã hủy, 1: đã hoàn thành, 2: chờ xử lý, 3: chưa hoàn thành",
      defaultValue: 2,
    });
    await queryInterface.addColumn("posts", "is_delete", {
      type: Sequelize.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    });
    
    // update table services
    await queryInterface.addColumn("services", "is_active", {
      type: Sequelize.BOOLEAN,
      comment: "trạng thái kích hoạt (show) của dịch vụ",
      defaultValue: 1,
    });

    await queryInterface.addColumn("services", "is_delete", {
      type: Sequelize.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    });
    
    // update table vouchers
    await queryInterface.addColumn("vouchers", "is_delete", {
      type: Sequelize.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    });
    
    // update table advertisements
    await queryInterface.addColumn("advertisements", "is_delete", {
      type: Sequelize.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    });
    
    // update table customer_address
    await queryInterface.addColumn("customer_address", "is_delete", {
      type: Sequelize.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    
    // table customer_account
    await queryInterface.removeColumn("customer_account", "is_active");
    await queryInterface.removeColumn("customer_account", "is_delete");
    
    // table helper_account
    await queryInterface.removeColumn("helper_account", "is_active");
    await queryInterface.removeColumn("helper_account", "is_delete");
    
    // table posts
    await queryInterface.removeColumn("posts", "post_state");
    await queryInterface.removeColumn("posts", "is_delete");
    
    // table services
    await queryInterface.removeColumn("services", "is_active");
    await queryInterface.removeColumn("services", "is_delete");
    
    // table vouchers
    await queryInterface.removeColumn("vouchers", "is_delete");
    
    // table advertisements
    await queryInterface.removeColumn("advertisements", "is_delete");
    
    // table customer_address
    await queryInterface.removeColumn("customer_address", "is_delete");
  },
};
