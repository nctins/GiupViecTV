'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('admin_account', [
      {
        admin_id: "ADM_g2pcl8a8l8rl0icr",
        user_name: "admin1",
        password: "$2b$10$H5A8RhvJcvxEsAa2/ooL9.bpCOlqQhADSgMlPfhC0dAs9sNBT6Aay", // admin
        name: "Admin 1 Nguyễn",
        create_user: "ADM_g2pcl8a8l8rl0icr",
        create_date: "2022-01-01 00:00:00",
        update_user: "ADM_g2pcl8a8l8rl0icr",
        update_date: "2022-01-01 00:00:00",
      },
      {
        admin_id: "ADM_g2pcl55cl8rlmtac",
        user_name: "admin2",
        password: "$2b$10$H5A8RhvJcvxEsAa2/ooL9.bpCOlqQhADSgMlPfhC0dAs9sNBT6Aay", // admin
        name: "Admin 2 Nguyễn",
        create_user: "ADM_g2pcl8a8l8rl0icr",
        create_date: "2022-01-01 00:00:00",
        update_user: "ADM_g2pcl8a8l8rl0icr",
        update_date: "2022-01-01 00:00:00",
      }
    ], {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('admin_account', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
