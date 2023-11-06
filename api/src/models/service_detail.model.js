import { Model } from "sequelize";

const ServiceDetailModel = (sequelize, DataTypes) => {
  class ServiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceDetail.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_id: {
      type: DataTypes.CHAR(22),
      // primaryKey: true,
    },
    seq_nb: {
      type: DataTypes.INTEGER(1),
      // primaryKey: true,
      comment: "number of record for same key",
    },
    dram: {
      type: DataTypes.STRING(30),
      comment: "cách thức đo lường vd: diện tích, số lượng,…",
    },
    dram_unit: {
      type: DataTypes.STRING(10),
      comment: "đơn vị đo lường vd: cái, m2,… null nếu nhâp kiểu radio",
    },
    unit_price_title: {
      type: DataTypes.STRING(20),
      comment: "đơn vị đơn giá vd: VNĐ/cái,… null nếu nhập kiểu radio",
    },
    string_value: {
      type: DataTypes.STRING(20),
      comment: "giá trị của radio button vd: ít, nhiều,… null nếu nhập kiểu textbox"
    },
    multiple_field_title: {
      type: DataTypes.STRING(30),
      comment: "tiêu đề bội số của dịch vụ. vd: \"số lượng phòng\", \"số bộ bàn ghế\",...",
      defaultValue: null,
    },
    unit_price: {
      type: DataTypes.INTEGER(9),
      comment: "đơn giá của dịch vụ, là giá trị của radio button"
    },
    estimate_time: {
      type: DataTypes.INTEGER(3),
      comment: "thời gian ước lượng hoàn thành tính theo phút/đơn vị đo lường",
    },
  }, {
    sequelize,
    modelName: 'service_detail'
  });

  return ServiceDetail;
};

export default ServiceDetailModel;
