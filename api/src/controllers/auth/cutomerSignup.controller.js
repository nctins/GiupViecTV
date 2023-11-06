import CustomerService from "../../services/customer_account.service";
import HTTP_STATUS_CODE from "../../constants/http_code";
import ErrorResponse from "../../utils/ErrorResponse";

const customerSignup = async (req, res) => {
  let auth_info = req.auth_info;
  let current_date = new Date();
  let email = req.body.email;
  let phone = req.body.phone;
  let name = req.body.name;
  let password = req.body.password;
  let avatar_url = "https://reactnative.dev/img/tiny_logo.png";

  let customer = await CustomerService.findOne(email);

  if (customer) {
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
    password: password,
    avatar_url: avatar_url,
    create_date: current_date,
    update_date: current_date,
  }
  
  let isResult = await CustomerService.createCustomer(data);
  
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

export default customerSignup;
