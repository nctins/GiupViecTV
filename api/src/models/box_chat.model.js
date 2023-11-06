import { Model } from "sequelize";

const BoxChatModel = (sequelize, DataTypes) => {
  class BoxChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.customer_account, {
        as: "customer",
        foreignKey: "customer_id",
        targetKey: "customer_id",
      });

      this.belongsTo(models.helper_account, {
        as: "helper",
        foreignKey: "helper_id",
        targetKey: "helper_id",
      });

      this.hasMany(models.messages, {
        as: "messages",
        sourceKey: "box_chat_id",
        foreignKey: "box_chat_id",
      })
    }
  }
  BoxChat.init(
    {
      box_chat_id: {
        type: DataTypes.CHAR(22),
        comment: 'tạo theo hàm uniqid("BOX_")',
      },
      customer_id: {
        type: DataTypes.CHAR(22),
        primaryKey: true,
      },
      helper_id: {
        type: DataTypes.CHAR(22),
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "box_chat",
    }
  );

  return BoxChat;
};

export default BoxChatModel;
