import { createToken, decodeToken } from "../../utils/Token";
import { TokenExpiredError } from "jsonwebtoken";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../../constants/http_code";
import TokenService from "../../services/token.service";

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      "Refresh token was expired."
    );
  }
  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.UNAUTHORIZED,
    "Wrong refresh token."
  );
};

const refreshToken = async (req, res) => {
  const refresh_token = req.body.refreshToken;
  let { decode, error } = decodeToken(refresh_token);

  if (error) {
    return catchError(error, res);
  }

  const { iat, exp, ...payload } = decode;
  try {
    const is_exact_refresh_token = await TokenService.verify({
      user_id: payload.id,
      refresh_token: refresh_token
    });
    // refresh token not in DB
    if (!is_exact_refresh_token) {
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Wrong refresh token."
      );
    }
  } catch (error) {
    console.log(error)
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Có lỗi xảy ra"
    );
  }

  const token = createToken(payload);
  return res.status(HTTP_STATUS_CODE.OK).json({
    token: token,
  });
};

export default refreshToken;
