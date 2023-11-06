import HTTP_STATUS_CODE from "../constants/http_code";
import ErrorResponse from "../utils/ErrorResponse";

const permission = (range) => {
  if (!range) {
    range = [];
  }
  return (req, res, next) => {
    const auth_info = req.auth_info;
    const role = auth_info.role;
    if (range.indexOf(role) == -1) {
      return ErrorResponse(res, HTTP_STATUS_CODE.FORBIDDEN);
    }
    next();
  };
};

export default permission;
