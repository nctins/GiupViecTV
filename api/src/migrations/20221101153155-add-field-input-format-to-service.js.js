'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    await queryInterface.addColumn("services", "input_format", {
      type: Sequelize.TINYINT(1),
      comment: "0: radio, 1: textbox",
    })

    // update record in table
    const services = await queryInterface.sequelize.query(
      "SELECT `service_id`, COUNT(`seq_nb`) AS num_of_seq FROM `service_detail` GROUP BY `service_id`", 
      {type: Sequelize.QueryTypes.SELECT});

    const service_textbox = services.filter(services => services.num_of_seq == 1);
    const service_radio = services.filter(services => services.num_of_seq > 1);
    service_radio.forEach( async element => {
      await queryInterface.bulkUpdate("services", {
        input_format: 0,
      }, {
        service_id: element.service_id,
      })
    });

    service_textbox.forEach( async element => {
      await queryInterface.bulkUpdate("services", {
        input_format: 1,
      }, {
        service_id: element.service_id,
      })
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("services", "input_format");
  }
};
