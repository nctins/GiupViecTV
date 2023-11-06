import { Model } from "sequelize";

const CustomerAccountModel = (sequelize, DataTypes) => {
  class CustomerAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.customer_address, {
        as: "_address",
        sourceKey: "customer_id",
        foreignKey: "customer_id",
      });

    }
  }
  CustomerAccount.init({
    customer_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"CUS_\")",
    },
    email: {
      type: DataTypes.STRING(100)
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
      defaultValue: 1,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    },
    place_id: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'customer_account'
  });

  return CustomerAccount;
};

export default CustomerAccountModel;
