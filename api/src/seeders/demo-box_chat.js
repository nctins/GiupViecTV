'use strict';

const box_chats = [
  {
    "box_chat_id": "BOX_6pvoqllibvvdbr",
    "customer_id": "CUS_g2pcl14wl8rlwhcv",
    "helper_id": "HEL_g2pcl39gl8rm4dit"
  },
  {
    "box_chat_id": "BOX_g2pclaw8l92y1ypm",
    "customer_id": "CUS_g2pcl28sl8rm2fvr",
    "helper_id": "HEL_g2pcl39gl8rm4dit"
  },
  {
    "box_chat_id": "BOX_6pvoqllibvv2a2",
    "customer_id": "CUS_g2pcl14wl8rlwhcv",
    "helper_id": "HEL_g2pcl39wl8rm4x5f"
  },
  {
    "box_chat_id": "BOX_g2pclaw8l92y1ypy",
    "customer_id": "CUS_g2pcl28sl8rm2fvr",
    "helper_id": "HEL_g2pcl39wl8rm4x5f"
  },
  {
    "box_chat_id": "BOX_6pvoqllibvvlsr",
    "customer_id": "CUS_g2pcl14wl8rlwhcv",
    "helper_id": "HEL_g2pcl8acl8rm4lkx"
  },
  {
    "box_chat_id": "BOX_g2pclaw8l92y1ypx",
    "customer_id": "CUS_g2pcl28sl8rm2fvr",
    "helper_id": "HEL_g2pcl8acl8rm4lkx"
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('box_chat', [
      // box chat của đơn hàng duy nhất có ngv
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypm",
        customer_id: "CUS_g2pcl28sl8rm2fvr",
        helper_id: "HEL_g2pcl39gl8rm4dit",
      },
      
      // box chat khác dùng để demo
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypx",
        customer_id: "CUS_g2pcl28sl8rm2fvr",
        helper_id: "HEL_g2pcl8acl8rm4lkx",
      },
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypy",
        customer_id: "CUS_g2pcl28sl8rm2fvr",
        helper_id: "HEL_g2pcl39wl8rm4x5f",
      },
      
    ], {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('box_chat', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
