"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {

    // add box chat contraint
    await queryInterface.addConstraint('box_chat',{
      type: 'FOREIGN KEY',
      fields: ['customer_id'],
      name: 'box_chat_fk_customer_id',
      references: { table: 'customer_account', field: 'customer_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    await queryInterface.addConstraint('box_chat',{
      type: 'FOREIGN KEY',
      fields: ['helper_id'],
      name: 'box_chat_fk_helper_id',
      references: { table: 'helper_account', field: 'helper_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })

    // add message constraint
    // await queryInterface.addConstraint('messages',{
    //   type: 'FOREIGN KEY',
    //   fields: ['from_user_id'],
    //   name: 'message_fk_from_customer_id',
    //   references: { table: 'customer_account', field: 'customer_id' },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })
    // await queryInterface.addConstraint('messages',{
    //   type: 'FOREIGN KEY',
    //   fields: ['from_user_id'],
    //   name: 'message_fk_from_helper_id',
    //   references: { table: 'helper_account', field: 'helper_id' },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })
    await queryInterface.addConstraint('messages',{
      type: 'FOREIGN KEY',
      fields: ['box_chat_id'],
      name: 'message_fk_box_chat_id',
      references: { table: 'box_chat', field: 'box_chat_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })

    // add service_detail constraint
    await queryInterface.addConstraint('service_detail',{
      type: 'FOREIGN KEY',
      fields: ['service_id'],
      name: 'service_detail_fk_service_id',
      references: { table: 'services', field: 'service_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    
    // add posts constraint
    await queryInterface.addConstraint('posts',{
      type: 'FOREIGN KEY',
      fields: ['helper_id'],
      name: 'post_fk_helper_id',
      references: { table: 'helper_account', field: 'helper_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    await queryInterface.addConstraint('posts',{
      type: 'FOREIGN KEY',
      fields: ['customer_id'],
      name: 'post_fk_customer_id',
      references: { table: 'customer_account', field: 'customer_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    await queryInterface.addConstraint('posts',{
      type: 'FOREIGN KEY',
      fields: ['voucher_id'],
      name: 'post_fk_voucher_id',
      references: { table: 'vouchers', field: 'voucher_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    
    // add post_detail constraint
    await queryInterface.addConstraint('post_detail',{
      type: 'FOREIGN KEY',
      fields: ['post_id'],
      name: 'post_detail_fk_post_id',
      references: { table: 'posts', field: 'post_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    await queryInterface.addConstraint('post_detail',{
      type: 'FOREIGN KEY',
      fields: ['service_id'],
      name: 'post_detail_fk_service_id',
      references: { table: 'services', field: 'service_id' },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    // await queryInterface.addConstraint('post_detail',{
    //   type: 'FOREIGN KEY',
    //   fields: ['service_id'],
    //   name: 'post_detail_fk_service_id',
    //   references: { table: 'services', field: 'service_id' },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })
    // await queryInterface.addConstraint('post_detail',{
    //   type: 'FOREIGN KEY',
    //   fields: ['service_id','service_seq_nb'],
    //   name: 'post_detail_fk_service_id_and_service_seq_nb',
    //   references: { table: 'service_detail', fields: ['service_id', 'seq_nb'] },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })
    
    // add customer rating
    await queryInterface.addConstraint('customer_rating',{
      type: 'FOREIGN KEY',
      fields: ['customer_id'],
      name: 'customer_rating_fk_customer_id',
      references: { table: 'customer_account', fields: ['customer_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    // await queryInterface.addConstraint('customer_rating',{
    //   type: 'FOREIGN KEY',
    //   fields: ['post_id'],
    //   name: 'customer_rating_fk_post_id',
    //   references: { table: 'posts', fields: ['post_id'] },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })
    await queryInterface.addConstraint('customer_rating',{
      type: 'FOREIGN KEY',
      fields: ['target_id'],
      name: 'customer_rating_fk_target_id',
      references: { table: 'helper_account', fields: ['helper_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })

    // add helper rating
    await queryInterface.addConstraint('helper_rating',{
      type: 'FOREIGN KEY',
      fields: ['target_id'],
      name: 'helper_rating_fk_target_id',
      references: { table: 'customer_account', fields: ['customer_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    // await queryInterface.addConstraint('helper_rating',{
    //   type: 'FOREIGN KEY',
    //   fields: ['post_id'],
    //   name: 'helper_rating_fk_post_id',
    //   references: { table: 'posts', fields: ['post_id'] },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })
    await queryInterface.addConstraint('helper_rating',{
      type: 'FOREIGN KEY',
      fields: ['helper_id'],
      name: 'helper_rating_fk_helper_id',
      references: { table: 'helper_account', fields: ['helper_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    
    // add customer_address constraint
    await queryInterface.addConstraint('customer_address',{
      type: 'FOREIGN KEY',
      fields: ['customer_id'],
      name: 'customer_address_fk_customer_id',
      references: { table: 'customer_account', fields: ['customer_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    
    // add customer_voucher
    await queryInterface.addConstraint('customer_voucher',{
      type: 'FOREIGN KEY',
      fields: ['customer_id'],
      name: 'customer_voucher_fk_customer_id',
      references: { table: 'customer_account', fields: ['customer_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    await queryInterface.addConstraint('customer_voucher',{
      type: 'FOREIGN KEY',
      fields: ['voucher_id'],
      name: 'customer_voucher_fk_voucher_id',
      references: { table: 'vouchers', fields: ['voucher_id'] },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
    
    // add notification constraint
    // await queryInterface.addConstraint('notifications',{
    //   type: 'FOREIGN KEY',
    //   fields: ['user_id'],
    //   name: 'notification_fk_customer',
    //   references: { table: 'customer_account', fields: ['customer_id'] },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })
    // await queryInterface.addConstraint('notifications',{
    //   type: 'FOREIGN KEY',
    //   fields: ['user_id'],
    //   name: 'notification_fk_helper',
    //   references: { table: 'helper_account', fields: ['helper_id'] },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // })


  },
  async down(queryInterface, Sequelize) {
    // remove box chat constraint
    await queryInterface.removeConstraint('box_chat', 'box_chat_fk_customer_id');
    await queryInterface.removeConstraint('box_chat', 'box_chat_fk_helper_id');
    
    // remove message constraint
    // await queryInterface.removeConstraint('messages', 'message_fk_from_customer_id');
    // await queryInterface.removeConstraint('messages', 'message_fk_from_helper_id');
    await queryInterface.removeConstraint('messages', 'message_fk_box_chat_id');
    
    // remove service_detail constraint
    await queryInterface.removeConstraint('service_detail', 'service_detail_fk_service_id');
    
    // remove post constraint
    await queryInterface.removeConstraint('posts', 'post_fk_helper_id');
    await queryInterface.removeConstraint('posts', 'post_fk_customer_id');
    await queryInterface.removeConstraint('posts', 'post_fk_voucher_id');
    
    // remove post_detail constraint
    await queryInterface.removeConstraint('post_detail', 'post_detail_fk_post_id');
    await queryInterface.removeConstraint('post_detail', 'post_detail_fk_service_id');
    // await queryInterface.removeConstraint('post_detail', 'post_detail_fk_service_id');
    // await queryInterface.removeConstraint('post_detail', 'post_detail_fk_service_id_and_service_seq_nb');

    // remove customer rating
    await queryInterface.removeConstraint('customer_rating', 'customer_rating_fk_customer_id');
    // await queryInterface.removeConstraint('customer_rating', 'customer_rating_fk_post_id');
    await queryInterface.removeConstraint('customer_rating', 'customer_rating_fk_target_id');

    // remove helper rating
    await queryInterface.removeConstraint('helper_rating', 'helper_rating_fk_target_id');
    // await queryInterface.removeConstraint('helper_rating', 'helper_rating_fk_post_id');
    await queryInterface.removeConstraint('helper_rating', 'helper_rating_fk_helper_id');
    
    // remove customer_address constraint
    await queryInterface.removeConstraint('customer_address', 'customer_address_fk_customer_id');

    // remove customer_voucher constraint
    await queryInterface.removeConstraint('customer_voucher', 'customer_voucher_fk_customer_id');
    await queryInterface.removeConstraint('customer_voucher', 'customer_voucher_fk_voucher_id');

    // remove notification constraint
    // await queryInterface.removeConstraint('notifications', 'notification_fk_customer');
    // await queryInterface.removeConstraint('notifications', 'notification_fk_helper');

  },
};
