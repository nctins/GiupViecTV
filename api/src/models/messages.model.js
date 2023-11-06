import { Model } from "sequelize";

const MessagesModel = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messages.init({
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    box_chat_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    from_user_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
      comment: "id của người gửi",
    },
    date_time: {
      type: DataTypes.DATE,
      // primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    is_view: {
      type: DataTypes.BOOLEAN,
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
  }, {
    sequelize,
    modelName: 'messages'
  });

  return Messages;
};

export default MessagesModel;
