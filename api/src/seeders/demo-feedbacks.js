'use strict';
const feedbacks = [
  {
    "feedback_id": "FEB_1d13xf1elhxcs09e",
    "user_id": "CUS_g2pcl14wl8rlwhcv",
    "create_user": "CUS_g2pcl14wl8rlwhcv",
    "create_date": "2023-05-21 11:46:31",
    "content": "Tôi gặp một số lỗi"
  },
  {
    "feedback_id": "FEB_2m3k7zw1elhrsncjh",
    "user_id": "HEL_g2pcl39gl8rm4dit",
    "create_user": "HEL_g2pcl39gl8rm4dit",
    "create_date": "2023-05-17 14:24:11",
    "content": "tôi gặp lỗi khi hoàn thánh lịch hẹn"
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    await queryInterface.bulkInsert('feedbacks', feedbacks, {});
    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('feedbacks', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
