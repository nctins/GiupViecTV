import HTTP_STATUS_CODE from "../../constants/http_code";
import USER_ROLE from "../../constants/user_role";
import CustomerService from "../../services/customer_account.service";
import HelperService from "../../services/helper_account.service";
import TokenService from "../../services/token.service";
import ErrorResponse from "../../utils/ErrorResponse";
import Mailer from "../../utils/Mailer";
import Message from "../../utils/Message";
import { createOTP, createToken } from "../../utils/Token";

const ForgotPassController = {};

ForgotPassController.createCustomerOtp = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Email không được trống"
    );
  }

  const customer = await CustomerService.findOne(email);

  if (!customer) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Email không tồn tại"
    );
  }

  const otp = createOTP();
  await TokenService.setOtp({ user_id: customer.customer_id, otp: otp });

  const msg = Message.otpMail(email, otp, customer);

  return Mailer.send(msg)
    .then((val) => {
      return res
        .status(HTTP_STATUS_CODE.OK)
        .json({ msg: "Đã gửi mã xác thực." });
    })
    .catch((err) => {
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "có lỗi xảy ra"
      );
    });
};

ForgotPassController.createHelperOtp = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "email không được trống"
    );
  }

  const helper = await HelperService.findOne(email);

  if (!helper) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Email không tồn tại"
    );
  }

  const otp = createOTP();
  await TokenService.setOtp({ user_id: helper.helper_id, otp: otp });

  const msg = Message.otpMail(email, otp, helper);

  return Mailer.send(msg)
    .then((val) => {
      return res
        .status(HTTP_STATUS_CODE.OK)
        .json({ msg: "Đã gửi mã xác thực." });
    })
    .catch((err) => {
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "có lỗi xảy ra"
      );
    });
};

ForgotPassController.customerOtpVerify = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  if (!otp) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "otp không được trống"
    );
  }
  const customer = await CustomerService.findOne(email);
  return TokenService.verify({ otp: otp, user_id: customer.customer_id })
    .then((value) => {
      const access_token = createToken({
        id: customer.customer_id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        role: USER_ROLE.CUSTOMER,
      });

      if (!value) {
        return ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Mã xác thực không đúng"
        );
      }

      return res.status(HTTP_STATUS_CODE.OK).json({ token: access_token });
    })
    .catch((err) => {
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Có lỗi xảy ra"
      );
    });
};

ForgotPassController.helperOtpVerify = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  if (!otp) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "otp không được trống"
    );
  }
  const helper = await HelperService.findOne(email);
  return TokenService.verify({ otp: otp, user_id: helper.helper_id })
    .then((value) => {
      const access_token = createToken({
        id: helper.helper_id,
        name: helper.name,
        email: helper.email,
        phone: helper.phone,
        role: USER_ROLE.HELPER,
      });

      if (!value) {
        return ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Mã xác thực không đúng"
        );
      }

      return res.status(HTTP_STATUS_CODE.OK).json({ token: access_token });
    })
    .catch((err) => {
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Có lỗi xảy ra"
      );
    });
};

ForgotPassController.changePassword = async (req, res) => {
  const role = req.auth_info.role;
  const password = req.body.password;
  if (role == USER_ROLE.CUSTOMER) {
    return CustomerService.updateById(req.auth_info.id, { password })
      .then((value) => {
        return res
          .status(HTTP_STATUS_CODE.OK)
          .json({ msg: "Thay đổi mật khẩu thành công" });
      })
      .catch((err) => {
        return ErrorResponse(
          res,
          HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          "Có lỗi xảy ra vui lòng thử lại."
        );
      });
  } else {
    return HelperService.updateById(req.auth_info.id, { password })
      .then((value) => {
        return res
          .status(HTTP_STATUS_CODE.OK)
          .json({ msg: "Thay đổi mật khẩu thành công" });
      })
      .catch((err) => {
        return ErrorResponse(
          res,
          HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          "Có lỗi xảy ra vui lòng thử lại."
        );
      });
  }
};

export default ForgotPassController;
