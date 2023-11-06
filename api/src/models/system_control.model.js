import { Model } from "sequelize";

const SystemControlModel = (sequelize, DataTypes) => {
  class system_control extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {      
    }
  }
  system_control.init({
    name: {
      type: DataTypes.CHAR(30),
      primaryKey: true,
    },
    value: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'system_control'
  });

  return system_control;
};

export default SystemControlModel;
