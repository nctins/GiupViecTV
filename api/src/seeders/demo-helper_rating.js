'use strict';
const helper_ratings = [
	{
		"id": 1,
		"post_id": "POS_6pvpbslfig4yfz",
		"helper_id": "HEL_g2pcl39gl8rm4dit",
		"target_id": "CUS_g2pcl14wl8rlwhcv",
		"rank": 4,
		"date_time": "2023-03-21 16:23:06",
		"content": "khách hàng thân thiện"
	},
	{
		"id": 2,
		"post_id": "POS_6pvpbslfifl821",
		"helper_id": "HEL_g2pcl39gl8rm4dit",
		"target_id": "CUS_g2pcl14wl8rlwhcv",
		"rank": 3,
		"date_time": "2023-05-31 15:55:45",
		"content": "binh thuong"
	},
	{
		"id": 3,
		"post_id": "POS_6pvpbslfifl812",
		"helper_id": "HEL_g2pcl39gl8rm4dit",
		"target_id": "CUS_g2pcl14wl8rlwhcv",
		"rank": 5,
		"date_time": "2023-05-31 15:56:00",
		"content": "rat tot"
	},
	{
		"id": 4,
		"post_id": "POS_6pvpbslfifl813",
		"helper_id": "HEL_g2pcl39gl8rm4dit",
		"target_id": "CUS_g2pcl14wl8rlwhcv",
		"rank": 2,
		"date_time": "2023-05-31 15:56:15",
		"content": "te"
	}
];

module.exports = {
  async up (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    await queryInterface.bulkInsert('helper_rating', helper_ratings, {});
	// enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('helper_rating', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
