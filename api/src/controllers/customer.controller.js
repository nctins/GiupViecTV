import ErrorResponse from "../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import CustomerService from "../services/customer_account.service";

const CustomerController = {}

CustomerController.getAll = async (req, res) => {
  let filter = {};
  let customers = [];

  if(req.body.email){
    filter.email = "%" + req.body.email + "%";
  }else{
    filter.email = "%";
  }

  if(req.body.name){
    filter.name = "%" + req.body.name + "%";
  }else{
    filter.name = "%";
  }

  customers = await CustomerService.getAll(filter);

  if(customers && customers.length == 0){
    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
      data: [],
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: customers,
  });
};

CustomerController.getOneById = async (req,res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = req.params.customer_id;

  if(!customer_id){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Chưa nhập ID!"
    );
  }

  let customer = await CustomerService.getOneById(customer_id);
  
  if(customer){
    if(USER_ROLE.ADMIN === role || auth_info.id === customer_id){
        return res.status(HTTP_STATUS_CODE.OK).json({
            data: customer,
        });
    }else{
        let result = {};
        result.name = customer.name;
        result.address = customer.address;
        result.avatar_url = customer.avatar_url;
        return res.status(HTTP_STATUS_CODE.OK).json({
            data: result,
        });
    }
  }

  return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    data: "Không tìm thấy user!",
  });
};

CustomerController.updateById = async (req,res) => {
    let auth_info = req.auth_info;
    let role = auth_info.role;
    let customer_id = req.params.customer_id;
    let data = {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
    };
    let image = req.body.image;
    let imageUrl;

    if(USER_ROLE.ADMIN !== role && auth_info.id !== customer_id){
        return ErrorResponse(
            res,
            HTTP_STATUS_CODE.FORBIDDEN ,
            "Không có quyền truy cập!"
        );
    }

    let customer = await CustomerService.getOneById(customer_id);
    if(!customer){
      return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
      data: "Id không tồn tại!",
      });
    }

    if(data.password && USER_ROLE.ADMIN !== role){
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        data: "Không có quyền cấp nhập password",
        });
    }

    if(customer.avatar_url && customer.avatar_url.length > 0){
      imageUrl = customer.avatar_url;
    }else{
      imageUrl = "https://reactnative.dev/img/tiny_logo.png";
    }

    if(image){
      const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.upload(image).then(async(result) => {
        if(result.url){
          imageUrl = result.url;
        }else{
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.EXPECTATION_FAILED ,
            "Cập nhật tài khoản không thành công!"
          );
        }
      });
    }
    
    data.avatar_url = imageUrl;
    data.update_user = auth_info.id;
    data.update_date = new Date();
    let result = await CustomerService.updateById(customer_id,data);
    if(result){
        return res.status(HTTP_STATUS_CODE.OK).json({
        data: "Cập nhật tài khoản thành công!",
        });
    }

    return ErrorResponse(
        res,
        HTTP_STATUS_CODE.EXPECTATION_FAILED ,
        "Cập nhật tài khoản không thành công!"
    );
};

CustomerController.updatePassword = async (req,res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = req.params.customer_id;
  let data = {};
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;

  if(USER_ROLE.ADMIN !== role && auth_info.id !== customer_id){
      return ErrorResponse(
          res,
          HTTP_STATUS_CODE.FORBIDDEN ,
          "Không có quyền truy cập!"
      );
  }

  let customer = await CustomerService.getOneById(customer_id);
  if(!customer){
    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    msg: "Id không tồn tại!",
    });
  }

  let check = await CustomerService.checkCurrentPassword(customer,oldPassword);
  if(!check){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Mật khẩu hiện tại không đúng!",
    });
  }

  data.password = newPassword;
  data.update_user = auth_info.id;
  data.update_date = new Date();
  let result = await CustomerService.updateById(customer_id,data);
  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Cập nhật mật khẩu thành công!",
    });
  }

  return ErrorResponse(
      res,
      HTTP_STATUS_CODE.EXPECTATION_FAILED ,
      "Cập nhật mật khẩu không thành công!"
  );
};

export default CustomerController;
