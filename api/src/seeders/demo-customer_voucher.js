'use strict';

const customer_vouchers = [
	{
	  voucher_id: "VOU_6pvn3vlh08t585",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 0,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2023-04-28 07:47:50",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2023-04-28 07:47:50"
	},
	{
	  voucher_id: "VOU_6pvn3vlh08u68c",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 0,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2023-04-28 07:48:03",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2023-04-28 07:48:03"
	},
	{
	  voucher_id: "VOU_6pvn3vlh08w7in",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 0,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2023-04-28 07:48:19",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2023-04-28 07:48:19"
	},
	{
	  voucher_id: "VOU_6pvn3vlh08y5b6",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 0,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2023-04-28 07:48:34",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2023-04-28 07:48:34"
	},
	{
	  voucher_id: "VOU_g2pcl104l91ix8gn",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 1,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl104l91ix8gn",
	  customer_id: "CUS_g2pcl28sl8rm2fvr",
	  is_used: 0,
	  create_user: "CUS_g2pcl28sl8rm2fvr",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcl28sl8rm2fvr",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl464l91inos5",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 1,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl464l91inos5",
	  customer_id: "CUS_g2pcl28sl8rm2fvr",
	  is_used: 0,
	  create_user: "CUS_g2pcl28sl8rm2fvr",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcl28sl8rm2fvr",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl464l91inos5",
	  customer_id: "CUS_g2pcld3kl8rm2s0c",
	  is_used: 0,
	  create_user: "CUS_g2pcld3kl8rm2s0c",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcld3kl8rm2s0c",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl5ggl91j69bn",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 1,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl5ggl91j69bn",
	  customer_id: "CUS_g2pcld3kl8rm2s0c",
	  is_used: 1,
	  create_user: "CUS_g2pcld3kl8rm2s0c",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcld3kl8rm2s0c",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl734l91j2kwy",
	  customer_id: "CUS_g2pcl14wl8rlwhcv",
	  is_used: 1,
	  create_user: "CUS_g2pcl14wl8rlwhcv",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcl14wl8rlwhcv",
	  update_date: "2022-01-01 00:00:00"
	},
	{
	  voucher_id: "VOU_g2pcl734l91j2kwy",
	  customer_id: "CUS_g2pcl28sl8rm2fvr",
	  is_used: 0,
	  create_user: "CUS_g2pcl28sl8rm2fvr",
	  create_date: "2022-01-01 00:00:00",
	  update_user: "CUS_g2pcl28sl8rm2fvr",
	  update_date: "2022-01-01 00:00:00"
	}
  ];

module.exports = {
  async up (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    await queryInterface.bulkInsert('customer_voucher', customer_vouchers, {});
	// enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('customer_voucher', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
