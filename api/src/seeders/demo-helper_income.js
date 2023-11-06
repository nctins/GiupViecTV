'use strict';
const helper_income = [
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"start_date": new Date("2023-01-01 00:00:00"),
      "end_date": new Date("2023-01-31 23:00:00"),
      "total_price": 3900000,
      "receive_price": 1400000,
      "enterprise_price": 780000,
		},
    {
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"start_date": new Date("2023-02-01 00:00:00"),
      "end_date": new Date("2023-02-28 23:00:00"),
      "total_price": 3900000,
      "receive_price": 2600000,
      "enterprise_price": 780000,
		},
    {
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"start_date": new Date("2023-03-01 00:00:00"),
      "end_date": new Date("2023-03-30 23:00:00"),
      "total_price": 1300000,
      "receive_price": 100000,
      "enterprise_price": 260000,
		},
    {
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"start_date": new Date("2023-04-01 00:00:00"),
      "end_date": new Date("2023-04-24 23:00:00"),
      "total_price": 1300000,
      "receive_price": 1300000,
      "enterprise_price": 260000,
		}
	];

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('helper_income', helper_income, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('helper_income', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
