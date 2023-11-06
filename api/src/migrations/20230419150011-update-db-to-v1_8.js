'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * add place_id to table
     *
     */

    // add service work table 
    await queryInterface.createTable("helper_service_work", {
      // id: {
      //   type: Sequelize.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      helper_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
      },
      service_id: {
        type: Sequelize.CHAR(22),
        primaryKey: true,
      },
    });

    await queryInterface.addConstraint('helper_service_work',{
      type: 'UNIQUE',
      fields: ['helper_id', 'service_id'],
      name: 'helper_service_work_UNQ_helper_id_and_service_id',
    });
    
    await queryInterface.addConstraint('helper_service_work',{
      type: 'FOREIGN KEY',
      fields: ['helper_id'],
      name: 'helper_service_work_fk_helper_id',
      references: { table: 'helper_account', fields: ['helper_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })

    await queryInterface.addConstraint('helper_service_work',{
      type: 'FOREIGN KEY',
      fields: ['service_id'],
      name: 'helper_service_work_fk_service_id',
      references: { table: 'services', fields: ['service_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('helper_service_work', 'helper_service_work_fk_helper_id');
    await queryInterface.removeConstraint('helper_service_work', 'helper_service_work_fk_service_id');

    // await queryInterface.removeConstraint('helper_service_work', 'helper_service_work_UNQ_helper_id_and_service_id');

    await queryInterface.dropTable("helper_service_work");
  }
};
