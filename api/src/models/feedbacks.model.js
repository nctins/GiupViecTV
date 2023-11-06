import { Model } from "sequelize";

const FeedbacksModel = (sequelize, DataTypes) => {
  class Feedbacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedbacks.init({
    feedback_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"FEB_\")",
    },
    user_id: {
      type: DataTypes.CHAR(22),
    },
    create_user: {
      type: DataTypes.CHAR(22),
    },
    create_date: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'feedbacks'
  });

  return Feedbacks;
};

export default FeedbacksModel;
