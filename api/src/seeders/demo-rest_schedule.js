"use strict";
const rest_schedule = [
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"date": "2023-03-10 17:00:00",
			"off_time_1": 1,
			"off_time_2": 0,
			"off_time_3": 0
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"date": "2023-03-30 17:00:00",
			"off_time_1": 1,
			"off_time_2": 1,
			"off_time_3": 0
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"date": "2023-05-08 17:00:00",
			"off_time_1": 1,
			"off_time_2": 0,
			"off_time_3": 0
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"date": "2023-05-20 17:00:00",
			"off_time_1": 1,
			"off_time_2": 1,
			"off_time_3": 1
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"date": "2023-07-16 17:00:00",
			"off_time_1": 0,
			"off_time_2": 1,
			"off_time_3": 0
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"date": "2023-07-18 17:00:00",
			"off_time_1": 0,
			"off_time_2": 1,
			"off_time_3": 0
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"date": "2023-07-21 17:00:00",
			"off_time_1": 1,
			"off_time_2": 0,
			"off_time_3": 1
		}
	];

module.exports = {
  async up(queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert("rest_schedule", rest_schedule, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down(queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete("rest_schedule", null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },
};
