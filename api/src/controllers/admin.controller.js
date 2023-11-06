import ErrorResponse from "../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import CustomerService from "../services/customer_account.service";
import HelperService from "../services/helper_account.service";
import PostsService from "../services/posts.service";
import { ICON_CODE, NOTIFICATION_MODULE, PAYMENT_METHOD, POST_STATE, POST_TYPE } from "../constants/db_constants";
import HelperIncomeService from "../services/helper_income.service";
import SystemControlService from "../services/system_control.service";
import { DateObj2String } from "../utils/Dateformater";
import IDGenerator from "../utils/IDGenerator";
import NotificationService from "../services/notification.service";
import Message from "../utils/Message";
import { pushNotification } from "../utils/UtilsNotifications";

const AdminController = {}

AdminController.getAll = async (req, res) => {
  let filter = {};
  let customers = [];
  let helpers = [];
  let user = [];
  let email = req.body.email;
  let name = req.body.name;

  if(email && email.length > 0){
    filter.email = "%" + email + "%";
  }else{
    filter.email = "%";
  }

  if(name && name.length > 0){
    filter.name = "%" + name + "%";
  }else{
    filter.name = "%";
  }

  customers = await CustomerService.getAll(filter);
  if(customers.length > 0){
    customers = customers.map(async (customer) => {
        return {
            user_id: customer.customer_id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: "",
            common: "",
            role: USER_ROLE.CUSTOMER,
            avatar_url: customer.avatar_url,
            is_active: customer.is_active,
        };
    })
    customers = await Promise.all(customers);
  }
  helpers = await HelperService.getAll(filter);
  if(helpers.length > 0){
    helpers = helpers.map((helper) => {
        return {
            user_id: helper.helper_id,
            name: helper.name,
            email: helper.email,
            phone: helper.phone,
            address: helper.address,
            common: helper.MSDD,
            role: USER_ROLE.HELPER,
            avatar_url: helper.avatar_url,
            is_active: helper.is_active,
        };
    })
    helpers = await Promise.all(helpers);
  }
  user = helpers.concat(customers);

  if(user.length == 0){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: [],
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: user,
  });
};

AdminController.updateById = async (req,res) => {
    let auth_info = req.auth_info;
    let user_id = req.params.user_id;
    let role = req.body.role;
    let data = {
      is_active: req.body.is_active,
      update_user: auth_info.id,
      update_date: new Date(),
    };
    let message = req.body.is_active === true ? "Mở khóa tài khoản thành công" : "Khóa tài khoản thành công";

    if(role === USER_ROLE.CUSTOMER){
        let customer = await CustomerService.getOneById(user_id);
        if(!customer){
        return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
            data: "User không tồn tại!",
            });
        }

        let result = await CustomerService.updateById(user_id,data);
        if(result){
            return res.status(HTTP_STATUS_CODE.OK).json({
            data: message,
            });
        }

    }else{
        let helper = await HelperService.getOneById(user_id);
        if(!helper){
        return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
            data: "User không tồn tại!",
            });
        }

        let result = await HelperService.updateById(user_id,data);
        if(result){
            return res.status(HTTP_STATUS_CODE.OK).json({
            data: message,
            });
        }
    }

    return ErrorResponse(
        res,
        HTTP_STATUS_CODE.EXPECTATION_FAILED ,
        "Cập nhật tài khoản không thành công!"
    );
};

const getStringDate = (date) => {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
} 

AdminController.calculatePriceHelper = async (req,res) => {
  let auth_info = req.auth_info;
  let helper_email = req.body.email;
  let data = {};
  let filter = {};
  let current_date = new Date();
  current_date.setDate(current_date.getDate() - 1);
  current_date.setHours(23);

  let helper = await HelperService.getOneByEmail(helper_email);
  if(!helper){
    return ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST ,
        "User không tồn tại!"
    );
  }

  let helper_income = await HelperIncomeService.getAllHistoryOfHelper(helper.helper_id);
  let history_with_current_date = await HelperIncomeService.getHistoryWithCurrentDate(helper.helper_id, current_date);
  if(history_with_current_date){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Bạn đã kết toán tiền cho đến ngày " + getStringDate(history_with_current_date.end_date)
    ); 
  }

  let last_history_income;
  if(helper_income && helper_income.length > 0){
    let temp = new Date(helper_income[0].end_date);
    temp.setDate(temp.getDate() + 1);
    temp.setHours(0);
    last_history_income = temp;
  }else{
    last_history_income = new Date (helper.create_date);
  }

  if(last_history_income.getTime() > current_date.getTime()){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Bạn đã kết toán tiền cho đến ngày " + getStringDate(last_history_income)
    ); 
  }

  filter = {
    helper_id: helper.helper_id,
    startDate: last_history_income,
    endDate: current_date,
  }
  let posts = await PostsService.getPostsByHelperFilterDate(filter);
  if(!posts){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Không có lịch hẹn nào kể từ " + getStringDate(last_history_income)  + " đến ngày " + getStringDate(current_date)
    );
  }

  if(Array.isArray(posts) && posts.length > 0){
    let lst_cart_vnpay = [];
    let lst_cart = [];

    posts = posts.filter((post) => {return post.post_state == POST_STATE.COMPLETE});
    if(posts.length === 0){
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST ,
        "Không có lịch hẹn nào kể từ " + getStringDate(last_history_income) + " đến ngày " + getStringDate(current_date)
      );
    }

    posts = posts.map((post) => {
      return {
        post_id: post.post_id,
        address: post.address,
        date: post.date,
        time: post.time,
        total: post.total,
        voucher_id: post.voucher_id,
        coupon_price: post.coupon_price,
        post_state: post.post_state,
        post_type: post.post_type,
        payment_method: post.payment_method,
        reason_cancel: post.reason_cancel,
        customer_name: post.customer_name,
      }
    });

    let cur_helper_income = {
      helper_id: helper.helper_id,
      start_date: last_history_income,
      end_date: current_date,
      total_price: null,
      receive_price: null,
      enterprise_price: null,
      isPayment: false,
      lst_cart_vnpay: [],
      lst_cart: [],
    }

    lst_cart = posts.filter((post) => {return post.payment_method == PAYMENT_METHOD.COD});
    lst_cart_vnpay = posts.filter((post) => {return post.payment_method == PAYMENT_METHOD.VNPAY});

    cur_helper_income.lst_cart = lst_cart;
    cur_helper_income.lst_cart_vnpay = lst_cart_vnpay;

    return res.status(HTTP_STATUS_CODE.OK).json({
      data: cur_helper_income,
      helper: {
        helper_id: helper.helper_id,
        email: helper.email,
        name: helper.name,
      }
    });

  }else{
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Không có lịch hẹn nào kể từ " + getStringDate(last_history_income) + " đến ngày " + getStringDate(current_date)
    );
  }
};

AdminController.confirmPaymentHelper = async (req,res) => {
  let auth_info = req.auth_info;
  let helper_id = req.body.helper_id;
  let end_date = new Date(req.body.end_date);

  let data = {
    helper_id: helper_id,
    start_date: new Date(req.body.start_date),
    end_date: end_date,
    total_price: req.body.total_price,
    receive_price: req.body.receive_price,
    enterprise_price: req.body.enterprise_price,
  }

  let history_with_current_date = await HelperIncomeService.getHistoryWithCurrentDate(helper_id, end_date);
  if(history_with_current_date && history_with_current_date.length > 0){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Bạn đã kết toán tiền cho đến ngày " + getStringDate(history_with_current_date.end_date)
    ); 
  }

  let result = await HelperIncomeService.createIncomeOfHelper(data);
  if(!result){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Đã có lỗi xảy ra trong quá trình kết toán, vui lòng liên hệ quản trị viên để biết thêm thông tin chi tiết!"
    );
  }
  
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: "Xác nhận kết toán tiền thành công!",
  });

};

AdminController.getAllSystemControl = async (req,res) => {
  let auth_info = req.auth_info;

  let result = await SystemControlService.getAll();
  if(!result){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên để biết thêm thông tin chi tiết!"
    );
  }
  
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: result,
  });
};

AdminController.getSystemControlByName = async (req,res) => {
  let auth_info = req.auth_info;
  let name = req.params.name;

  let result = await SystemControlService.getByName(name);
  if(!result){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên để biết thêm thông tin chi tiết!"
    );
  }
  
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: result,
  });
};

AdminController.updateSystemControl = async (req,res) => {
  let auth_info = req.auth_info;
  let lst_system_control = req.body.data;

  if(Array.isArray(lst_system_control) && lst_system_control.length > 0){
    lst_system_control.map( async (ele) => {
      let result = await SystemControlService.updateValue(ele.name, ele.value);
      return result;
    });
  }
  
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: "Cập nhật thành công!",
  });
};

AdminController.createSystemControl = async (req,res) => {
  let auth_info = req.auth_info;
  let data = req.body.data;

  let result = await SystemControlService.create(data);

  if(!result){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên để biết thêm thông tin chi tiết!"
    );
  }
  
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: "Thêm mới thành công!",
  });
};

AdminController.alertHaveAppointmentPrepareStart = async (req,res) => {
  let auth_info = req.auth_info;
  let RANGE_SECOND_FROM = 0; // 0 minus
  let RANGE_SECOND_TO = 60 * 60; // 30 minus
  let current_date_time = new Date();
  let [curent_hours, curent_minus] = [current_date_time.getHours(),current_date_time.getMinutes()];
  let current_date = new Date(DateObj2String(current_date_time));
  // let current_date = new Date("2023-05-02");

  let posts = await PostsService.getPostIncompleteInDate(current_date);

  if(!posts){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Không có lịch hẹn nào trong ngày!",
    });
  }

  posts.map(async(post) => {
    let post_time = getSecondTime(post.time);
    let curent_time = curent_hours * 3600 + curent_minus * 60;
    let range_time = post_time - curent_time;

    if(range_time > RANGE_SECOND_FROM && range_time <= RANGE_SECOND_TO){
      const customer_id = post.customer_id;
      const helper_id = post.helper_id;

      // notification to customer
      const customer_msg = Message.orderPrepareStart(post.post_id, (range_time)) // customer complete post
      const customer_notification = {
        icon_code: ICON_CODE.ORDER,
        title: customer_msg.title,
        content: customer_msg.content,
        notification_module: NOTIFICATION_MODULE.POST, 
        module_object_id: post.post_id,
        create_user: IDGenerator("ADMIN_"),
        update_user: IDGenerator("ADMIN_"),
        create_date: current_date_time,
        update_date: current_date_time
      }
      await NotificationService.createNotification(customer_id, customer_notification);
      
      //  notification to helper
      const helper_msg = Message.orderPrepareStart(post.post_id, (range_time));// helper complete post
      const helper_notification = {
        icon_code: ICON_CODE.ORDER,
        title: helper_msg.title,
        content: helper_msg.content,
        notification_module: NOTIFICATION_MODULE.POST,
        module_object_id: post.post_id,
        create_user: IDGenerator("ADMIN_"),
        update_user: IDGenerator("ADMIN_"),
        create_date: current_date_time,
        update_date: current_date_time
      }
      await NotificationService.createNotification(helper_id, helper_notification);

      _socketio.emit(SOCKET_ACT.NEW_NOTIFICATION, {user_ids: [customer_id, helper_id]});
      await pushNotification(helper_notification, [helper_id]);
      await pushNotification(customer_notification, [customer_id]);
    }

  })
  
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: "Thông báo thành công!",
  });
};

const getTime = (time) => {
  let hours = time ? parseInt(time.substring(0,2)) : 0;
  let minus = time ? parseInt(time.substring(3,5)) : 0;
  return [hours,minus]
}

const getSecondTime = (time) => {
  let hours = time ? parseInt(time.substring(0,2)) : 0;
  let minus = time ? parseInt(time.substring(3,5)) : 0;
  return (hours * 3600) + (minus * 60);
}

export default AdminController;
