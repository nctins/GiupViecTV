import { Model } from "sequelize";

const PostDetailModel = (sequelize, DataTypes) => {
  class PostDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.services, {
        as: "service",
        sourceKey: 'service_id', 
        foreignKey: 'service_id',
      })
    }
  }
  PostDetail.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    service_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    value: {
      type: DataTypes.INTEGER(9),
      comment: "lưu giá trị của nhập của người dùng ( nếu input format = radio lưu giá trị 1 vì 1 * đơn giá bằng chính nó)",
    },
    service_seq_nb: {
      type: DataTypes.INTEGER(1),
    },
    multiple_field_value: {
      type: DataTypes.INTEGER(3),
      comment: "lưu bội số của dịch vụ trong đơn hàng vd số lượng phòng, số lượng bộ bàn ghế,...",
      defaultValue: 1,
    },
    total: {
      type: DataTypes.INTEGER(9),
    },
  }, {
    sequelize,
    modelName: 'post_detail'
  });

  return PostDetail;
};

export default PostDetailModel;
