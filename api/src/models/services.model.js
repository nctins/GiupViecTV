import { Model } from "sequelize";

const ServicesModel = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.service_detail, {
        as: "detail",
        foreignKey: "service_id",
        targetKey: "service_id",
      });
      
    }
  }
  Services.init({
    service_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
    },
    service_name: {
      type: DataTypes.STRING(100),
    },
    service_description: {
      type: DataTypes.TEXT,
    },
    service_type: {
      type: DataTypes.TINYINT(1),
      comment: "0: normal, 1: bonus",
    },
    input_format: {
      type: DataTypes.TINYINT(1),
      comment: "0: radio, 1: textbox",
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
    is_active: {
      type: DataTypes.BOOLEAN,
      comment: "trạng thái kích hoạt (show) của dịch vụ",
      defaultValue: 0,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      comment: "record đã xóa",
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'services'
  });

  return Services;
};

export default ServicesModel;
