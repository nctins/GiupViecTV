import { Model } from "sequelize";

const HelperRatingModel = (sequelize, DataTypes) => {
  class HelperRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.helper_account,{
        as:"helper",
        targetKey: "helper_id",
        foreignKey: "helper_id",
      })
    }
  }
  HelperRating.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    helper_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    target_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
      comment: "người được đánh giá"
    },
    rank: {
      type: DataTypes.TINYINT(1),
      comment: "1 <= rank <= 5",
    },
    date_time: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'helper_rating'
  });

  return HelperRating;
};

export default HelperRatingModel;
