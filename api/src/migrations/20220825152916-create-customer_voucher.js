"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customer_voucher", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      voucher_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      customer_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      is_used: {
        type: Sequelize.BOOLEAN,
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

    await queryInterface.addConstraint('customer_voucher',{
      type: 'UNIQUE',
      fields: ['voucher_id', 'customer_id'],
      name: 'customer_voucher_UNQ_voucherID_and_customerID',
    });

  },
  async down(queryInterface, Sequelize) {
     // await queryInterface.removeConstraint('customer_voucher', 'customer_voucher_UNQ_voucherID_and_customerID');
    await queryInterface.dropTable("customer_voucher");
  },
};
