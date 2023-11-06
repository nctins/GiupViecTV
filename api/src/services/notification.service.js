import { ID_PREFIX } from "../constants/db_constants";
import db from "../models";
import IDGenerator from "../utils/IDGenerator";
import SOCKET_ACT from "../constants/socket_action";
import { pushNotification } from "../utils/UtilsNotifications";

const NotificationModel = db.notifications;

const NotificationService = {};

NotificationService.getNotification = async (where_condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notifications = await NotificationModel.findAll({
        where: where_condition,
        order: [["create_date", "DESC"]],
      });
      if (!notifications) {
        resolve([]);
      }
      resolve(notifications);
    } catch (error) {
      reject(error);
    }
  });
};

// create notification for multi user
NotificationService.createNotifications = async (user_ids = [], data) => {
  return new Promise(async (resolve, reject) => {
    try {
      for (const user_id of user_ids) {
        const notification_id = IDGenerator(ID_PREFIX.NOTIFICATION);
        await NotificationModel.create({ ...data, notification_id, user_id });
      }
      _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: user_ids});
      await pushNotification(data, user_ids);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

// create notification for specify user
NotificationService.createNotification = async (user_id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notification_id = IDGenerator(ID_PREFIX.NOTIFICATION);
      await NotificationModel.create({ ...data, notification_id, user_id });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

NotificationService.updateNotification = async (update_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {notification_id, ...data} = update_data;
      const result = await NotificationModel.update(data, {where: {notification_id: notification_id}});
      if (!result) {
        resolve(false);
        return;
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}

NotificationService.setViewAll = async (where_condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      await NotificationModel.update({is_view: true}, {where: where_condition});
      resolve(true);
    } catch (error) {
      reject(error)
    }
  })
}

NotificationService.countUnread = async (where_condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      const couter = await NotificationModel.findAndCountAll({where:{...where_condition, is_view: false}});
      resolve(couter.count);
    } catch (error) {
      reject(error)
    }
  })
}

export default NotificationService;
