import { Model } from "sequelize";
import { NOTIFICATION_MODULE } from "../constants/db_constants";

const NotificationsModel = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init({
    notification_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"NTF_\")",
    },
    user_id: {
      type: DataTypes.CHAR(22),
    },
    icon_code: {
      type: DataTypes.STRING(30),
    },
    title: {
      type: DataTypes.STRING(50),
    },
    content: {
      type: DataTypes.TEXT,
    },
    is_view: {
      type: DataTypes.BOOLEAN,
    },
    notification_module: {
      type: DataTypes.STRING(30),
      comment: "module của thông báo (post, coupon, adv)",
      defaultValue: NOTIFICATION_MODULE.NONE,
    },
    module_object_id: {
      type: DataTypes.CHAR(22),
      comment: "id cũa đối tượng thuộc module (post_id, voucher_id, adv_id)",
    },
    create_user: {
      type: DataTypes.CHAR(22),
    },
    create_date: {
      type: DataTypes.DATE,
    },
    update_user: {
      type: DataTypes.CHAR(22),
    },
    update_date: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'notifications',
  });

  return Notifications;
};

export default NotificationsModel;
