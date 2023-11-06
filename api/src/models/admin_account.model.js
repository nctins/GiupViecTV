import { Model } from "sequelize";

const AdminAccountModel = (sequelize, DataTypes) => {
  class AdminAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminAccount.init({
    admin_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"ADM_\")",
    },
    user_name: {
      type: DataTypes.STRING(30),
    },
    password: {
      type: DataTypes.CHAR(60),
    },
    name: {
      type: DataTypes.STRING(30),
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
  }, {
    sequelize,
    modelName: 'admin_account'
  });

  return AdminAccount;
};

export default AdminAccountModel;
