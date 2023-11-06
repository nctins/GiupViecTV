import { createRefreshToken, createToken } from "../../utils/Token";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../../constants/http_code";
import HelperService from "../../services/helper_account.service"
import USER_ROLE from "../../constants/user_role";
import TokenService from "../../services/token.service";

const helperSignin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let expo_notifi_token = req.body.notificationToken;
  let helper = await HelperService.handleSignin(email, password);

  if (!helper) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      "email hoặc mật khẩu không đúng!"
    );
  }

  if(!helper.is_active){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      "Tài khoản chưa được active vui lòng liên hệ với công ty để được active tài khoản!"
    );
  }

  let payload = {
    id: helper.helper_id,
    name: helper.name,
    email: helper.email,
    role: USER_ROLE.HELPER,
    phone: helper.phone,
    address: helper.address,
    place_id: helper.place_id,
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
      avatar_url: helper.avatar_url,
      address: helper.address,
      place_id: helper.place_id,
    },
  });
};

export default helperSignin;
