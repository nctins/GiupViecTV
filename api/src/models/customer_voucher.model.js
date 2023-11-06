import { Model } from "sequelize";

const CustomerVoucherModel = (sequelize, DataTypes) => {
  class CustomerVoucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerVoucher.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    voucher_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    customer_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
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
    modelName: 'customer_voucher'
  });

  return CustomerVoucher;
};

export default CustomerVoucherModel;
