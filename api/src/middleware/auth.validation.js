import { body, validationResult } from "express-validator";
import HTTP_STATUS_CODE from "../constants/http_code";
import ErrorResponse from "../utils/ErrorResponse";

const catchError = (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg}`;
  };  
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, errors.array())
  }
  next();
};

export const signinValidate = [
  body("email", "Email không hợp lệ.").isEmail(),
  body("password", "Mật khẩu không được rỗng.").exists({checkFalsy: true}),
  catchError,
];
export const adminSigninValidate = [
  body("username", "Tên đăng nhập không được rỗng.").exists({checkFalsy: true}),
  body("password", "Mật khẩu không được rỗng.").exists({checkFalsy: true}),
  catchError,
];

export const refreshTokenValidate = [
  body("refreshToken", "Token is required!").exists({checkFalsy: true}),
  catchError,
]

export const signUpValidate = [
  body("email", "Email không hợp lệ.").isEmail(),
  body("phone", "Hãy nhập số điện thoại.").exists({checkFalsy: true}),
  body("name", "Hãy nhập Họ và tên của bạn.").exists({checkFalsy: true}),
  body("password", "Mật khẩu không được rỗng.").exists({checkFalsy: true}),
  catchError,
];

export const updateAccountInfo = [
  body("email", "Email không hợp lệ.").isEmail(),
  body("phone", "Hãy nhập số điện thoại.").exists({checkFalsy: true}),
  body("name", "Hãy nhập Họ và tên của bạn.").exists({checkFalsy: true}),
  catchError,
];

export const updatePassword = [
  body("oldPassword", "Mật khẩu hiện tại không được rỗng.").exists({checkFalsy: true}),
  body("newPassword", "Mật khẩu mới không được rỗng.").exists({checkFalsy: true}),
  catchError,
];

export const changePasswordValidate = [
  body("password", "Mật khẩu không được rỗng.").exists({checkFalsy: true}),
  catchError,
];