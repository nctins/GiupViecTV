import { Model } from "sequelize";

const TokensModel = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tokens.init({
    user_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    socket_id: {
      type: DataTypes.CHAR(20),
    },
    expo_notifi_token: {
      type: DataTypes.CHAR(22),
    },
    otp: {
      type: DataTypes.CHAR(5),
    }
  }, {
    sequelize,
    modelName: 'tokens'
  });

  return Tokens;
};

export default TokensModel;
