import adminSignin from "./adminSignin.controller";
import customerSignin from "./cutomerSignin.controller";
import customerSignup from "./cutomerSignup.controller";
import helperSignin from "./helperSignin.controller";
import helperSignup from "./helperSignup.controller";
import refreshToken from "./refreshToken.controller";
import signout from "./signout.controller";
import ForgotPassController from "./fogotPass.controller";

const AuthController = {};
AuthController.adminSignin = adminSignin;
AuthController.customerSignin = customerSignin;
AuthController.customerSignup = customerSignup;
AuthController.helperSignin = helperSignin;
AuthController.helperSignup = helperSignup;
AuthController.refreshToken = refreshToken;
AuthController.signout = signout;
AuthController.createCustomerOtp = ForgotPassController.createCustomerOtp;
AuthController.createHelperOtp = ForgotPassController.createHelperOtp;
AuthController.customerOtpVerify = ForgotPassController.customerOtpVerify;
AuthController.helperOtpVerify = ForgotPassController.helperOtpVerify;
AuthController.changePassword = ForgotPassController.changePassword;

export default  AuthController;