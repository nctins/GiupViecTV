import { TokenExpiredError } from "jsonwebtoken";
import HTTP_STATUS_CODE from "../constants/http_code";
import ErrorResponse from "../utils/ErrorResponse";
import { decodeToken } from "../utils/Token";

export const socketVerifyToken = (socket, next) => {

  const token = socket.handshake.headers["x-access-token"];
  const err = new Error("Unauthorized");
  err.error_code = HTTP_STATUS_CODE.UNAUTHORIZED;
  if (!token) {
    err.msg = "No token provided!";
    return next(err);
  }
  const {decode, error} = decodeToken(token);
  if (error) {
    if(err instanceof TokenExpiredError) {
      err.msg = "Access Token was expired!";
    } else {
      err.msg = "Invalid access token!";
    }
    return next(err);
  }
  next();
}

//url verifytoken
const catchError = (err, res) => {
    if(err instanceof TokenExpiredError) {
        return ErrorResponse(res, HTTP_STATUS_CODE.UNAUTHORIZED, "Access Token was expired!");
    }
    return ErrorResponse(res, HTTP_STATUS_CODE.UNAUTHORIZED);
}

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return ErrorResponse(res, HTTP_STATUS_CODE.FORBIDDEN, "No token provided!");
  }
  const {decode, error} = decodeToken(token);
  if (error) {
    return catchError(error, res);
  }
  req.auth_info = decode;
  next();
};

export default verifyToken;
