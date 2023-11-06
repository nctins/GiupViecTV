import { ICON_CODE, ID_PREFIX, NOTIFICATION_MODULE, PAYMENT_METHOD, POST_STATE } from "../constants/db_constants";
import SOCKET_ACT from "../constants/socket_action";
import { CANCEL_CREDIT, POST_TIMEOUT_MILISEC } from "../constants/system_constants";
import USER_ROLE from "../constants/user_role";
import db from "../models";
import IDGenerator from "../utils/IDGenerator";
import Message from "../utils/Message";
import { pushNotification } from "../utils/UtilsNotifications";
import CustomerRatingService from "./cutomer_rating.service";
import HelperService from "./helper_account.service";
import HelperRatingService from "./helper_rating.service";
import NotificationService from "./notification.service";
const { Op, where } = require("sequelize");
const PostsModel = db.posts;
const PostDetailModel = db.post_detail;
const HelperModel = db.helper_account;
const CustomerModel = db.customer_account;
const ServiceModal = db.services;
const NotificationModel = db.notifications;
const BoxChatModel = db.box_chat;
const PostsService = {};

PostsService.getPosts = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await PostsModel.findAll({
        where: {
          is_delete: false,
          customer_id: {
            [Op.like]: filter.customer_id,
          },
          post_state: {
            [Op.in]: filter.post_state,
          },
        },
        order: [["date","DESC"]],
      });
      if (!posts || posts.length == 0) {
        resolve([]);
      }

      let result = posts.map(async (post) => {
        let helper_na = "";
        if (post.helper_id && post.helper_id.length > 0) {
          let helper = await HelperModel.findOne({
            where: {
              helper_id: post.helper_id,
            },
          });

          if (helper) {
            helper_na = helper.name;
          }
        }

        let post_details = await post.getPostDetails();
        post_details = await Promise.all(post_details);

        let services_name = post_details.map(async (post_detail) => {
          let service = await ServiceModal.findOne({
            where: {
              service_id: post_detail.service_id,
            },
          });
          return service.service_name;
        });
        services_name = await Promise.all(services_name);

        return {
          post_id: post.post_id,
          customer_id: post.customer_id,
          customer_name: post.customer_name,
          customer_phone: post.customer_phone,
          helper_id: post.helper_id,
          helper_na: helper_na,
          services_name: services_name,
          post_type: post.post_type,
          address: post.address,
          date: post.date,
          time: post.time,
          note: post.note,
          total: post.total,
          voucher_id: post.voucher_id,
          payment_method: post.payment_method,
          post_state: post.post_state,
          reason_cancel: post.reason_cancel,
        };
      });

      result = await Promise.all(result);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.getPostsByHelper = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await PostsModel.findAll({
        where: {
          is_delete: false,
          helper_id: filter.helper_id,
        },
        order: [["date","DESC"]],
      });
      if (!posts || posts.length == 0) {
        resolve([]);
      }

      let result = posts.map(async (post) => {
        let post_details = await post.getPostDetails();
        post_details = await Promise.all(post_details);

        let services_name = post_details.map(async (post_detail) => {
          let service = await ServiceModal.findOne({
            where: {
              service_id: post_detail.service_id,
            },
          });
          return service.service_name;
        });
        services_name = await Promise.all(services_name);

        return {
          post_id: post.post_id,
          customer_id: post.customer_id,
          customer_name: post.customer_name,
          customer_phone: post.customer_phone,
          helper_id: post.helper_id,
          services_name: services_name,
          post_type: post.post_type,
          address: post.address,
          date: post.date,
          time: post.time,
          note: post.note,
          total: post.total,
          voucher_id: post.voucher_id,
          coupon_price: post.coupon_price,
          payment_method: post.payment_method,
          post_state: post.post_state,
          reason_cancel: post.reason_cancel,
        };
      });

      result = await Promise.all(result);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.getPostsByHelperInSelectDate = (helper_id, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await PostsModel.findAll({
        where: {
          is_delete: false,
          helper_id: helper_id,
          date: date,
          post_state: {
            [Op.in]: [2,3],
          }
        },
        order: [["date","DESC"]],
      });
      if (!posts || posts.length == 0) {
        resolve([]);
      }
      let result = posts.map((post) => {
        return {
          post_id: post.post_id,
          helper_id: post.helper_id,
          post_type: post.post_type,
          address: post.address,
          date: post.date,
          time: post.time,
          post_state: post.post_state,
        };
      });

      result = await Promise.all(result);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.getPostsByHelperFilterDate = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await PostsModel.findAll({
        where: {
          is_delete: false,
          helper_id: filter.helper_id,
          date: {
            [Op.gte]: filter.startDate,
            [Op.lte]: filter.endDate,
          },
        },
        order: [["date","DESC"]],
      });
      if (!posts || posts.length == 0) {
        resolve([]);
      }

      let result = posts.map(async (post) => {
        let post_details = await post.getPostDetails();
        post_details = await Promise.all(post_details);

        let services_name = post_details.map(async (post_detail) => {
          let service = await ServiceModal.findOne({
            where: {
              service_id: post_detail.service_id,
            },
          });
          return service.service_name;
        });
        services_name = await Promise.all(services_name);

        return {
          post_id: post.post_id,
          customer_id: post.customer_id,
          customer_name: post.customer_name,
          customer_phone: post.customer_phone,
          helper_id: post.helper_id,
          services_name: services_name,
          post_type: post.post_type,
          address: post.address,
          date: post.date,
          time: post.time,
          note: post.note,
          total: post.total,
          voucher_id: post.voucher_id,
          coupon_price: post.coupon_price,
          payment_method: post.payment_method,
          post_state: post.post_state,
          reason_cancel: post.reason_cancel,
        };
      });

      result = await Promise.all(result);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.getPostById = (post_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await PostsModel.findOne({
        where: {
          post_id: post_id,
          is_delete: false,
        },
      });
      if (!post) {
        resolve({});
      }

      const post_details = await post.getPostDetails();
      const services = await Promise.all(
        post_details.map(async (ele, idx) => {
          const service = await ele.getService();
          return {
            service_name: service.service_name,
            total: ele.total,
          };
        })
      );

      const customer_rank = await HelperRatingService.getCustomerRank(post.customer_id);

      const helper_id = post.helper_id;
      let helper_info = {
        helper_id: "",
        name: "",
        phone: "",
      };
      let helper_rank = 0;
      if (helper_id) {
        helper_info = await HelperModel.findOne({
          where: { helper_id: helper_id },
        });
        helper_rank = await CustomerRatingService.getHelperRank(helper_id);
      }

      resolve({
        post_id: post.post_id,
        customer_id: post.customer_id,
        customer_name: post.customer_name,
        customer_phone: post.customer_phone,
        customer_rank: customer_rank,
        helper_id: helper_info.helper_id,
        helper_name: helper_info.name,
        helper_phone: helper_info.phone,
        helper_rank: helper_rank,
        post_type: post.post_type,
        address: post.address,
        date: post.date,
        time: post.time,
        end_time: post.end_time,
        note: post.note,
        total: post.total,
        total_estimate_time: post.total_estimate_time,
        coupon_price: post.coupon_price,
        voucher_id: post.voucher_id,
        payment_method: post.payment_method,
        post_state: post.post_state,
        services: services,
        reason_cancel: post.reason_cancel,
      });
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.createPost = async (post, post_details) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction();
    try {
      let new_post = await PostsModel.create(post,{transaction: t});
      if (!new_post) {
        reject(false);
        return;
      }
      for(const detail of post_details){
        let new_post_detail = await PostDetailModel.create(detail, {transaction: t});
        if(!new_post_detail){
          reject(false);
          return;
        }
      }
      // notification to helper
      const notification_id = IDGenerator(ID_PREFIX.NOTIFICATION);
      const msg = Message.orderMatch(new_post);
      const helper_id = new_post.helper_id;
      const current_date = new Date();

      const notification = {
        notification_id: notification_id,
        user_id: helper_id,
        icon_code: ICON_CODE.ORDER_MATCH,
        title: msg.title,
        content: msg.content,
        notification_module: NOTIFICATION_MODULE.POST,
        module_object_id: new_post.post_id,
        create_user: helper_id,
        update_user: helper_id,
        create_date: current_date,
        update_date: current_date
      }
      await NotificationModel.create(notification);
      _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: [helper_id]});
      await pushNotification(notification, [helper_id]);

      // create box chat if haven't
      // const box_chat_data = { customer_id: new_post.customer_id, helper_id: helper_id };
      // const box_chat = BoxChatModel.findOne({where: box_chat_data});
      // if(!box_chat){
      //   BoxChatModel.create({box_chat_id: IDGenerator(ID_PREFIX.BOX_CHAT), ...box_chat_data});
      // }
      
      t.commit();
      resolve(true);
    } catch (error) {
      t.rollback();
      reject(error);
    }
  });
};

PostsService.updatePost = async (post, post_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.sequelize.transaction(async (t) => {
        const { post_id, ...post_content } = post;
        await PostsModel.update(post_content, {
          where: {
            post_id: post_id,
          },
          transaction: t,
        });
        post_details.map(async (post_detail) => {
          const { post_id, service_id, ...content } = post_detail;
          await PostDetailModel.update(content, {
            where: {
              service_id: service_id,
              post_id: post_id,
            },
            transaction: t,
          });
        });
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.acceptPost = async (post_id, helper_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // find and update state
      const post = await PostsModel.findOne({ where: { post_id: post_id } });
      post.update(
        { helper_id: helper_id, post_state: POST_STATE.INCOMPLETE },
      );
      
      // create notification to customer
      const customer_id = post.customer_id; 
      const helper = await HelperModel.findOne({where: {helper_id: helper_id}});
      const msg = Message.orderAccept(post_id, helper.name);
      const current_date = new Date();
      const notification_id = IDGenerator(ID_PREFIX.NOTIFICATION);
      
      const notification = {
        notification_id: notification_id,
        user_id: customer_id,
        icon_code: ICON_CODE.ORDER_CANCEL,
        title: msg.title,
        content: msg.content,
        notification_module: NOTIFICATION_MODULE.POST,
        module_object_id: post_id,
        create_user: helper_id,
        update_user: helper_id,
        create_date: current_date,
        update_date: current_date
      }

      await NotificationModel.create(notification);
      _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: [customer_id]});
      await pushNotification(notification, [customer_id]);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
PostsService.cancelPost = async (post_info, reason_cancel) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await PostsModel.findOne({ where: post_info });
      if (!post) {
        resolve(false);
        return;
      }
      await post.update({
        post_state: POST_STATE.CANCEL,
        reason_cancel: reason_cancel,
      });
      // user cancel is customer && post is incomplete
      if (post.helper_id && post_info.customer_id) {
        // create notification to helper
        const customer_id = post_info.customer_id; 
        const customer = await CustomerModel.findOne({where: {customer_id: customer_id}});
        const msg = Message.orderCancel(post.post_id, customer.name, reason_cancel );
        const current_date = new Date();
        const notification_id = IDGenerator(ID_PREFIX.NOTIFICATION);
        const notification = {
          notification_id: notification_id,
          user_id: post.helper_id,
          icon_code: ICON_CODE.ORDER_CANCEL,
          title: msg.title,
          content: msg.content,
          notification_module: NOTIFICATION_MODULE.POST,
          module_object_id: post.post_id,
          create_user: customer_id,
          update_user: customer_id,
          create_date: current_date,
          update_date: current_date
        }
        await NotificationModel.create(notification);
        _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: [post.helper_id]});
        await pushNotification(notification, [post.helper_id]);
      }

      // user cancel is helper
      if( post_info.helper_id) {
        // create notification to customer
        const customer_id = post.customer_id; 
        const helper_id = post_info.helper_id;
        const helper = await HelperModel.findOne({where: {helper_id: helper_id}});
        const msg = Message.orderCancel(post.post_id, helper.name, reason_cancel );
        const current_date = new Date();
        const notification_id = IDGenerator(ID_PREFIX.NOTIFICATION);
        const notification = {
          notification_id: notification_id,
          user_id: customer_id,
          icon_code: ICON_CODE.ORDER_CANCEL,
          title: msg.title,
          content: msg.content,
          notification_module: NOTIFICATION_MODULE.POST,
          module_object_id: post.post_id,
          create_user: helper_id,
          update_user: helper_id,
          create_date: current_date,
          update_date: current_date
        }
        await NotificationModel.create(notification);
        _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: [customer_id]});
        pushNotification(notification, [customer_id]);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
PostsService.completePost = async (post_id, user_role) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await PostsModel.findOne({
        where: { post_id: post_id },
      });
      if (!post) {
        resolve(null);
        return;
      }
      // console.log(post)

      const current_date = new Date();
      const customer_id = post.customer_id;
      const helper_id = post.helper_id;

      // notification to customer
      const customer_msg = user_role == USER_ROLE.CUSTOMER ? 
        Message.orderComplete(post.post_id, user_role) // customer complete post
        : Message.orderCompleteByHelper(post.post_id); // helper complete post

      const customer_notification = {
        notification_id: IDGenerator(ID_PREFIX.NOTIFICATION),
        user_id: customer_id,
        icon_code: ICON_CODE.ORDER_COMPLETE,
        title: customer_msg.title,
        content: customer_msg.content,
        notification_module: NOTIFICATION_MODULE.POST, 
        module_object_id: post.post_id,
        create_user: helper_id,
        update_user: helper_id,
        create_date: current_date,
        update_date: current_date
      }
      
      //  notification to helper
      const helper_msg = user_role == USER_ROLE.CUSTOMER ? 
        Message.orderCompleteByCustomer(post.post_id)   // customer complete post
        : Message.orderComplete(post.post_id, user_role);// helper complete post

      const helper_notification = {
        notification_id: IDGenerator(ID_PREFIX.NOTIFICATION),
        user_id: helper_id,
        icon_code: ICON_CODE.ORDER_COMPLETE,
        title: helper_msg.title,
        content: helper_msg.content,
        notification_module: NOTIFICATION_MODULE.POST,
        module_object_id: post.post_id,
        create_user: customer_id,
        update_user: customer_id,
        create_date: current_date,
        update_date: current_date
      }

      const notifications = [helper_notification, customer_notification];

      await NotificationModel.bulkCreate(notifications);
      _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: [customer_id, helper_id]});
      await pushNotification(helper_notification, [helper_id]);
      await pushNotification(customer_notification, [customer_id]);

      await post.update({ post_state: POST_STATE.COMPLETE });
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.deletePost = async (where_condision) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await PostsModel.findOne({ where: where_condision });
      if (!post) {
        resolve(false);
      }
      post.update({ is_delete: true });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

PostsService.getPostIncompleteInDate = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await PostsModel.findAll({
        where: {
          is_delete: false,
          date: date,
          post_state: {
            [Op.in]: [3],
          }
        },
        order: [["date","DESC"]],
      });
      if (!posts || posts.length == 0) {
        resolve([]);
      }
      let result = posts.map((post) => {
        return {
          post_id: post.post_id,
          helper_id: post.helper_id,
          post_type: post.post_type,
          address: post.address,
          date: post.date,
          time: post.time,
          post_state: post.post_state,
        };
      });

      result = await Promise.all(result);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// create notification to remind post has end_time < 23:59 current date
PostsService.remindOverDuePost = async () => {
  // console.log("remindOverDuePost");
  const current_date = new Date();
  current_date.setHours(23, 59, 0, 0);
  const over_due_posts = await PostsModel.findAll({
    where: {
      post_state: POST_STATE.INCOMPLETE,
      end_time: {
        [Op.lte]: current_date,
      },
      is_delete: false,
    }
  });

  let notifications = [];
  let notification_users = [];
  for (let i = 0; i < over_due_posts.length; i++) {
    const over_due_post = over_due_posts[i];
  // over_due_posts.forEach(async (over_due_post) => {
    const timeout = current_date.valueOf() - over_due_post.end_time.valueOf();
    const customer_id = over_due_post.customer_id;
    const helper_id = over_due_post.helper_id;
    const init_notification = {
      notification_id: "",
      user_id: "",
      icon_code: ICON_CODE.ORDER,
      title: "",
      content: "",
      notification_module: NOTIFICATION_MODULE.POST,
      module_object_id: over_due_post.post_id,
      create_user: "",
      update_user: "",
      create_date: new Date(),
      update_date: new Date()
    }
    let customer_notification = {
      ...init_notification,
      notification_id: IDGenerator(ID_PREFIX.NOTIFICATION),
      user_id: customer_id,
      create_user: customer_id,
      update_user: customer_id,
    };
    let helper_notification = {
      ...init_notification,
      notification_id: IDGenerator(ID_PREFIX.NOTIFICATION),
      user_id: helper_id,
      create_user: helper_id,
      update_user: helper_id,
    };
    let customer_msg = {title: "", content: ""};
    let helper_msg = {title: "", content: ""};
    let customer_icon_code = ICON_CODE.ORDER;
    let helper_icon_code = ICON_CODE.ORDER;
    
    // create notification if timeout < POST_TIMEOUT_MILISEC
    if (timeout < POST_TIMEOUT_MILISEC) {
      customer_msg = Message.postOverdueToCustomer(over_due_post);
      helper_msg = Message.postOverdueToHelper(over_due_post);
    } else { // change state to cancel and create notification if >= POST_TIMEOUT_MILISEC
      customer_msg = Message.cancelOverduePostToCustomer(over_due_post);
      helper_msg = Message.cancelOverduePostToHelper(over_due_post);
      customer_icon_code = ICON_CODE.ORDER_CANCEL;
      helper_icon_code = ICON_CODE.ORDER_CANCEL;
      over_due_post.update({
        post_state: POST_STATE.CANCEL,
        reason_cancel: "hủy do lịch hẹn quá hạn",
      });
      // minus credit of helper if payment method is COD
      if(over_due_post.payment_method === PAYMENT_METHOD.COD) {
        // console.log("execute minus credit");
        await HelperService.addCredit(helper_id, CANCEL_CREDIT);
      }
    }

    customer_notification = { 
      ...customer_notification, 
      ...customer_msg, 
      icon_code: customer_icon_code 
    };
    helper_notification = { 
      ...helper_notification, 
      ...helper_msg, 
      icon_code: helper_icon_code 
    };
    // console.log(customer_notification, helper_notification);

    notifications.push(helper_notification);
    notifications.push(customer_notification);
    notification_users.push(customer_id);
    notification_users.push(helper_id);
  }
  // })
  // console.log(notifications);
  // create notification
  // console.log(notifications, notification_users);
  await NotificationModel.bulkCreate(notifications);
  _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: notification_users});
  for (let index = 0; index < notifications.length; index++) {
    const notification = notifications[index];
    await pushNotification(notification, [notification.user_id]);
  }
}

export default PostsService;
