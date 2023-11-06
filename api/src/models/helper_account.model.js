import { Model } from "sequelize";

const HelperAccountModel = (sequelize, DataTypes) => {
  class HelperAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.working_schedule, {
        as: "working_schedule",
        sourceKey: "helper_id",
        foreignKey: "helper_id",
      })
      this.hasMany(models.rest_schedule, {
        as: "rest_schedule",
        sourceKey: "helper_id",
        foreignKey: "helper_id",
      })
      this.hasMany(models.customer_rating, {
        as: "rating",
        sourceKey: "helper_id",
        foreignKey: "target_id",
      })
      this.hasMany(models.posts, {
        as: "post",
        sourceKey: "helper_id",
        foreignKey: "helper_id",
      })
    }
  }
  HelperAccount.init({
    helper_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"HEL_\")",
    },
    email: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.CHAR(60),
    },
    name: {
      type: DataTypes.STRING(30),
    },
    address: {
      type: DataTypes.STRING(150),
    },
    phone: {
      type: DataTypes.CHAR(10),
    },
    MSDD: {
      type: DataTypes.CHAR(12),
      comment: "Mã số định danh  (CMND/CCCD)",
    },
    avatar_url: {
      type: DataTypes.TEXT,
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
    is_active: {
      type: DataTypes.BOOLEAN,
      comment: "trạng thái kích hoạt của tài khoản",
      defaultValue: 0,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    },
    last_payment_date: {
      type: DataTypes.DATE,
      comment: "ngày NGV tới nhận tiền",
    },
    credits: {
      type: DataTypes.INTEGER(3),
      comment: "điểm tin cậy",
    },
    place_id: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'helper_account'
  });

  return HelperAccount;
};

export default HelperAccountModel;
