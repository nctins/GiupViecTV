import { Model } from "sequelize";

const AdvertisementsModel = (sequelize, DataTypes) => {
  class Advertisements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Advertisements.init({
    advertisement_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "tạo theo hàm uniqid(\"ADV_\")",
    },
    poster_path: {
      type: DataTypes.STRING(100),
      comment: "path hình poster quảng cáo",
    },
    advertisement_title: {
      type: DataTypes.STRING(50),
    },
    advertisement_content: {
      type: DataTypes.TEXT,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
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
    modelName: 'advertisements'
  });

  return Advertisements;
};

export default AdvertisementsModel;
