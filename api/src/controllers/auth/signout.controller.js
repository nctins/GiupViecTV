import HTTP_STATUS_CODE from "../../constants/http_code";
import TokenService from "../../services/token.service";

const signout = async (req, res) => {
  const user_id = req.auth_info.id;
  return TokenService.setToken({ 
    user_id: user_id, 
    refresh_token: null, 
    expo_notifi_token: null 
  })
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({
        msg: "Đăng xuất thành công",
      });
    })
    .catch(() => {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        msg: "Có lỗi xảy ra",
      });
    });
};
export default signout;
