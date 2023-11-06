import { Model } from "sequelize";

const HelperServiceWorkModel = (sequelize, DataTypes) => {
  class HelperServiceWork extends Model {
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
  HelperServiceWork.init({
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    helper_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
    },
    service_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
      comment: "id service"
    },
  }, {
    sequelize,
    modelName: 'helper_service_work'
  });

  return HelperServiceWork;
};

export default HelperServiceWorkModel;
