import { Model } from "sequelize";
import { uniqid8byteGen } from "../utils/IDGenerator";

const VouchersModel = (sequelize, DataTypes) => {
  class Vouchers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vouchers.init({
    voucher_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"VOU_\")",
    },
    voucher_name: {
      type: DataTypes.STRING(150),
      comment: "tên voucher"
    },
    voucher_type: {
      type: DataTypes.TINYINT(1),
      comment: "0: tính theo discount_percent, 1: tính theo discount_price",
    },
    voucher_code: {
      type: DataTypes.CHAR(8),
      defaultValue: () => uniqid8byteGen(),
    },
    voucher_description: {
      type: DataTypes.TEXT,
    },
    discount_percent: {
      type: DataTypes.DECIMAL(5,4),
      comment: "chiết khấu %. các giá trị hợp lệ: 100%: 1.0000, 35%: 0.3500,... ",
    },
    discount_price: {
      type: DataTypes.INTEGER(9),
      comment: "chiết khấu theo tiền (null nếu type = 0)",
    },
    min_post_price: {
      type: DataTypes.INTEGER(9),
      comment: "áp dụng cho đơn hàng tối thiểu",
    },
    max_discount_price: {
      type: DataTypes.INTEGER(9),
      comment: "số tiền giảm giá tối đa (null nếu type = 1)",
    },
    quantity: {
      type: DataTypes.INTEGER(5),
      comment: "số lượng voucher",
    },
    payment_method_condition: {
      type: DataTypes.TINYINT(1),
      comment: "0: áp dụng cho tất cả payment method, 1: áp dụng cho COD, 2: áp dụng cho VNPAY",
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    voucher_url: {
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
  }, {
    sequelize,
    modelName: 'vouchers'
  });

  return Vouchers;
};

export default VouchersModel;
