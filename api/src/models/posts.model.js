import { Model } from "sequelize";

const PostsModel = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.post_detail, {
        as: "postDetails",
        sourceKey: "post_id",
        foreignKey: "post_id",
        targetKey: "post_id",
      })
    }
  }
  Posts.init({
    post_id: {
      type: DataTypes.CHAR(22),
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.CHAR(22),
    },
    customer_name: {
      type: DataTypes.STRING(30),
    },
    customer_phone: {
      type: DataTypes.CHAR(10),
    },
    post_type: {
      type: DataTypes.TINYINT(1),
      comment: "0: đơn hàng theo giờ, 1: đơn hàng tức thì",
    },
    helper_id: {
      type: DataTypes.CHAR(22),
      comment: "id của ngv nhận đơn hàng",
    },
    payment_method: {
      type: DataTypes.TINYINT(1),
      comment: "0 - TIỀN MẶT || 1 - VNPAY",
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING(150),
    },
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.TIME,
    },
    end_time: {
      type: DataTypes.DATE,
      comment: "thời gian dự kiến hoàn thành lịch hẹn",
    },
    note: {
      type: DataTypes.TEXT,
    },
    coupon_price: {
      type: DataTypes.INTEGER(9)
    },
    total_estimate_time: {
      type: DataTypes.INTEGER(3),
      comment: "tổng thời gian ước lượng hoàn thành cộng việc trong lịch hẹn",
    },
    total: {
      type: DataTypes.INTEGER(9)
    },
    voucher_id: {
      type: DataTypes.CHAR(22),
    },
    post_state: {
      type: DataTypes.TINYINT(1),
      comment: "0: đã hủy, 1: đã hoàn thành, 2: chờ xử lý, 3: chưa hoàn thành",
      defaultValue: 2,
    },
    reason_cancel: {
      type: DataTypes.STRING(150),
      defaultValue: null,
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
    place_id: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'posts'
  });

  return Posts;
};

export default PostsModel;
