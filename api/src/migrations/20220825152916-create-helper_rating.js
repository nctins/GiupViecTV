"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("helper_rating", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      helper_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
      },
      target_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
        comment: "người được đánh giá"
      },
      rank: {
        type: Sequelize.TINYINT(1),
        comment: "1 <= rank <= 5",
      },
      date_time: {
        type: Sequelize.DATE,
      },
      content: {
        type: Sequelize.TEXT,
      },
    });

    await queryInterface.addConstraint('helper_rating',{
      type: 'UNIQUE',
      fields: ['post_id', 'helper_id', 'target_id'],
      name: 'customer_rating_UNQ_postID_and_helperID_and_targetID',
    });

  },
  async down(queryInterface, Sequelize) {
     // await queryInterface.removeConstraint('helper_rating', 'customer_rating_UNQ_postID_and_helperID_and_targetID');
    await queryInterface.dropTable("helper_rating");
  },
};
