'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // update helper table
    await queryInterface.addColumn("helper_account", "credits", {
      type: Sequelize.INTEGER(3),
      comment: "điểm tin cậy của ngv",
    })

    // add working schedule table 
    await queryInterface.createTable("working_schedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      helper_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
        comment: "tạo theo hàm uniqid(\"HEL_\")",
      },
      day: {
        type: Sequelize.INTEGER(1),
        // primaryKey: true,
        comment: "0->6: thứ 2 -> chủ nhật",
      },
      is_working: {
        type: Sequelize.BOOLEAN,
      },
      time_from_1: {
        type: Sequelize.TIME,
        comment: "ca làm việc 1"
      },
      time_to_1: {
        type: Sequelize.TIME,
        comment: "ca làm việc 1"
      },
      time_from_2: {
        type: Sequelize.TIME,
        comment: "ca làm việc 2"
      },
      time_to_2: {
        type: Sequelize.TIME,
        comment: "ca làm việc 2"
      },
      time_from_3: {
        type: Sequelize.TIME,
        comment: "ca làm việc 3"
      },
      time_to_3: {
        type: Sequelize.TIME,
        comment: "ca làm việc 3"
      },
    });

    await queryInterface.addConstraint('working_schedule',{
      type: 'UNIQUE',
      fields: ['helper_id', 'day'],
      name: 'working_schedule_UNQ_helper_id_and_day',
    });


    // add rest schedule table
    await queryInterface.createTable("rest_schedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      helper_id: {
        type: Sequelize.CHAR(22),
        // primaryKey: true,
        comment: "tạo theo hàm uniqid(\"HEL_\")",
      },
      date: {
        type: Sequelize.DATE,
        // primaryKey: true,
        comment: "ngày nghỉ"
      },
      off_time_1: {
        type: Sequelize.BOOLEAN,
        comment: "nghỉ ca 1"
      },
      off_time_2: {
        type: Sequelize.BOOLEAN,
        comment: "nghỉ ca 1"
      },
      off_time_3: {
        type: Sequelize.BOOLEAN,
        comment: "nghỉ ca 1"
      },
    })

    await queryInterface.addConstraint('rest_schedule',{
      type: 'UNIQUE',
      fields: ['helper_id', 'date'],
      name: 'rest_schedule_UNQ_helper_id_and_date',
    });

    // add constraint
    await queryInterface.addConstraint('working_schedule',{
      type: 'FOREIGN KEY',
      fields: ['helper_id'],
      name: 'working_schedule_fk_helper_id',
      references: { table: 'helper_account', fields: ['helper_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })

    await queryInterface.addConstraint('rest_schedule',{
      type: 'FOREIGN KEY',
      fields: ['helper_id'],
      name: 'rest_schedule_fk_helper_id',
      references: { table: 'helper_account', fields: ['helper_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })

  },

  async down(queryInterface, Sequelize) {
    // remove working_schedule unique constraint
    // await queryInterface.removeConstraint('working_schedule', 'working_schedule_UNQ_helper_id_and_day');
    
    // remove rest_schedule unique constraint
    // await queryInterface.removeConstraint('rest_schedule', 'rest_schedule_UNQ_helper_id_and_date');

    // remove working_schedule foreign key constraint
    await queryInterface.removeConstraint('working_schedule', 'working_schedule_fk_helper_id');

    // remove rest_schedule foreign key constraint
    await queryInterface.removeConstraint('rest_schedule', 'rest_schedule_fk_helper_id');


    await queryInterface.removeColumn("helper_account", "credits");
    await queryInterface.dropTable("working_schedule");
    await queryInterface.dropTable("rest_schedule");
  }
};
