import HelperService from "../../services/helper_account.service";
import HTTP_STATUS_CODE from "../../constants/http_code";
import ErrorResponse from "../../utils/ErrorResponse";

const helperSignup = async (req, res) => {
  let auth_info = req.auth_info;
  let current_date = new Date();
  let email = req.body.email;
  let phone = req.body.phone;
  let name = req.body.name;
  let MSDD = req.body.MSDD;
  let password = req.body.password;
  let avatar_url = "https://reactnative.dev/img/tiny_logo.png";
  let helper;

  helper = await HelperService.findOne(email);

  if (helper) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED ,
      "Tài khoản đã tồn tại!"
    );
  }

  let data = {
    email: email,
    name: name,
    phone: phone,
    MSDD: MSDD,
    password: password,
    avatar_url: avatar_url,
    create_date: current_date,
    update_date: current_date,
  }
  
  let isResult = await HelperService.createHelper(data);
  
  if(!isResult){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED ,
      "Đăng ký không thành công!"
    );
  }

  return res.status(200).json({
    msg: "Đăng ký tài khoản thành công!"
  });
};

export default helperSignup;
