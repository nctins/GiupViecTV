"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("post_detail", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      post_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      service_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      value: {
        type: Sequelize.INTEGER(9),
        comment: "lưu giá trị của nhập của người dùng ( nếu input format = radio lưu giá trị 1 vì 1 * đơn giá bằng chính nó)",
      },
      service_seq_nb: {
        type: Sequelize.INTEGER(1),
      },
      multiple_field_value: {
        type: Sequelize.INTEGER(3),
        comment: "lưu bội số của dịch vụ trong đơn hàng vd số lượng phòng, số lượng bộ bàn ghế,...",
        defaultValue: 1,
      },
    });

    await queryInterface.addConstraint('post_detail',{
      type: 'UNIQUE',
      fields: ['post_id', 'service_id'],
      name: 'post_detail_UNQ_post_id_and_service_id',
    });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('messages', 'post_detail_UNQ_post_id_and_service_id');
    await queryInterface.dropTable("post_detail");
  },
};
