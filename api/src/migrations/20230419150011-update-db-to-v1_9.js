'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * add place_id to table
     *
     */

    // add service work table 
    await queryInterface.createTable("helper_income", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      helper_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      start_date: {
        type: Sequelize.DATE,
        // primaryKey: true,
      },
      end_date: {
          type: Sequelize.DATE,
          // primaryKey: true,
      },
      total_price: {
          type: Sequelize.INTEGER(9),
        },
      receive_price: {
          type: Sequelize.INTEGER(9),
      },
      enterprise_price: {
          type: Sequelize.INTEGER(9),
      }
    });

    await queryInterface.addConstraint('helper_income',{
      type: 'FOREIGN KEY',
      fields: ['helper_id'],
      name: 'helper_income_fk_helper_id',
      references: { table: 'helper_account', fields: ['helper_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('helper_income', 'helper_income_fk_helper_id');
    await queryInterface.dropTable("helper_income");
  }
};
