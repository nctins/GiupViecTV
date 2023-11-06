import { Model } from "sequelize";

const WorkingScheduleModel = (sequelize, DataTypes) => {
  class WorkingSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WorkingSchedule.init({
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
    day: {
      type: DataTypes.INTEGER(1),
      // primaryKey: true,
      comment: "0->6: thứ 2 -> chủ nhật",
    },
    is_working: {
      type: DataTypes.BOOLEAN,
    },
    time_from_1: {
      type: DataTypes.TIME,
      comment: "ca làm việc 1"
    },
    time_to_1: {
      type: DataTypes.TIME,
      comment: "ca làm việc 1"
    },
    time_from_2: {
      type: DataTypes.TIME,
      comment: "ca làm việc 2"
    },
    time_to_2: {
      type: DataTypes.TIME,
      comment: "ca làm việc 2"
    },
    time_from_3: {
      type: DataTypes.TIME,
      comment: "ca làm việc 3"
    },
    time_to_3: {
      type: DataTypes.TIME,
      comment: "ca làm việc 3"
    },
  }, {
    sequelize,
    modelName: 'working_schedule'
  });

  return WorkingSchedule;
};

export default WorkingScheduleModel;
