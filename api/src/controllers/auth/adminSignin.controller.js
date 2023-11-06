import { createRefreshToken, createToken } from "../../utils/Token";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../../constants/http_code";
import USER_ROLE from "../../constants/user_role";
import AdminService from "../../services/admin_account.service";
import TokenService from "../../services/token.service";

const adminSignin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let admin = await AdminService.handleSignin(username, password);

  if (!admin) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      "Tên đăng nhập hoặc mật khẩu không đúng!"
    );
  }

  let payload = {
    id: admin.admin_id,
    name: admin.name,
    username: admin.user_name,
    role: USER_ROLE.ADMIN,
  };
  let token = createToken(payload);
  let refreshToken = createRefreshToken(payload);

  try {
    await TokenService.setToken({
      user_id: payload.id,
      refresh_token: refreshToken,
      expo_notifi_token: null,
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
      username: payload.username,
    },
  });
};

export default adminSignin;
