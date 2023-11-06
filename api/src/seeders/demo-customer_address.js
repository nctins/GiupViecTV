'use strict';

// Địa chỉ của customer:
//  customer1: quan 9, 7, 12
//  customer2: quan 12, tan binh
//  customer3: quan 9
const customer_addresses = [
		{
			"customer_address_id": "CUA_6pvpbslfieedwm",
			"customer_id": "CUS_g2pcl14wl8rlwhcv",
			"address_title": "cơ quan",
			"address": "137 Tôn Dật Tiên, Tân Phú, Quận 7, Thành phố Hồ Chí Minh, Vietnam",
			"create_user": "CUS_g2pcl14wl8rlwhcv",
			"create_date": "2023-03-21 15:15:58",
			"update_user": "CUS_g2pcl14wl8rlwhcv",
			"update_date": "2023-03-21 15:15:58",
			"is_delete": 0,
			"place_id": "ChIJSUCSyPIvdTERo2zq9EvEhg8"
		},
		{
			"customer_address_id": "CUA_6pvpbslfif0wsf",
			"customer_id": "CUS_g2pcld3kl8rm2s0c",
			"address_title": "cơ quan",
			"address": "56a Nguyễn Văn Quá, Đông Hưng Thuận, Quận 12, Thành phố Hồ Chí Minh, Vietnam",
			"create_user": "CUS_g2pcld3kl8rm2s0c",
			"create_date": "2023-03-21 15:33:28",
			"update_user": "CUS_g2pcld3kl8rm2s0c",
			"update_date": "2023-03-21 15:33:28",
			"is_delete": 0,
			"place_id": "ChIJqUXfTdYrdTERce5baNnKLow"
		},
		{
			"customer_address_id": "CUA_g2pcl14wl8rlwhav",
			"customer_id": "CUS_g2pcl14wl8rlwhcv",
			"address_title": "nhà bố mẹ",
			"address": "6 Đường Tăng Nhơn Phú, Phước Long B, Quận 9, Thành phố Hồ Chí Minh, Vietnam",
			"create_user": "CUS_g2pcl14wl8rlwhcv",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "CUS_g2pcl14wl8rlwhcv",
			"update_date": "2023-03-21 15:08:49",
			"is_delete": 0,
			"place_id": "ChIJ6UMndYwndTER6gCbvfP_FEw"
		},
		{
			"customer_address_id": "CUA_g2pcl14wl8rlwhcv",
			"customer_id": "CUS_g2pcl14wl8rlwhcv",
			"address_title": "Nhà riêng",
			"address": "279 Quốc lộ 1A &, An Phú Đông 12, An Phú Đông, Quận 12, Thành phố Hồ Chí Minh, Vietnam",
			"create_user": "CUS_g2pcl14wl8rlwhcv",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "CUS_g2pcl14wl8rlwhcv",
			"update_date": "2023-03-21 15:14:18",
			"is_delete": 0,
			"place_id": "ChIJOYlUj-EpdTER5dag8Reou_8"
		},
		{
			"customer_address_id": "CUA_g2pcl28sl8rm2fvr",
			"customer_id": "CUS_g2pcl28sl8rm2fvr",
			"address_title": "Nhà riêng",
			"address": "213 Đ. Tây Hòa, Phước Long A, Quận 9, Thành phố Hồ Chí Minh 700000, Vietnam",
			"create_user": "CUS_g2pcl28sl8rm2fvr",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "CUS_g2pcl28sl8rm2fvr",
			"update_date": "2023-03-21 15:38:24",
			"is_delete": 0,
			"place_id": "ChIJ0afrPYAndTERqNnUeXefqsc"
		},
		{
			"customer_address_id": "CUA_g2pcld3kl8rm2sxc",
			"customer_id": "CUS_g2pcld3kl8rm2s0c",
			"address_title": "Nhà riêng",
			"address": "90 Nguyễn Phúc Chu, Phường 15, Tân Bình, Thành phố Hồ Chí Minh, Vietnam",
			"create_user": "CUS_g2pcld3kl8rm2s0c",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "CUS_g2pcld3kl8rm2s0c",
			"update_date": "2023-03-21 15:41:04",
			"is_delete": 0,
			"place_id": "ChIJgxXKumMpdTERCnaarwwDaPA"
		}
	];

module.exports = {
  async up (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('customer_address', customer_addresses, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('customer_address', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
