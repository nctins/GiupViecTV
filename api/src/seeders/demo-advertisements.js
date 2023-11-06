'use strict';

const advertisements = [
  {
    "advertisement_id": "ADV_1kh9x4a7klgj4h6mo",
    "poster_path": "http://res.cloudinary.com/dru3umoml/image/upload/v1684594656/images/fotjmxis1iitt7byhv6x.png",
    "advertisement_title": "Giao Việc Nhà Cho Chúng Tôi ",
    "advertisement_content": "Có quá nhiều việc cần phải làm và không có đủ thời gian cho việc dọn dẹp nhà cửa? Hãy để chúng tôi giúp bạn!",
    "start_date": "2023-02-01 00:00:00",
    "end_date": "2023-12-30 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-04-16 08:05:40",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-20 15:04:46",
    "is_delete": 0
  },
  {
    "advertisement_id": "ADV_1kh9x4gzwlb9haoas",
    "poster_path": "http://res.cloudinary.com/dru3umoml/image/upload/v1684665217/images/psd0ybpkx1seorgy0wny.jpg",
    "advertisement_title": "Nhiều ưu đãi hấp dẫn",
    "advertisement_content": "Giảm giá 50% cho đơn hàng từ 500.000 VNĐ trở lên.",
    "start_date": "2023-01-01 00:00:00",
    "end_date": "2023-12-30 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-01-01 00:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-20 15:07:36",
    "is_delete": 0
  },
  {
    "advertisement_id": "ADV_6pv11qflhw4d3ym",
    "poster_path": "http://res.cloudinary.com/dru3umoml/image/upload/v1684594997/images/yjffjls6vnqdrxgfbxh3.webp",
    "advertisement_title": "Giúp Việc Nhà Tận Tâm - Giá Cả Phải Chăng",
    "advertisement_content": "Công việc bận rộn và không có thời gian cho việc dọn dẹp nhà cửa? Chúng tôi sẵn sàng giúp bạn! ",
    "start_date": "2023-01-01 00:00:00",
    "end_date": "2023-12-31 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-05-20 15:03:13",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-20 15:03:13",
    "is_delete": 0
  },
  {
    "advertisement_id": "ADV_6pv11qflhw4hzcd",
    "poster_path": "http://res.cloudinary.com/dru3umoml/image/upload/v1684595222/images/vzxeyhf1kwhadrl4jv8h.jpg",
    "advertisement_title": "Dọn Dẹp Nhà Cửa Dễ Dàng Với Dịch Vụ Giúp Việc",
    "advertisement_content": "Dọn dẹp nhà cửa là một công việc mệt nhọc và tốn thời gian. Hãy để chúng tôi giúp bạn!",
    "start_date": "2023-01-01 00:00:00",
    "end_date": "2023-12-31 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-05-20 15:07:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-20 15:07:00",
    "is_delete": 0
  },
  {
    "advertisement_id": "ADV_dq241elhovdiqt",
    "poster_path": "http://res.cloudinary.com/dru3umoml/image/upload/v1684665147/images/n2pnlbe6gxdvbs1o4w7y.jpg",
    "advertisement_title": "Đặt lịch hẹn ngay!",
    "advertisement_content": "Dịch vụ giúp việc nhà theo giờ của chúng tôi sẽ giúp bạn tiết kiệm thời gian và năng lượng",
    "start_date": "2023-05-01 00:00:00",
    "end_date": "2023-05-31 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-05-15 13:17:12",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-20 15:08:37",
    "is_delete": 0
  },
  {
    "advertisement_id": "ADV_g2pcl55cl8rlmtac",
    "poster_path": "http://res.cloudinary.com/dru3umoml/image/upload/v1684594674/images/gr5ie3upu05jmhkaksnj.jpg",
    "advertisement_title": "Đặt lịch hẹn ngay!",
    "advertisement_content": "Dịch vụ giúp việc nhà theo giờ của chúng tôi sẽ giúp bạn tiết kiệm thời gian và năng lượng",
    "start_date": "2023-01-01 00:00:00",
    "end_date": "2023-12-30 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2023-01-01 00:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2023-05-20 15:11:26",
    "is_delete": 0
  },
  {
    "advertisement_id": "ADV_g2pcl8a8l8rl0icr",
    "poster_path": "http://res.cloudinary.com/dru3umoml/image/upload/v1676542940/images/wlznrvqlndtah7vuhixt.jpg",
    "advertisement_title": "Giảm giá 50%",
    "advertisement_content": "Giảm giá 50% cho đơn hàng từ 200.000 VNĐ trở lên.",
    "start_date": "2022-10-01 00:00:00",
    "end_date": "2022-10-30 00:00:00",
    "create_user": "ADM_g2pcl8a8l8rl0icr",
    "create_date": "2022-10-01 00:00:00",
    "update_user": "ADM_g2pcl8a8l8rl0icr",
    "update_date": "2022-10-01 00:00:00",
    "is_delete": 1
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('advertisements', advertisements, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('advertisements', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
