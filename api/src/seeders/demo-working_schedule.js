"use strict";

// helper1 làm full tuần sáng + chiều
// helper2 làm full sáng
// helper3 làm full chiều
const working_schedule = [
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"day": 0,
			"is_working": 1,
			"time_from_1": "08:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": "13:15:00",
			"time_to_2": "17:00:00",
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"day": 1,
			"is_working": 1,
			"time_from_1": "08:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": "13:15:00",
			"time_to_2": "17:00:00",
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"day": 2,
			"is_working": 1,
			"time_from_1": "08:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": "13:15:00",
			"time_to_2": "17:00:00",
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"day": 3,
			"is_working": 1,
			"time_from_1": "08:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": "13:15:00",
			"time_to_2": "17:00:00",
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"day": 4,
			"is_working": 1,
			"time_from_1": "08:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": "13:15:00",
			"time_to_2": "17:00:00",
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"day": 5,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "11:00:00",
			"time_from_2": "12:00:00",
			"time_to_2": "15:00:00",
			"time_from_3": "15:30:00",
			"time_to_3": "19:00:00"
		},
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"day": 6,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "11:00:00",
			"time_from_2": "12:00:00",
			"time_to_2": "15:00:00",
			"time_from_3": "15:30:00",
			"time_to_3": "19:00:00"
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"day": 0,
			"is_working": 1,
			"time_from_1": "13:00:00",
			"time_to_1": "17:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"day": 1,
			"is_working": 1,
			"time_from_1": "13:00:00",
			"time_to_1": "17:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"day": 2,
			"is_working": 1,
			"time_from_1": "13:00:00",
			"time_to_1": "17:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"day": 3,
			"is_working": 1,
			"time_from_1": "13:00:00",
			"time_to_1": "17:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"day": 4,
			"is_working": 1,
			"time_from_1": "13:00:00",
			"time_to_1": "17:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"day": 5,
			"is_working": 1,
			"time_from_1": "13:00:00",
			"time_to_1": "17:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"day": 6,
			"is_working": 1,
			"time_from_1": "13:00:00",
			"time_to_1": "17:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"day": 0,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"day": 1,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"day": 2,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"day": 3,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"day": 4,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"day": 5,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"day": 6,
			"is_working": 1,
			"time_from_1": "07:00:00",
			"time_to_1": "12:00:00",
			"time_from_2": null,
			"time_to_2": null,
			"time_from_3": null,
			"time_to_3": null
		}
	];

module.exports = {
  async up(queryInterface, Sequelize) {
	// disable constraint check
	await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert( "working_schedule", working_schedule, {});
     
	// enable constraint check
	await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down(queryInterface, Sequelize) {
	// disable constraint check
	await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete("working_schedule", null, {});
     
	// enable constraint check
	await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },
};