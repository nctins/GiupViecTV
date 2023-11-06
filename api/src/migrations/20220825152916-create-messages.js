"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("messages", {
      message_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      box_chat_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      from_user_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
        comment: "id của người gửi",
      },
      date_time: {
        type: Sequelize.DATE,
        // primaryKey: true,
      },
      content: {
        type: Sequelize.TEXT,
      },
      is_view: {
        type: Sequelize.BOOLEAN,
      },
      create_user: {
        type: Sequelize.CHAR(22),
      },
      create_date: {
        type: Sequelize.DATE,
      },
      update_user: {
        type: Sequelize.CHAR(22),
      },
      update_date: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('messages',{
      type: 'UNIQUE',
      fields: ['date_time', 'box_chat_id', 'from_user_id'],
      name: 'messages_UNQ_time_and_boxchat_and_user',
    });

  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('messages', 'messages_UNQ_time_and_boxchat_and_user');
    await queryInterface.dropTable("messages");
  },
};
