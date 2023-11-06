import { Model } from "sequelize";

const CustomerAddressModel = (sequelize, DataTypes) => {
  class CustomerAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerAddress.init({
    customer_address_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.CHAR(22),
    },
    address_title: {
      type: DataTypes.STRING(50),
      comment: "tên địa chỉ. vd: nhà riêng, công ty,...",
    },
    address: {
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
    modelName: 'customer_address'
  });

  return CustomerAddress;
};

export default CustomerAddressModel;
