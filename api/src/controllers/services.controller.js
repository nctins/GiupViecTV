import { ID_PREFIX, INPUT_FORMAT } from "../constants/db_constants";
import HTTP_STATUS_CODE from "../constants/http_code";
import ServicesService from "../services/services.service";
import USER_ROLE from "../constants/user_role";
import IDGenerator from "../utils/IDGenerator";

const ServicesController = {};

ServicesController.getServices = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let filter = {}
  if(USER_ROLE.ADMIN === role){
    filter.is_active = [1,0];
    filter.is_delete = [1,0];
  }else{
    filter.is_active = [1];
    filter.is_delete = [0];
  }

  const services = await ServicesService.getServices(filter);
  const data = await Promise.all(services);
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: data,
  })
};

ServicesController.getServiceById = async (req, res) => {
  const service_id = req.params.service_id;
  const service = await ServicesService.getServiceById(service_id);
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: service,
  });
};

ServicesController.createService = async (req, res) => {
  const body = req.body;
  const auth_info = req.auth_info;

  const service_id = IDGenerator(ID_PREFIX.SERVICE);
  const current_date = Date();
  const user_id = auth_info.id;

  const service = {
    service_id: service_id,
    service_name: body.service_name,
    service_description: body.service_description,
    service_type: body.service_type,
    input_format: body.input_format,
    create_user: user_id,
    create_date: current_date,
    update_user: user_id,
    update_date: current_date,
    is_active: true,
  };

  let result = await ServicesService.createService(service);
  if(!result){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Tạo service không thành công!"
    );
  }

  let service_detail = {};
  if (body.type_input === "0") {
    // mức độ
    if(Array.isArray(body.lst_value) && body.lst_value.length > 0){
      body.lst_value.map(async(value,index) => {
        service_detail = {
          service_id: service_id,
          seq_nb: index,
          dram: body.dram,
          dram_unit: null,
          unit_price_title: null,
          string_value: value.name,
          multiple_field_title: null,
          unit_price: value.price,
          estimate_time: value.estimate_time,
        }

        let rs = await ServicesService.createServiceDetail(service_detail);
        return rs;
      });
      
      return res.status(HTTP_STATUS_CODE.OK).json({
        data: "Thêm mới dịch vụ thành công",
      });

    }else{
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST ,
        "Tạo service không thành công!"
      );
    }
  }else{
    service_detail = {
      service_id: service_id,
      seq_nb: 0,
      dram: body.dram,
      dram_unit: body.dram_unit,
      unit_price_title: body.unit_price_title,
      string_value: null,
      multiple_field_title: body.multiple_field_title,
      unit_price: body.unit_price,
      estimate_time: body.estimate_time,
    }

    let rs = await ServicesService.createServiceDetail(service_detail);
    if(rs){
      return res.status(HTTP_STATUS_CODE.OK).json({
        data: "Thêm mới dịch vụ thành công",
      })
    }

    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Tạo service không thành công!"
    );
  }

};

ServicesController.setValidService = async (req, res) => {
  const body = req.body;
  const auth_info = req.auth_info;
  const current_date = Date();
  const user_id = auth_info.id;
  let msg = req.body.is_active ? "Mở khóa dịch vụ thành công!" : "Khóa dịch vụ thành công";

  let service_id = req.params.service_id;
  let service = await ServicesService.getServiceById(service_id);

  if(!service){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_ACCEPTABLE ,
      "Service không tồn tại!"
    );
  }

  service = {
    is_active: req.body.is_active,
    update_user: user_id,
    update_date: current_date,
  };
  
  let result = await ServicesService.setValidService(service_id, service);
  if(!result){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Cập nhật service không thành công!"
    );
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: msg,
  })
};

ServicesController.updateService = async (req, res) => {
  const body = req.body;
  const auth_info = req.auth_info;
  const current_date = Date();
  const user_id = auth_info.id;
  let msg = "Cập nhật dịch vụ thành công!";

  let service_id = req.params.service_id;
  let service = await ServicesService.getServiceById(service_id);

  if(!service){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_ACCEPTABLE ,
      "Service không tồn tại!"
    );
  }

  service = {
    service_name: body.service_name,
    service_description: body.service_description,
    service_type: body.service_type,
    input_format: body.input_format,
    update_user: user_id,
    update_date: current_date,
  };

  let lst_service_detail = [];
  if (body.type_input === "0") {
    // mức độ
    if(Array.isArray(body.lst_value) && body.lst_value.length > 0){
      body.lst_value.map(async(value,index) => {

        let service_detail = {
          service_id: service_id,
          seq_nb: index,
          dram: body.dram,
          dram_unit: null,
          unit_price_title: null,
          string_value: value.name,
          multiple_field_title: null,
          unit_price: value.price,
          estimate_time: value.estimate_time,
        }

        lst_service_detail.push(service_detail);
      });
    }
  }else{
    let service_detail = {
      service_id: service_id,
      seq_nb: 0,
      dram: body.dram,
      dram_unit: body.dram_unit,
      unit_price_title: body.unit_price_title,
      string_value: null,
      multiple_field_title: body.multiple_field_title,
      unit_price: body.unit_price,
      estimate_time: body.estimate_time,
    }
    lst_service_detail.push(service_detail);
  }

  let result = await ServicesService.updateService(service_id, service, lst_service_detail);
  // console.log(result);
  if(!result){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Cập nhật service không thành công!"
    );
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: msg,
  })

  // return ServicesService.updateService(service_id, service, lst_service_detail)
  //       .then((value) => {
  //         return res.status(HTTP_STATUS_CODE.OK).json({
  //           msg: msg,
  //         });
  //       })
  //       .catch((error) => {
  //         return ErrorResponse(
  //           res,
  //           HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  //           "có lỗi xảy ra"
  //         );
  //       });

};

export default ServicesController;
