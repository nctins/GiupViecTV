"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("service_detail", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      service_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      seq_nb: {
        type: Sequelize.INTEGER(1),
        // primaryKey: true,
        comment: "number of record for same key",
      },
      dram: {
        type: Sequelize.STRING(30),
        comment: "cách thức đo lường vd: diện tích, số lượng,…",
      },
      dram_unit: {
        type: Sequelize.STRING(10),
        comment: "đơn vị đo lường vd: cái, m2,… null nếu nhâp kiểu radio",
      },
      unit_price_title: {
        type: Sequelize.STRING(20),
        comment: "đơn vị đơn giá vd: VNĐ/cái,… null nếu nhập kiểu radio",
      },
      string_value: {
        type: Sequelize.STRING(20),
        comment: "giá trị của radio button vd: ít, nhiều,… null nếu nhập kiểu textbox"
      },
      multiple_field_title: {
        type: Sequelize.STRING(30),
        comment: "tiêu đề bội số của dịch vụ. vd: \"số lượng phòng\", \"số bộ bàn ghế\",...",
        defaultValue: null,
      },
      unit_price: {
        type: Sequelize.INTEGER(9),
        comment: "đơn giá của dịch vụ, là giá trị của radio button"
      },
    });

    await queryInterface.addConstraint('service_detail',{
      type: 'UNIQUE',
      fields: ['service_id', 'seq_nb'],
      name: 'messages_UNQ_service_id_and_seq_nb',
    });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('service_detail','messages_UNQ_service_id_and_seq_nb');
    await queryInterface.dropTable("service_detail");
  },
};
