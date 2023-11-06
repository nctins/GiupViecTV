import express from "express";
import permission from "../middleware/permission";
import verifyToken from "../middleware/verifyToken";
import USER_ROLE from "../constants/user_role";
import { signinValidate, adminSigninValidate, refreshTokenValidate, signUpValidate, updateAccountInfo, updatePassword, changePasswordValidate } from "../middleware/auth.validation";
import AuthController from "../controllers/auth/index";
import BoxChatController from "../controllers/boxChat.controller";
import AdsController from "../controllers/advertisement.controller";
import VoucherController from "../controllers/voucher.controller";
import CustomerController from "../controllers/customer.controller";
import AddressController from "../controllers/address.controller";
import HelperController from "../controllers/helper.controller";
import ServicesController from "../controllers/services.controller";
import PostController from "../controllers/posts.controller";
import FeedbackController from "../controllers/feedback.controller";
import RatingController from "../controllers/rating.controller";
import AdminController from "../controllers/admin.controller";
import NotificationController from "../controllers/notification.controller";
import PaymentControler from "../controllers/payment.controller";

const fileUploader = require('../config/cloudinary.config');
const {ADMIN, HELPER, CUSTOMER} = USER_ROLE;

const AuthRouter = express.Router();
AuthRouter.post("/customer/signin", signinValidate, AuthController.customerSignin);
AuthRouter.post("/helper/signin", signinValidate, AuthController.helperSignin);
AuthRouter.post("/admin/signin", adminSigninValidate, AuthController.adminSignin);
AuthRouter.post("/customer/signup", signUpValidate, AuthController.customerSignup);
AuthRouter.post("/helper/signup", signUpValidate, AuthController.helperSignup);
AuthRouter.post("/signout", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), AuthController.signout);
AuthRouter.post("/refresh-token", refreshTokenValidate, AuthController.refreshToken);
AuthRouter.post("/customer/forgot-password", AuthController.createCustomerOtp);
AuthRouter.post("/helper/forgot-password", AuthController.createHelperOtp);
AuthRouter.post("/customer/forgot-password/verify", AuthController.customerOtpVerify)
AuthRouter.post("/helper/forgot-password/verify", AuthController.helperOtpVerify)
AuthRouter.post("/change-password", verifyToken, permission([HELPER, CUSTOMER]), changePasswordValidate, AuthController.changePassword)

const AdsRouter = express.Router();
AdsRouter.post("/advertisements",verifyToken, permission([ADMIN, HELPER, CUSTOMER]), AdsController.getAll);
AdsRouter.get("/advertisement/:advertisement_id",verifyToken,  permission([ADMIN, HELPER, CUSTOMER]), AdsController.getOneById);
AdsRouter.post("/advertisement",verifyToken, permission([ADMIN]), AdsController.create);
AdsRouter.put("/advertisement/:advertisement_id",verifyToken, permission([ADMIN]), AdsController.updateById);

const BoxChatRouter = express.Router();
BoxChatRouter.get( "/box-chat/:box_chat_id/messages", verifyToken, permission([HELPER, CUSTOMER]), BoxChatController.getMessages);
BoxChatRouter.get( "/box-chats", verifyToken, permission([HELPER, CUSTOMER]), BoxChatController.getBoxChats);
BoxChatRouter.post( "/box-chat/:box_chat_id/message", verifyToken, permission([HELPER, CUSTOMER]), BoxChatController.postMessage);
BoxChatRouter.put( "/box-chat/:box_chat_id/set-view-all", verifyToken, permission([HELPER, CUSTOMER]), BoxChatController.setViewAll);
BoxChatRouter.get( "/box-chat-id", verifyToken, permission([HELPER, CUSTOMER]), BoxChatController.getBoxChatId );
BoxChatRouter.get( "/messages/unread", verifyToken, permission([HELPER, CUSTOMER]), BoxChatController.countUnreadMessage );

const VoucherRouter = express.Router();
VoucherRouter.post("/vouchers",verifyToken, permission([ADMIN]), VoucherController.getAll);
VoucherRouter.get("/voucher/:voucher_id",verifyToken, permission([ADMIN, HELPER, CUSTOMER]), VoucherController.getOne);
VoucherRouter.post("/voucher",verifyToken, permission([ADMIN]), VoucherController.create);
VoucherRouter.put("/voucher/:voucher_id",verifyToken, permission([ADMIN]), VoucherController.updateById);
VoucherRouter.get("/voucher/customer/:voucher_code",verifyToken, permission([CUSTOMER]), VoucherController.getVoucherByCustomer);

const CustomerRouter = express.Router();
CustomerRouter.get("/customer/:customer_id/addresses", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), AddressController.getAllByCustomerId);
CustomerRouter.post("/customer/:customer_id/address", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), AddressController.create);
CustomerRouter.get("/customer/:customer_id/address/:customer_address_id", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), AddressController.getOneById);
CustomerRouter.put("/customer/:customer_id/address/:customer_address_id", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), AddressController.updateById);
CustomerRouter.get("/customer/:customer_id", verifyToken, permission([ADMIN, CUSTOMER, HELPER]), CustomerController.getOneById);
CustomerRouter.put("/customer/:customer_id", verifyToken, permission([ADMIN, CUSTOMER]), updateAccountInfo, CustomerController.updateById);
CustomerRouter.put("/customer/:customer_id/updatePassword", verifyToken, permission([ADMIN, CUSTOMER]), updatePassword, CustomerController.updatePassword);
CustomerRouter.get("/customers", verifyToken, permission([ADMIN]), CustomerController.getAll);
CustomerRouter.get("/customer/:customer_id/vouchers", verifyToken, permission([ADMIN, CUSTOMER]), VoucherController.getAllByCustomerId);

const HelperRouter = express.Router();
HelperRouter.get("/helper/:helper_id", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), HelperController.getOneById);
HelperRouter.put("/helper/:helper_id", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), HelperController.updateById);
HelperRouter.get("/helpers", verifyToken, permission([ADMIN]), HelperController.getAll);
HelperRouter.get("/helper/:helper_id/working-schedule", verifyToken, permission([HELPER]), HelperController.getWorkingSchedule);
HelperRouter.put("/helper/:helper_id/working-schedule", verifyToken, permission([HELPER]), HelperController.updateWorkingSchedule);
HelperRouter.post("/helper/:helper_id/working-schedule", verifyToken, permission([HELPER]), HelperController.createDefaultWorkingSchedule);
HelperRouter.get("/helper/:helper_id/rest-schedule", verifyToken, permission([HELPER]), HelperController.getRestSchedule);
HelperRouter.put("/helper/:helper_id/rest-schedule", verifyToken, permission([HELPER]), HelperController.updateRestSchedule);
HelperRouter.delete("/helper/:helper_id/rest-schedule", verifyToken, permission([HELPER]), HelperController.removeRestSchedule);
HelperRouter.put("/helper/:helper_id/updatePassword", verifyToken, permission([ADMIN, HELPER]), updatePassword, HelperController.updatePassword);
HelperRouter.get("/helper/:helper_id/service-work", verifyToken, permission([HELPER]), HelperController.getServiceWork);
HelperRouter.post("/helper/:helper_id/service-work", verifyToken, permission([HELPER]), HelperController.createServiceWork);
HelperRouter.delete("/helper/:helper_id/service-work", verifyToken, permission([HELPER]), HelperController.deleteServiceWork);
HelperRouter.post("/helper/:helper_id/service-work/checkAll", verifyToken, permission([HELPER]), HelperController.checkAllServiceWork);
HelperRouter.delete("/helper/:helper_id/service-work/unCheckAll", verifyToken, permission([HELPER]), HelperController.unCheckAllServiceWork);
HelperRouter.get("/helper/:helper_id/helper_income", verifyToken, permission([HELPER]), HelperController.getHelperIncome);

const ServicesRouter = express.Router();
ServicesRouter.get("/services", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), ServicesController.getServices);
ServicesRouter.get("/service/:service_id", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), ServicesController.getServiceById);
ServicesRouter.post("/service", verifyToken, permission([ADMIN]), ServicesController.createService);
ServicesRouter.put("/service/setValidService/:service_id", verifyToken, permission([ADMIN]), ServicesController.setValidService);
ServicesRouter.put("/service/:service_id", verifyToken, permission([ADMIN]), ServicesController.updateService);

const PostRouter = express.Router();
PostRouter.get("/posts", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), PostController.getPosts);
PostRouter.get("/posts/helper", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), PostController.getPostsByHelper);
PostRouter.get("/posts/helper/currentDate", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), PostController.getPostsByHelperFilterDate);
PostRouter.post("/post", verifyToken, permission([CUSTOMER]), PostController.createPost);
PostRouter.get("/post", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), PostController.getPostById);
PostRouter.put("/post", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), PostController.updatePost);
PostRouter.delete("/post", verifyToken, permission([CUSTOMER]), PostController.deletePost);

const RatingRouter = express.Router();
RatingRouter.post("/rating", verifyToken, permission([HELPER, CUSTOMER]), RatingController.createRating);
RatingRouter.get("/rating/customer/:customer_id",verifyToken, permission([HELPER]), RatingController.getCustomerRating);
RatingRouter.get("/rating/helper/:helper_id",verifyToken, permission([CUSTOMER]), RatingController.getHelperRating);
RatingRouter.get("/rating/post/:post_id",verifyToken, permission([CUSTOMER, HELPER]), RatingController.getRating);

const NotificationRouter = express.Router();
NotificationRouter.get("/notifications",  verifyToken, permission([HELPER, CUSTOMER, ADMIN]), NotificationController.getNotification )
NotificationRouter.get("/notifications/unread",  verifyToken, permission([HELPER, CUSTOMER, ADMIN]), NotificationController.countUnreadNotification)
NotificationRouter.post("/notification/create",  verifyToken, permission([HELPER, CUSTOMER, ADMIN]), NotificationController.createNotification )
NotificationRouter.put("/notification",  verifyToken, permission([HELPER, CUSTOMER, ADMIN]), NotificationController.updateNotification )
NotificationRouter.put("/notification/set-view-all",  verifyToken, permission([HELPER, CUSTOMER, ADMIN]), NotificationController.setViewAll )

const FeedbackRouter = express.Router();
FeedbackRouter.post("/feedback", verifyToken, permission([HELPER, CUSTOMER]), FeedbackController.create);
FeedbackRouter.get("/feedback", verifyToken, permission([ADMIN]), FeedbackController.getAll);

const AdminRouter = express.Router();
AdminRouter.post("/admin/UserManagement/view", verifyToken, permission([ADMIN]), AdminController.getAll);
AdminRouter.put("/admin/UserManagement/update/:user_id", verifyToken, permission([ADMIN]), AdminController.updateById);
AdminRouter.post("/admin/SystemManagement/CalculatePriceHelper", verifyToken, permission([ADMIN]), AdminController.calculatePriceHelper);
AdminRouter.put("/admin/SystemManagement/CalculatePriceHelper/confirm", verifyToken, permission([ADMIN]), AdminController.confirmPaymentHelper);
AdminRouter.post("/admin/UserManagement/system_control/create", verifyToken, permission([ADMIN]), AdminController.createSystemControl);
AdminRouter.put("/admin/UserManagement/system_control/update", verifyToken, permission([ADMIN]), AdminController.updateSystemControl);
AdminRouter.get("/admin/UserManagement/system_control", verifyToken, permission([ADMIN]), AdminController.getAllSystemControl);
AdminRouter.get("/admin/UserManagement/system_control/:name", verifyToken, permission([ADMIN, HELPER, CUSTOMER]), AdminController.getSystemControlByName);
AdminRouter.get("/admin/AlertHaveAppointmentPrepareStart", verifyToken, permission([ADMIN]), AdminController.alertHaveAppointmentPrepareStart);

const PaymentRouter = express.Router();
PaymentRouter.post("/payment/createPayment", verifyToken, permission([CUSTOMER]), PaymentControler.createPaymentUrl);
PaymentRouter.get("/payment/return_url", PaymentControler.VNPAY_ReturnUrl);


const InitRoutes = (app) => {
  app.use("/auth", AuthRouter);
  app.use(CustomerRouter);
  app.use(HelperRouter);
  app.use(AdminRouter);
  app.use(BoxChatRouter);
  app.use(VoucherRouter);
  app.use(AdsRouter);
  app.use(ServicesRouter);
  app.use(PostRouter);
  app.use(RatingRouter);
  app.use(NotificationRouter);
  app.use(FeedbackRouter);
  app.use(PaymentRouter);
};
export default InitRoutes;
