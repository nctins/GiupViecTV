import DBConfig from "../config/db.config";
import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";

import AdminAccountModel from "./admin_account.model";
import AdvertisementsModel from "./advertisements.model";
import BoxChatModel from "./box_chat.model";
import CustomerAccountModel from "./customer_account.model";
import CustomerAddressModel from "./customer_address.model";
import CustomerRatingModel from "./customer_rating.model";
import CustomerVoucherModel from "./customer_voucher.model";
import FeedBacksModel from "./feedbacks.model";
import HelperAccountModel from "./helper_account.model";
import HelperRatingModel from "./helper_rating.model";
import MessagesModel from "./messages.model";
import NotificationsModel from "./notifications.model";
import PostDetailModel from "./post_detail.model";
import PostsModel from "./posts.model";
import ServiceDetailModel from "./service_detail.model";
import ServicesModel from "./services.model";
import VoucherRangeModel from "./voucher_range.model";
import VouchersModel from "./vouchers.model";
import TokensModel from "./tokens.model";
import WorkingScheduleModel from "./working_schedule.model";
import RestScheduleModel from "./rest_schedule.model";
import HelperServiceWorkModel from "./helper_service_work.model";
import HelperIncomeModel from "./helper_income.model";
import SystemControlModel from "./system_control.model";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = DBConfig[env];

const sequelize = new Sequelize(config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin_account = AdminAccountModel(sequelize, DataTypes);
db.advertisement = AdvertisementsModel(sequelize, DataTypes);
db.box_chat = BoxChatModel(sequelize, DataTypes);
db.customer_account = CustomerAccountModel(sequelize, DataTypes);
db.customer_address = CustomerAddressModel(sequelize, DataTypes);
db.customer_rating = CustomerRatingModel(sequelize, DataTypes);
db.customer_voucher = CustomerVoucherModel(sequelize, DataTypes);
db.feedbacks = FeedBacksModel(sequelize, DataTypes);
db.helper_account = HelperAccountModel(sequelize, DataTypes);
db.helper_rating = HelperRatingModel(sequelize, DataTypes);
db.messages = MessagesModel(sequelize, DataTypes);
db.notifications = NotificationsModel(sequelize, DataTypes);
db.post_detail = PostDetailModel(sequelize, DataTypes);
db.posts = PostsModel(sequelize, DataTypes);
db.service_detail = ServiceDetailModel(sequelize, DataTypes);
db.services = ServicesModel(sequelize, DataTypes);
db.voucher_range = VoucherRangeModel(sequelize, DataTypes);
db.vouchers = VouchersModel(sequelize, DataTypes);
db.tokens = TokensModel(sequelize, DataTypes);
db.working_schedule = WorkingScheduleModel(sequelize, DataTypes);
db.rest_schedule = RestScheduleModel(sequelize, DataTypes);
db.helper_service_work = HelperServiceWorkModel(sequelize, DataTypes);
db.helper_income = HelperIncomeModel(sequelize, DataTypes);
db.system_control = SystemControlModel(sequelize, DataTypes);

// association
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});
// db.box_chat.

export default db;