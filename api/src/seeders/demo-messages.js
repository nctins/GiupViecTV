'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('messages', [
      // đoạn hội thoại của box chat đơn hàng có ngv
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypm",
        from_user_id: "HEL_g2pcl39gl8rm4dit",
        date_time: "2022-10-11 11:30:00",
        content: "Chào anh/chị em là người giúp việc chấp nhận đơn hàng của anh/chị.",
        is_view: 1,
        create_user: "HEL_g2pcl39gl8rm4dit",
        create_date: "2022-10-11 11:30:00",
        update_user: "HEL_g2pcl39gl8rm4dit",
        update_date: "2022-10-11 11:30:00",
      },
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypm",
        from_user_id: "HEL_g2pcl39gl8rm4dit",
        date_time: "2022-10-11 11:31:00",
        content: "Hiện giờ em đang trên đường tới không biết anh/chị có ở nhà không ạ.",
        is_view: 1,
        create_user: "HEL_g2pcl39gl8rm4dit",
        create_date: "2022-10-11 11:31:00",
        update_user: "HEL_g2pcl39gl8rm4dit",
        update_date: "2022-10-11 11:31:00",
      },
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypm",
        from_user_id: "CUS_g2pcl28sl8rm2fvr",
        date_time: "2022-10-11 11:31:00",
        content: "Chào bạn hiện tại mình đang có nhà.",
        is_view: 0,
        create_user: "CUS_g2pcl28sl8rm2fvr",
        create_date: "2022-10-11 11:40:00",
        update_user: "CUS_g2pcl28sl8rm2fvr",
        update_date: "2022-10-11 11:40:00",
      },

      // demo for test
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypx",
        from_user_id: "CUS_g2pcl28sl8rm2fvr",
        date_time: "2022-10-11 11:31:00",
        content: "hello",
        is_view: 0,
        create_user: "CUS_g2pcl28sl8rm2fvr",
        create_date: "2022-10-11 11:40:00",
        update_user: "CUS_g2pcl28sl8rm2fvr",
        update_date: "2022-10-11 11:40:00",
      },
      {
        box_chat_id: "BOX_g2pclaw8l92y1ypy",
        from_user_id: "CUS_g2pcl28sl8rm2fvr",
        date_time: "2022-10-11 11:31:00",
        content: "hello",
        is_view: 0,
        create_user: "CUS_g2pcl28sl8rm2fvr",
        create_date: "2022-10-11 11:40:00",
        update_user: "CUS_g2pcl28sl8rm2fvr",
        update_date: "2022-10-11 11:40:00",
      },
      
    ], {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('messages', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
