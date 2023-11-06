'use strict';

const customer_accounts = [
		{
			"customer_id": "CUS_g2pcl14wl8rlwhcv",
			"email": "customer1@gmail.com",
			"password": "$2b$10$ISH6.kolNgfI6vWrxkqqS.wLqDzP1ZyjRw19q3ztVYzXy7QhRCwAK",
			"name": "Nguyễn văn A",
			"address": "371 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh",
			"phone": "0985763545",
			"create_user": "ADM_g2pcl8a8l8rl0icr",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "CUS_g2pcl14wl8rlwhcv",
			"update_date": "2023-03-21 14:59:45",
			"is_active": 1,
			"is_delete": 0,
			"avatar_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1679410785/images/ljhg8u6z4cuankhfc76h.jpg",
			"place_id": null
		},
		{
			"customer_id": "CUS_g2pcl28sl8rm2fvr",
			"email": "tinkthkt@gmail.com",
			"password": "$2b$10$ISH6.kolNgfI6vWrxkqqS.wLqDzP1ZyjRw19q3ztVYzXy7QhRCwAK",
			"name": "Nguyễn văn C",
			"address": "Tổ 22, khu phố 3A, phường Thạnh Lộc, quận 12, Thành phố Hồ Chí Minh",
			"phone": "0985784363",
			"create_user": "ADM_g2pcl8a8l8rl0icr",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "CUS_g2pcl28sl8rm2fvr",
			"update_date": "2023-03-21 15:37:24",
			"is_active": 1,
			"is_delete": 0,
			"avatar_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684597108/images/w9j8lcf3zoqkb1rvcfqw.jpg",
			"place_id": null
		},
		{
			"customer_id": "CUS_g2pcld3kl8rm2s0c",
			"email": "customer2@gmail.com",
			"password": "$2b$10$ISH6.kolNgfI6vWrxkqqS.wLqDzP1ZyjRw19q3ztVYzXy7QhRCwAK",
			"name": "Nguyễn văn B",
			"address": "90, đường Nguyễn Phúc Chu, phường 15, Tân Bình, Thành phố Hồ Chí Minh",
			"phone": "0986754221",
			"create_user": "ADM_g2pcl8a8l8rl0icr",
			"create_date": "2022-01-01 00:00:00",
			"update_user": "CUS_g2pcld3kl8rm2s0c",
			"update_date": "2023-03-21 15:30:58",
			"is_active": 1,
			"is_delete": 0,
			"avatar_url": "http://res.cloudinary.com/dru3umoml/image/upload/v1684596992/images/dv0vi7geccjrjcv9rd6c.jpg",
			"place_id": null
		}
	];

module.exports = {
  async up (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    
	await queryInterface.bulkInsert('customer_account', customer_accounts, {});
	
	// enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
},

  async down (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('customer_account', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
