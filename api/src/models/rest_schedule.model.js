import { Model } from "sequelize";

const RestScheduleModel = (sequelize, DataTypes) => {
  class RestSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RestSchedule.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    helper_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
      comment: "tạo theo hàm uniqid(\"HEL_\")",
    },
    date: {
      type: DataTypes.DATE,
      // primaryKey: true,
      comment: "ngày nghỉ"
    },
    off_time_1: {
      type: DataTypes.BOOLEAN,
      comment: "nghỉ ca 1"
    },
    off_time_2: {
      type: DataTypes.BOOLEAN,
      comment: "nghỉ ca 1"
    },
    off_time_3: {
      type: DataTypes.BOOLEAN,
      comment: "nghỉ ca 1"
    },
  }, {
    sequelize,
    modelName: 'rest_schedule'
  });

  return RestSchedule;
};

export default RestScheduleModel;
