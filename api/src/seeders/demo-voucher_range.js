'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     // disable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

     await queryInterface.bulkInsert('voucher_range', [
       {
         id: "VOR_g2pcl5ysl91ld73s",
         voucher_id: "VOU_g2pcl464l91inos5",
         service_id: null,
         is_all_service: 1,
       },
       {
         id: "VOR_g2pcl5ysl91ld73t",
         voucher_id: "VOU_g2pcl104l91ix8gn",
         service_id: null,
         is_all_service: 1,
       },
       {
         id: "VOR_g2pcl5ysl91ld73u",
         voucher_id: "VOU_g2pcl734l91j2kwy",
         service_id: "SER_g2pcla8gl8sxwykf", // dọn phòng khách
         is_all_service: 0,
       },
       {
         id: "VOR_g2pcl5ysl91ld73v",
         voucher_id: "VOU_g2pcl5ggl91j69bn",
         service_id: null,
         is_all_service: 1,
       },
     ], {});

     // enable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('voucher_range', null, {});
     
    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
