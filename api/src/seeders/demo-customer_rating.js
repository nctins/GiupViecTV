'use strict';
const customer_ratings = [
	{
		"id": 1,
		"post_id": "POS_6pvpbslfig4yfz",
		"customer_id": "CUS_g2pcl14wl8rlwhcv",
		"target_id": "HEL_g2pcl39gl8rm4dit",
		"rank": 3,
		"date_time": "2023-03-21 16:45:19",
		"content": "hoan thanh cong viec dung nhu quy dinh"
	},
	{
		"id": 2,
		"post_id": "POS_6pvpbslfifl821",
		"customer_id": "CUS_g2pcl14wl8rlwhcv",
		"target_id": "HEL_g2pcl39gl8rm4dit",
		"rank": 4,
		"date_time": "2023-05-31 15:45:50",
		"content": "tot"
	},
	{
		"id": 3,
		"post_id": "POS_6pvpbslfifl820",
		"customer_id": "CUS_g2pcl14wl8rlwhcv",
		"target_id": "HEL_g2pcl39gl8rm4dit",
		"rank": 3,
		"date_time": "2023-05-31 15:46:08",
		"content": "binh thuong"
	},
	{
		"id": 4,
		"post_id": "POS_6pvpbslfifl822",
		"customer_id": "CUS_g2pcl14wl8rlwhcv",
		"target_id": "HEL_g2pcl39gl8rm4dit",
		"rank": 5,
		"date_time": "2023-05-31 15:46:19",
		"content": "rat tot"
	},
	{
		"id": 5,
		"post_id": "POS_6pvpbslfifl819",
		"customer_id": "CUS_g2pcl14wl8rlwhcv",
		"target_id": "HEL_g2pcl39gl8rm4dit",
		"rank": 2,
		"date_time": "2023-05-31 15:46:30",
		"content": "te"
	}
];

module.exports = {
  async up (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    
	await queryInterface.bulkInsert('customer_rating', customer_ratings, {});

	// enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('customer_rating', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
