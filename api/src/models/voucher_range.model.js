import { Model } from "sequelize";

const VoucherRangeModel = (sequelize, DataTypes) => {
  class VoucherRange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VoucherRange.init({
    id: {
      type: DataTypes.CHAR(22), 
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"VOR_\")",
    },
    voucher_id: {
      type: DataTypes.CHAR(22),
    },
    service_id: {
      type: DataTypes.CHAR(22),
    },
    is_all_service: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'voucher_range'
  });

  return VoucherRange;
};

export default VoucherRangeModel;
