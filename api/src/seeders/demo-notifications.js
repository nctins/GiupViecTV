'use strict';
const notifications = [
  {
    "notification_id": "NTF_6pvjyllibtp4aq",
    "user_id": "HEL_g2pcl39gl8rm4dit",
    "icon_code": "order_matcch",
    "title": "Ghép nối thành công",
    "content": "Bạn có thêm lịch hẹn với khách hàng Nguyễn văn A vào lúc 09:05 ngày 01/06/2023.",
    "is_view": null,
    "create_user": "HEL_g2pcl39gl8rm4dit",
    "create_date": "2023-05-31 14:48:56",
    "update_user": "HEL_g2pcl39gl8rm4dit",
    "update_date": "2023-05-31 14:48:56",
    "notification_module": "POST",
    "module_object_id": "POS_6pvjyllibtp3yr"
  },
  {
    "notification_id": "NTF_6pvliklibu1th1",
    "user_id": "HEL_g2pcl39wl8rm4x5f",
    "icon_code": "order_matcch",
    "title": "Ghép nối thành công",
    "content": "Bạn có thêm lịch hẹn với khách hàng Nguyễn văn A vào lúc 13:10 ngày 01/06/2023.",
    "is_view": null,
    "create_user": "HEL_g2pcl39wl8rm4x5f",
    "create_date": "2023-05-31 14:58:49",
    "update_user": "HEL_g2pcl39wl8rm4x5f",
    "update_date": "2023-05-31 14:58:49",
    "notification_module": "POST",
    "module_object_id": "POS_6pvliklibu1t8l"
  },
  {
    "notification_id": "NTF_6pvliklibu7fg0",
    "user_id": "HEL_g2pcl39wl8rm4x5f",
    "icon_code": "order_matcch",
    "title": "Ghép nối thành công",
    "content": "Bạn có thêm lịch hẹn với khách hàng Nguyễn văn A vào lúc 13:10 ngày 16/06/2023.",
    "is_view": null,
    "create_user": "HEL_g2pcl39wl8rm4x5f",
    "create_date": "2023-05-31 15:03:11",
    "update_user": "HEL_g2pcl39wl8rm4x5f",
    "update_date": "2023-05-31 15:03:11",
    "notification_module": "POST",
    "module_object_id": "POS_6pvliklibu7f8t"
  },
  {
    "notification_id": "NTF_6pvliklibuaezv",
    "user_id": "HEL_g2pcl8acl8rm4lkx",
    "icon_code": "order_matcch",
    "title": "Ghép nối thành công",
    "content": "Bạn có thêm lịch hẹn với khách hàng Nguyễn văn A vào lúc 07:15 ngày 16/06/2023.",
    "is_view": null,
    "create_user": "HEL_g2pcl8acl8rm4lkx",
    "create_date": "2023-05-31 15:05:30",
    "update_user": "HEL_g2pcl8acl8rm4lkx",
    "update_date": "2023-05-31 15:05:30",
    "notification_module": "POST",
    "module_object_id": "POS_6pvliklibuaeps"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7sb",
    "user_id": "CUS_g2pcl14wl8rlwhcv",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #fl8tv",
    "content": "Lịch hẹn #fl8tv đã bị hủy vì quá thời gian dự kiến hoành thành 24 giờ.",
    "is_view": null,
    "create_user": "CUS_g2pcl14wl8rlwhcv",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "CUS_g2pcl14wl8rlwhcv",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfifl8tv"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7sc",
    "user_id": "HEL_g2pcl39gl8rm4dit",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #fl8tv",
    "content": "Lịch hẹn #fl8tv đã bị hủy vì quá thời gian dự kiến hoàn thành 24 giờ. Bạn đã bị trừ 1 điểm tin cậy.",
    "is_view": null,
    "create_user": "HEL_g2pcl39gl8rm4dit",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "HEL_g2pcl39gl8rm4dit",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfifl8tv"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7sd",
    "user_id": "CUS_g2pcl14wl8rlwhcv",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #fvqdh",
    "content": "Lịch hẹn #fvqdh đã bị hủy vì quá thời gian dự kiến hoành thành 24 giờ.",
    "is_view": null,
    "create_user": "CUS_g2pcl14wl8rlwhcv",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "CUS_g2pcl14wl8rlwhcv",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfifvqdh"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7se",
    "user_id": "HEL_g2pcl8acl8rm4lkx",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #fvqdh",
    "content": "Lịch hẹn #fvqdh đã bị hủy vì quá thời gian dự kiến hoàn thành 24 giờ. Bạn đã bị trừ 1 điểm tin cậy.",
    "is_view": null,
    "create_user": "HEL_g2pcl8acl8rm4lkx",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "HEL_g2pcl8acl8rm4lkx",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfifvqdh"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7sf",
    "user_id": "CUS_g2pcl14wl8rlwhcv",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #fy7po",
    "content": "Lịch hẹn #fy7po đã bị hủy vì quá thời gian dự kiến hoành thành 24 giờ.",
    "is_view": null,
    "create_user": "CUS_g2pcl14wl8rlwhcv",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "CUS_g2pcl14wl8rlwhcv",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfify7po"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7sg",
    "user_id": "HEL_g2pcl8acl8rm4lkx",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #fy7po",
    "content": "Lịch hẹn #fy7po đã bị hủy vì quá thời gian dự kiến hoàn thành 24 giờ. Bạn đã bị trừ 1 điểm tin cậy.",
    "is_view": null,
    "create_user": "HEL_g2pcl8acl8rm4lkx",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "HEL_g2pcl8acl8rm4lkx",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfify7po"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7sh",
    "user_id": "CUS_g2pcl14wl8rlwhcv",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #g3l8s",
    "content": "Lịch hẹn #g3l8s đã bị hủy vì quá thời gian dự kiến hoành thành 24 giờ.",
    "is_view": null,
    "create_user": "CUS_g2pcl14wl8rlwhcv",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "CUS_g2pcl14wl8rlwhcv",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfig3l8s"
  },
  {
    "notification_id": "NTF_6pvm3ulibud7si",
    "user_id": "HEL_g2pcl39wl8rm4x5f",
    "icon_code": "order_cancel",
    "title": "Lịch hẹn #g3l8s",
    "content": "Lịch hẹn #g3l8s đã bị hủy vì quá thời gian dự kiến hoàn thành 24 giờ. Bạn đã bị trừ 1 điểm tin cậy.",
    "is_view": null,
    "create_user": "HEL_g2pcl39wl8rm4x5f",
    "create_date": "2023-05-31 15:07:41",
    "update_user": "HEL_g2pcl39wl8rm4x5f",
    "update_date": "2023-05-31 15:07:41",
    "notification_module": "POST",
    "module_object_id": "POS_6pvpbslfig3l8s"
  },
  {
    "notification_id": "NTF_g2pcl9wwl92xuv8j",
    "user_id": "CUS_g2pcl14wl8rlwhcv",
    "icon_code": "logoIcon",
    "title": "Giúp việc T&V",
    "content": "Khuyến mãi giảm 10% khi thanh toán dịch vụ giúp việc nhà theo giờ khi thanh toán thông qua cổng thanh toán ví VNPay. ",
    "is_view": 0,
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2022-10-10 12:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2022-10-10 12:00:00",
    "notification_module": null,
    "module_object_id": null
  },
  {
    "notification_id": "NTF_g2pcl9wwl92xuy8j",
    "user_id": "CUS_g2pcl14wl8rlwhcv",
    "icon_code": "coupon",
    "title": "Giúp việc T&V",
    "content": "Khuyến mãi giảm 10% khi thanh toán dịch vụ giúp việc nhà theo giờ khi thanh toán thông qua cổng thanh toán ví VNPay. ",
    "is_view": 0,
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2022-10-10 12:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2022-10-10 12:00:00",
    "notification_module": null,
    "module_object_id": null
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    await queryInterface.bulkInsert('notifications', notifications, {});
    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('notifications', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
