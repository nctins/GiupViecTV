'use strict';
const helper_service_work = [
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_6pvdf4lgz8lo28"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_6pvdf4lgz8lo28"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_6pvdf4lgz8lo28"
  },
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_g2pcl1h8l8sxxnhw"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_g2pcl1h8l8sxxnhw"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_g2pcl1h8l8sxxnhw"
  },
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_g2pcl2i8l8sxyey5"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_g2pcl2i8l8sxyey5"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_g2pcl2i8l8sxyey5"
  },
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_g2pcl714l8sxxdfr"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_g2pcl714l8sxxdfr"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_g2pcl714l8sxxdfr"
  },
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_g2pcl8pkl8sxyv85"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_g2pcl8pkl8sxyv85"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_g2pcl8pkl8sxyv85"
  },
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_g2pcl940l8sxyo3l"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_g2pcl940l8sxyo3l"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_g2pcl940l8sxyo3l"
  },
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_g2pcla8gl8sxwykf"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_g2pcla8gl8sxwykf"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_g2pcla8gl8sxwykf"
  },
  {
    "helper_id": "HEL_g2pcl39gl8rm4dit",
    "service_id": "SER_g2pclaq0l8sxxwh5"
  },
  {
    "helper_id": "HEL_g2pcl39wl8rm4x5f",
    "service_id": "SER_g2pclaq0l8sxxwh5"
  },
  {
    "helper_id": "HEL_g2pcl8acl8rm4lkx",
    "service_id": "SER_g2pclaq0l8sxxwh5"
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkInsert('helper_service_work', helper_service_work, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  },

  async down (queryInterface, Sequelize) {
	// disable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true});

    await queryInterface.bulkDelete('helper_service_work', null, {});

    // enable constraint check
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true});
  }
};