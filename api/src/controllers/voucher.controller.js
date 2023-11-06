import ErrorResponse from "../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import VoucherService from "../services/voucher.service";
import IDGenerator from "../utils/IDGenerator";
import e from "express";
import { VOUCHER_TYPE } from "../constants/db_constants";

const VoucherController = {}

VoucherController.getAll = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let filter = {};
  let vouchers = [];

  if(req.body.voucher_name){
    filter.voucher_name = "%" + req.body.voucher_name + "%";
  }else{
    filter.voucher_name = "%";
  }

  if(req.body.is_delete){
    filter.is_delete = [0,1];
  }else{
    filter.is_delete = [0];
  }
  vouchers = await VoucherService.getAll(filter);
  
  if(vouchers && vouchers.length > 0){
    vouchers = vouchers.map((voucher) => {
      return {
        voucher_id: voucher.voucher_id,
        voucher_name: voucher.voucher_name,
        voucher_url: voucher.voucher_url,
        start_date: voucher.start_date,
        end_date: voucher.end_date,
        voucher_code: voucher.voucher_code,
        quantity: voucher.quantity,
        description: voucher.description,
        is_delete: voucher.is_delete,
      }
    })

    return res.status(HTTP_STATUS_CODE.OK).json({
      data: vouchers,
    });
  }

  return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    data: [],
  });
};

VoucherController.getOne = async (req,res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let voucher;
  let condition = {};
  let id = req.params.voucher_id;

  if(!id){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Cần id để tìm kiếm voucher!"
    );
  }
  
  condition.voucher_id = id;
  if(!(USER_ROLE.ADMIN === role)){
    condition.is_delete = "0";
  };
  voucher = await VoucherService.getOne(condition);

  if(voucher){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: voucher,
    });
  }

  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.BAD_REQUEST ,
    "Không tìm thấy voucher!"
  ); 
};

VoucherController.updateById = async (req,res) => {
  let auth_info = req.auth_info;
  let voucher_id = req.params.voucher_id;
  let voucher = await VoucherService.getOne({voucher_id: voucher_id});
  let image = req.body.image;
  let image_url = "";
  if(!voucher){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_ACCEPTABLE ,
      "Voucher không tồn tại!"
    );
  }
  image_url = voucher.voucher_url;

  if(req.body.voucher_type == VOUCHER_TYPE.DISCOUNT_PERCENT){
    voucher = {
      voucher_name: req.body.voucher_name,
      voucher_type: req.body.voucher_type,
      voucher_description: req.body.voucher_description,
      discount_percent: parseFloat(req.body.discount),
      discount_price: null,
      min_post_price: parseInt(req.body.min_post_price),
      max_discount_price: parseInt(req.body.max_discount_price),
      quantity: parseInt(req.body.quantity),
      payment_method_condition: req.body.payment_method_condition,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      voucher_code: req.body.voucher_code,
      is_delete: req.body.is_delete,
    };
  }else{
    voucher = {
      voucher_name: req.body.voucher_name,
      voucher_type: req.body.voucher_type,
      voucher_description: req.body.voucher_description,
      discount_percent: null,
      discount_price: parseInt(req.body.discount),
      min_post_price: parseInt(req.body.min_post_price),
      max_discount_price: parseInt(req.body.max_discount_price),
      quantity: parseInt(req.body.quantity),
      payment_method_condition: req.body.payment_method_condition,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      voucher_code: req.body.voucher_code,
      is_delete: req.body.is_delete,
    };
  }

  if(image){
    const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.upload(image).then(async(result) => {
        console.log(result);
        if(result.url){
          image_url = result.url;
        }else{
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.EXPECTATION_FAILED ,
            "Cập nhật tài khoản không thành công!"
          );
        }
      });
  }
  
  voucher.voucher_url = image_url;
  voucher.update_user = auth_info.id;
  voucher.update_date = new Date();
  let result = await VoucherService.updateById(voucher_id,voucher);
  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Cập nhật voucher thành công!",
    });
  }
  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.EXPECTATION_FAILED ,
    "Cập nhật voucher không thành công!"
  );
};

VoucherController.create = async (req,res) => {
  let auth_info = req.auth_info;
  let voucher_id = IDGenerator("VOU_");
  let voucher;
  let curDate = new Date();
  let image_url = "";
  let image = req.body.image;
  let voucher_code = req.body.voucher_code;

  if(!voucher_code){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.EXPECTATION_FAILED ,
      "Chưa nhập voucher_code!"
    );
  }

  voucher = await VoucherService.getOne({voucher_code: voucher_code});
  if(voucher){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.EXPECTATION_FAILED ,
      "mã voucher đã tồn tại!"
    );
  }

  if(req.body.voucher_type == VOUCHER_TYPE.DISCOUNT_PERCENT){
    voucher = {
      voucher_id: voucher_id,
      voucher_name: req.body.voucher_name,
      voucher_type: VOUCHER_TYPE.DISCOUNT_PERCENT,
      voucher_description: req.body.voucher_description,
      discount_percent: parseFloat(req.body.discount),
      discount_price: null,
      min_post_price: parseInt(req.body.min_post_price),
      max_discount_price: parseInt(req.body.max_discount_price),
      quantity: parseInt(req.body.quantity),
      payment_method_condition: req.body.payment_method_condition,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      voucher_code: voucher_code,
    };
  }else{
    voucher = {
      voucher_id: voucher_id,
      voucher_name: req.body.voucher_name,
      voucher_type: VOUCHER_TYPE.DISCOUNT_PRICE,
      voucher_description: req.body.voucher_description,
      discount_percent: null,
      discount_price: parseInt(req.body.discount),
      min_post_price: parseInt(req.body.min_post_price),
      max_discount_price: parseInt(req.body.max_discount_price),
      quantity: parseInt(req.body.quantity),
      payment_method_condition: req.body.payment_method_condition,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      voucher_code: voucher_code,
    };
  }
  

  if(image){
    const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.upload(image).then(async(result) => {
        console.log(result);
        if(result.url){
          image_url = result.url;
        }else{
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.EXPECTATION_FAILED ,
            "Cập nhật tài khoản không thành công!"
          );
        }
      });
  }
  
  voucher.voucher_url = image_url;
  voucher.create_user = auth_info.id;
  voucher.create_date = curDate;
  voucher.update_user = auth_info.id;
  voucher.update_date = curDate;
  voucher.is_delete = false;

  let result = await VoucherService.create(voucher);
  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Tạo mới voucher thành công!",
    });
  }
  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.EXPECTATION_FAILED ,
    "Tạo mới voucher không thành công!"
  );
};

VoucherController.getAllByCustomerId = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = req.params.customer_id;
  let filter = {};
  let vouchers = [];

  if(USER_ROLE.ADMIN !== role && auth_info.id !== customer_id){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN ,
      "Không có quyền truy cập!"
    );
  }

  if(USER_ROLE.ADMIN === role){
    filter.is_used = [1,0];
  }else{
    filter.is_used = [0];
  }

  vouchers = await VoucherService.getAllbyCustomerId(customer_id,filter);
  
  if(vouchers && vouchers.length > 0){
    var vouchersResult = vouchers.map(async (e) => {
      let voucher = await VoucherService.getOne({voucher_id: e.voucher_id});
      return {
        voucher_id: e.voucher_id,
        voucher_name: voucher.voucher_name,
        voucher_type: voucher.voucher_type,
        voucher_url: voucher.voucher_url,
        voucher_description: voucher.voucher_description,
        discount_percent: voucher.discount_percent,
        discount_price: voucher.discount_price,
        min_post_price: voucher.min_post_price,
        max_discount_price: voucher.max_discount_price,
        quantity: voucher.quantity,
        payment_method_condition: voucher.payment_method_condition,
        start_date: voucher.start_date,
        end_date: voucher.end_date
      };
    });
    vouchersResult = await Promise.all(vouchersResult);
    
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: vouchersResult,
    });
  }

  return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    data: [],
  });
};

VoucherController.getVoucherByCustomer = async (req,res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = auth_info.id;
  let voucher;
  let voucherOfCustonmer = {};
  let code = req.params.voucher_code;
  let currentDate = new Date();

  if(!code){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Cần nhập mã code để lấy voucher!"
    );
  }

  voucher = await VoucherService.getOneWithVoucherCode(code,currentDate);

  if(!voucher){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_ACCEPTABLE ,
      "Mã voucher không đúng!"
    );
  }

  let isVoucherOfCustomer = await VoucherService.getVoucherOfCustomer(voucher.voucher_id, customer_id);
  if(isVoucherOfCustomer){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_ACCEPTABLE ,
      "Bạn đã lấy voucher rồi!"
    );
  }

  if(voucher.quantity > 0){
    // voucher.quantity =  (parseInt(voucher.quantity) - 1).toString();
    let updateVoucher = {
      quantity : (parseInt(voucher.quantity) - 1).toString()
    }
    await VoucherService.updateById(voucher.voucher_id,updateVoucher);
  }else{
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_ACCEPTABLE ,
      "Voucher đã hết!"
    );
  }

  voucherOfCustonmer.voucher_id = voucher.voucher_id;
  voucherOfCustonmer.customer_id = customer_id;
  voucherOfCustonmer.is_used = false;
  voucherOfCustonmer.create_user = customer_id;
  voucherOfCustonmer.create_date = currentDate;
  voucherOfCustonmer.update_user = customer_id;
  voucherOfCustonmer.update_date = currentDate;

  let result = await VoucherService.addVoucherToCustomer(voucherOfCustonmer);

  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Đã lấy voucher thành công!",
    });
  }

  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.NOT_ACCEPTABLE ,
    "Không tìm thấy voucher!"
  );
};

export default VoucherController;
