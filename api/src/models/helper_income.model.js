import { Model } from "sequelize";

const HelperIncomeModel = (sequelize, DataTypes) => {
  class HelperIncome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.helper_account, {
        as: "helper",
        foreignKey: "helper_id",
        targetKey: "helper_id",
      })
    }
  }
  HelperIncome.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    helper_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATE,
      // primaryKey: true,
      comment: "ngày bắt đầu tính tiền"
    },
    end_date: {
        type: DataTypes.DATE,
        // primaryKey: true,
        comment: "ngày kết thúc tính tiền"
    },
    total_price: {
        type: DataTypes.INTEGER(9),
        comment: "Tổng số tiền NGV kiếm được"
      },
    receive_price: {
        type: DataTypes.INTEGER(9),
        comment: "Số tiền NGV được nhận từ công ty (tiền khuyến mãi voucher, tiền vnpay)"
    },
    enterprise_price: {
        type: DataTypes.INTEGER(9),
        comment: "Số tiền NGV phải trả cho công ty (tiền phí dịch vụ, thuế)"
    },
  }, {
    sequelize,
    modelName: 'helper_income'
  });

  return HelperIncome;
};

export default HelperIncomeModel;
