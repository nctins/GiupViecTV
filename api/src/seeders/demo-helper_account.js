"use strict";

// Địa chỉ của helper: 
// 	helper1: quận 9
//	helper2: quận 7
//  helper3: quận 12 
const helper_accounts =	[
		{
			"helper_id": "HEL_g2pcl39gl8rm4dit",
			"email": "helper1@gmail.com",
			"password": "$2b$10$zEa5vxrhkxsQ1xfjfQK93.1RLkqzQjUplVzTR.KzlKWDQpCMTOhIe",
			"name": "Trần Thị A",
			"address": "10 Đường 225, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh, Vietnam",
			"phone": "0937368597",
			"MSDD": "748503936472",
			"create_user": "ADM_g2pcl8a8l8rl0icr",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "HEL_g2pcl39gl8rm4dit",
			"update_date": "2023-03-20 17:16:38",
			"is_active": 1,
			"is_delete": 0,
			"avatar_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684596202/images/xqi4xj1ccwmrbk7krfzt.jpg",
			"last_payment_date": null,
			"credits": 70,
			"place_id": "ChIJz2Jl2lcndTERQkhlSMw4-Qc"
		},
		{
			"helper_id": "HEL_g2pcl39wl8rm4x5f",
			"email": "nguyencongtin2000@gmail.com",
			"password": "$2b$10$5V8RWUD.lVEbyjNkbvFKSOEkpyjEkDUfuOsBPJ50y5dmMUU4drMOm",
			"name": "Trần Thị C",
			"address": "B16 Tổ 47 Khu Phố 4, Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh, Vietnam",
			"phone": "0937378397",
			"MSDD": "748536472",
			"create_user": "ADM_g2pcl8a8l8rl0icr",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "HEL_g2pcl39wl8rm4x5f",
			"update_date": "2023-03-20 16:55:25",
			"is_active": 1,
			"is_delete": 0,
			"avatar_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684596486/images/c1kvpoy2utxgxx4d4n89.jpg",
			"last_payment_date": null,
			"credits": 70,
			"place_id": "ChIJf-uWpDAqdTERURF5HT6HBzQ"
		},
		{
			"helper_id": "HEL_g2pcl8acl8rm4lkx",
			"email": "helper2@gmail.com",
			"password": "$2b$10$RuCQ7E3EY2bjzvqHcdRwQ..X4Vj0n3yGFqa9rSztmlp5YpBeVv.L.",
			"name": "Trần Thị B",
			"address": "38a Nguyễn Văn Quỳ, Phú Thuận, Quận 7, Thành phố Hồ Chí Minh, Vietnam",
			"phone": "0937783597",
			"MSDD": "748503936847",
			"create_user": "ADM_g2pcl8a8l8rl0icr",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "HEL_g2pcl8acl8rm4lkx",
			"update_date": "2023-03-20 16:50:49",
			"is_active": 1,
			"is_delete": 0,
			"avatar_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684596359/images/vryf9labdp3pa8iea0l1.jpg",
			"last_payment_date": null,
			"credits": 70,
			"place_id": "ChIJ82xGvVcldTERAytAfmtBKhQ"
		}
	]

module.exports = {
  async up(queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert( "helper_account", helper_accounts, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down(queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete("helper_account", null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },
};