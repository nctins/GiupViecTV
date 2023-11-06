'use strict';
const system_control = [
		{
			name: "tax",
            value: "0.1"
		},
        {
			name: "service_fee",
            value: "0.1"
		},
	];

module.exports = {
  async up (queryInterface, Sequelize) {
     // disable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
     
     await queryInterface.bulkInsert('system_control', system_control, {});

     // enable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
     // disable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

     await queryInterface.bulkDelete('system_control', null, {});

     // enable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
