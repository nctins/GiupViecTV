'use strict';

const services = 

module.exports = {
  async up (queryInterface, Sequelize) {
     // disable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
     
     await queryInterface.bulkInsert('services', [
       {
         service_id: "SER_6pvdf4lgz8lo28",
         service_name: "Giúp việc theo giờ",
         service_description: "Dịch vụ bao gồm dọn dẹp phòng, giặt là, ủi đồ, chăm sóc vật nuôi, làm bếp, mua sắm, đưa đón con cái và nhiều công việc khác.",
         service_type: 0,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2023-04-27 14:45:27",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2023-04-27 14:45:27",
         is_active: 1,
         is_delete: 0,
         input_format: 1
       },
       {
         service_id: "SER_g2pcl1h8l8sxxnhw",
         service_name: "Dọn phòng ngủ",
         service_description: "Dịch vụ dọn phòng khách bao gồm lau dọn, quét màn nhện phòng ngủ.",
         service_type: 0,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2022-01-01 00:00:00",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2023-04-24 14:19:37",
         is_active: 1,
         is_delete: 0,
         input_format: 1
       },
       {
         service_id: "SER_g2pcl714l8sxxdfr",
         service_name: "Dọn phòng bếp",
         service_description: "Dịch vụ dọn phòng khách bao gồm lau dọn, quét màn nhện phòng bếp và vệ sinh bếp.",
         service_type: 0,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2022-01-01 00:00:00",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2023-04-24 14:19:11",
         is_active: 1,
         is_delete: 0,
         input_format: 1
       },
       {
         service_id: "SER_g2pcla8gl8sxwykf",
         service_name: "Dọn phòng khách",
         service_description: "Dịch vụ dọn phòng khách bao gồm lau dọn, quét màn nhện phòng khách.",
         service_type: 0,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2022-01-01 00:00:00",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2023-04-24 14:19:26",
         is_active: 1,
         is_delete: 0,
         input_format: 1
       },
       {
         service_id: "SER_g2pclaq0l8sxxwh5",
         service_name: "Dọn phòng vệ sinh",
         service_description: "Dịch vụ dọn phòng khách bao gồm lau dọn phòng vệ sinh, vệ sinh bồn cầu, lavabo, vòi nước.",
         service_type: 0,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2022-01-01 00:00:00",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2023-04-24 14:19:48",
         is_active: 1,
         is_delete: 0,
         input_format: 1
       },
       {
         service_id: "SER_g2pcl2i8l8sxyey5",
         service_name: "Vệ sinh bàn ghế",
         service_description: "Tùy vào từng loại ghế thời gian vệ sinh có thể lâu hơn dự tính",
         service_type: 1,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2022-01-01 00:00:00",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2023-04-24 14:23:38",
         is_active: 1,
         is_delete: 0,
         input_format: 1
       },
       {
         service_id: "SER_g2pcl8pkl8sxyv85",
         service_name: "Dọn sân vườn",
         service_description: "dịch vụ bao gồm cắt thấp cỏ, quét lá rụng, dọn cỏ mọc lệnh ở sân bê tông, nền gạch,...",
         service_type: 1,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2022-01-01 00:00:00",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2022-01-01 00:00:00",
         is_active: 1,
         is_delete: 0,
         input_format: 0
       },
       {
         service_id: "SER_g2pcl940l8sxyo3l",
         service_name: "Rửa chén",
         service_description: null,
         service_type: 1,
         create_user: "ADM_g2pcl8a8l8rl0icr",
         create_date: "2022-01-01 00:00:00",
         update_user: "ADM_g2pcl8a8l8rl0icr",
         update_date: "2022-01-01 00:00:00",
         is_active: 1,
         is_delete: 0,
         input_format: 0
       }
     ], {});

     // enable constraint check
     await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    await queryInterface.bulkDelete('services', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  
  }
};
