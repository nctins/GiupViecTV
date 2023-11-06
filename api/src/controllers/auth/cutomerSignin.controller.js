import { createRefreshToken, createToken } from "../../utils/Token";
import CustomerService from "../../services/customer_account.service";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../../constants/http_code";
import USER_ROLE from "../../constants/user_role";
import TokenService from "../../services/token.service";

const customerSignin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let expo_notifi_token = req.body.notificationToken;
  let customer = await CustomerService.handleSignin(email, password);

  if (!customer) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      "email hoặc mật khẩu không đúng!"
    );
  }

  let payload = {
    id: customer.customer_id,
    name: customer.name,
    email: customer.email,
    role: USER_ROLE.CUSTOMER,
    phone: customer.phone,
  };
  let token = createToken(payload);
  let refreshToken = createRefreshToken(payload);

  try {
    await TokenService.setToken({
      user_id: payload.id,
      refresh_token: refreshToken,
      expo_notifi_token: expo_notifi_token,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "có lỗi xảy ra"
    );
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    token: token,
    refreshToken: refreshToken,
    user: {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      avatar_url: customer.avatar_url,
    },
  });
};

export default customerSignin;
