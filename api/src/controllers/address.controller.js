import ErrorResponse from "../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import CustomerService from "../services/customer_account.service";
import AddressService from "../services/address.service";
import IDGenerator from "../utils/IDGenerator";

const AddressController = {};

AddressController.getAllByCustomerId = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = req.params.customer_id;
  let filter = {};

  if (USER_ROLE.ADMIN !== role && auth_info.id !== customer_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN,
      "Không có quyền truy cập!"
    );
  }

  if (req.body.address) {
    filter.address = "%" + req.body.address + "%";
  } else {
    filter.address = "%";
  }

  if (req.body.address_title) {
    filter.address_title = "%" + req.body.address_title + "%";
  } else {
    filter.address_title = "%";
  }

  let addresses = await AddressService.getAllByCustomerId(customer_id, filter);

  if (addresses && addresses.length > 0) {
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: addresses,
    });
  }

  return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    data: [],
  });
};

AddressController.create = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = req.params.customer_id;
  let data = req.body;
  let curDate = new Date();
  let result;

  if (USER_ROLE.ADMIN !== role && auth_info.id !== customer_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN,
      "Không có quyền truy cập!"
    );
  }

  data = {
    address_title: req.body.address_title,
    address: req.body.address,
    place_id: req.body.place_id,
    customer_id: customer_id,
    customer_address_id: IDGenerator("CUA_"),
    create_user: auth_info.id,
    create_date: curDate,
    update_user: auth_info.id,
    update_date: curDate,
    is_delete: false,
  }

  result = await AddressService.create(data);
  if (result) {
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: {
        msg: "Tạo mới địa chỉ thành công!",
        address: {
          customer_address_id: data.customer_address_id,
          address_title: data.address_title,
          address: data.address,
        },
      },
    });
  }

  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.EXPECTATION_FAILED,
    "Tạo mới địa chỉ không thành công!"
  );
};

AddressController.getOneById = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = req.params.customer_id;
  let customer_address_id = req.params.customer_address_id;
  let address;

  if (!customer_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Không có id customer!"
    );
  }

  if (!customer_address_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Không có id address!"
    );
  }
  if (USER_ROLE.ADMIN !== role && auth_info.id !== customer_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN,
      "Không có quyền truy cập!"
    );
  }

  address = await AddressService.getOneById(customer_address_id);

  if (address && address.customer_id !== auth_info.id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN,
      "Không có quyền truy cập!"
    );
  }

  if (address) {
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: address,
    });
  }

  return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    data: "Không tìm thấy address!",
  });
};

AddressController.updateById = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let customer_id = req.params.customer_id;
  let customer_address_id = req.params.customer_address_id;
  let address;
  let data = req.body;

  if (USER_ROLE.ADMIN !== role && auth_info.id !== customer_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN,
      "Không có quyền truy cập!"
    );
  }

  if (!customer_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Không có id customer!"
    );
  }

  if (!customer_address_id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Không có id address!"
    );
  }

  address = await AddressService.getOneById(customer_address_id);
  if (!address) {
    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
      data: "Id không tồn tại!",
    });
  }
  if (address.customer_id !== auth_info.id) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN,
      "Không có quyền truy cập!"
    );
  }

  data.update_user = auth_info.id;
  data.update_date = new Date();
  let result = await AddressService.updateById(customer_address_id, data);
  if (result) {
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Cập nhật địa chỉ thành công!",
    });
  }

  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.EXPECTATION_FAILED,
    "Cập nhật địa chỉ không thành công!"
  );
};

export default AddressController;
