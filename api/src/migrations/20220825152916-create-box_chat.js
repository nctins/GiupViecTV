"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("box_chat", {
      box_chat_id: {
        type: Sequelize.CHAR(22),
        comment: "tạo theo hàm uniqid(\"BOX_\")",
        primaryKey: true,
      },
      customer_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
        unique: "customerId_helperId"
      },
      helper_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
        unique: "customerId_helperId"
      },
    });

    await queryInterface.addConstraint('box_chat',{
      type: 'UNIQUE',
      fields: ['helper_id', 'customer_id'],
      name: 'box_chat_UNQ_customerID_and_helperID',
    })
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('box_chat', 'box_chat_UNQ_customerID_and_helperID');
    await queryInterface.dropTable("box_chat");
  },
};
