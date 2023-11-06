'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});
    await queryInterface.bulkInsert('service_detail', [
      {
        service_id: "SER_g2pclaq0l8sxxwh5",
        seq_nb: 0,
        dram: "Diện tích",
        dram_unit: "m2",
        unit_price_title: "VNĐ/m2",
        string_value: null,
        multiple_field_title: "Số lượng phòng",
        unit_price: 27000,
        estimate_time: 7
      },
      {
        service_id: "SER_g2pcla8gl8sxwykf",
        seq_nb: 0,
        dram: "Diện tích",
        dram_unit: "m2",
        unit_price_title: "VNĐ/m2",
        string_value: null,
        multiple_field_title: "Số lượng phòng",
        unit_price: 25000,
        estimate_time: 5
      },
      {
        service_id: "SER_g2pcl940l8sxyo3l",
        seq_nb: 2,
        dram: "Số lượng",
        dram_unit: null,
        unit_price_title: null,
        string_value: "nhiều",
        multiple_field_title: null,
        unit_price: 20000,
        estimate_time: 20
      },
      {
        service_id: "SER_g2pcl940l8sxyo3l",
        seq_nb: 1,
        dram: "Số lượng",
        dram_unit: null,
        unit_price_title: null,
        string_value: "trung bình",
        multiple_field_title: null,
        unit_price: 25000,
        estimate_time: 15
      },
      {
        service_id: "SER_g2pcl940l8sxyo3l",
        seq_nb: 0,
        dram: "Số lượng",
        dram_unit: null,
        unit_price_title: null,
        string_value: "ít",
        multiple_field_title: null,
        unit_price: 15000,
        estimate_time: 10
      },
      {
        service_id: "SER_g2pcl8pkl8sxyv85",
        seq_nb: 2,
        dram: "loại sân",
        dram_unit: null,
        unit_price_title: null,
        string_value: "nền gạch nung",
        multiple_field_title: null,
        unit_price: 25000,
        estimate_time: 15
      },
      {
        service_id: "SER_g2pcl8pkl8sxyv85",
        seq_nb: 1,
        dram: "loại sân",
        dram_unit: null,
        unit_price_title: null,
        string_value: "nền bê tông",
        multiple_field_title: null,
        unit_price: 10000,
        estimate_time: 10
      },
      {
        service_id: "SER_g2pcl8pkl8sxyv85",
        seq_nb: 0,
        dram: "loại sân",
        dram_unit: null,
        unit_price_title: null,
        string_value: "nền cỏ",
        multiple_field_title: null,
        unit_price: 50000,
        estimate_time: 30
      },
      {
        service_id: "SER_g2pcl714l8sxxdfr",
        seq_nb: 0,
        dram: "Diện tích",
        dram_unit: "m2",
        unit_price_title: "VNĐ/m2",
        string_value: null,
        multiple_field_title: "Số lượng phòng",
        unit_price: 30000,
        estimate_time: 5
      },
      {
        service_id: "SER_g2pcl2i8l8sxyey5",
        seq_nb: 0,
        dram: "Số lượng",
        dram_unit: "cái",
        unit_price_title: "VNĐ/cái",
        string_value: null,
        multiple_field_title: "Số bộ bàn ghế",
        unit_price: 5000,
        estimate_time: 10
      },
      {
        service_id: "SER_g2pcl1h8l8sxxnhw",
        seq_nb: 0,
        dram: "Diện tích",
        dram_unit: "m2",
        unit_price_title: "VNĐ/m2",
        string_value: null,
        multiple_field_title: "Số lượng phòng",
        unit_price: 30000,
        estimate_time: 5
      },
      {
        service_id: "SER_6pvdf4lgz8lo28",
        seq_nb: 0,
        dram: "Thời gian",
        dram_unit: "giờ",
        unit_price_title: "VNĐ/giờ",
        string_value: null,
        multiple_field_title: "",
        unit_price: 60000,
        estimate_time: 60
      }
    ], {});
    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
    // disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('service_detail', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};
