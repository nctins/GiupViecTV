'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // add estimate time on service
    await queryInterface.addColumn("service_detail", "estimate_time", {
      type: Sequelize.INTEGER(3),
      comment: "thời gian ước lượng hoàn thành tính theo phút/đơn vị đo lường",
    });

    // add estimate time on post
    await queryInterface.addColumn("posts", "total_estimate_time",{
      type: Sequelize.INTEGER(3),
      comment: "tổng thời gian ước lượng hoàn thành cộng việc trong lịch hẹn",
    })
    
    await queryInterface.addColumn("posts", "end_time",{
      type: Sequelize.DATE,
      comment: "thời gian dự kiến hoàn thành lịch hẹn",
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("service_detail", "estimate_time");
    await queryInterface.removeColumn("posts", "total_estimate_time");
    await queryInterface.removeColumn("posts", "end_time");
  }
};
