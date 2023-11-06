import { NOTIFICATION_MODULE } from "../constants/db_constants";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import NotificationService from "../services/notification.service";
import ErrorResponse from "../utils/ErrorResponse";

const NotificationController = {};

NotificationController.getNotification = async (req, res) => {
  const role = req.auth_info.role;
  const user_id = req.auth_info.id;
  let where_condition = {};
  switch (role) {
    case USER_ROLE.ADMIN:
      where_condition = { create_user: user_id };
      break;

    // default is customer or helper
    default:
      where_condition = { user_id: user_id };
      break;
  }

  return NotificationService.getNotification(where_condition)
    .then((data) => {
      return res.status(HTTP_STATUS_CODE.OK).json({ data: data });
    })
    .catch((err) => {
      console.log(err);
      ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Có lỗi xảy ra"
      );
    });
};

NotificationController.createNotification = async (req, res) => {
  const role = req.auth_info.role;
  const user_id = req.auth_info.id;
  const lstUser = req.body.lst_user;
  const current_date = new Date();
  const data = {
    icon_code: req.body.icon_code,
    title: req.body.title,
    content: req.body.content,
    notification_module: req.body.notification_module ? req.body.notification_module : NOTIFICATION_MODULE.NONE,
    module_object_id: req.body.module_object_id ? req.body.module_object_id : null,
    create_user: user_id,
    create_date: current_date,
    update_user: user_id,
    update_date: current_date,
  }

  const result = await NotificationService.createNotifications(lstUser,data)
  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({ data: "Tạo thông báo thành công!" });
  }
  
  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    "Tạo thông báo không thành công"
  );
};

NotificationController.updateNotification = async (req, res) => {
  const body = req.body;
  const notification_id = body.notification_id;
  const is_view = body.is_view;
  const current_date = new Date();
  const user_id = req.auth_info.id;
  // console.log("object");

  const update_data = {
    notification_id: notification_id,
    is_view: is_view,
    update_date: current_date,
    update_user: user_id,
  }

  const result = await NotificationService.updateNotification(update_data);
  console.log(result);
  if (!result) {
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Có lỗi xảy ra vui lòng thử lại"
    );
  }
  return res.status(HTTP_STATUS_CODE.OK).json({data: "Đã cập nhật thông báo thành công."});

}

NotificationController.setViewAll = async (req, res) => {
  const user_id = req.auth_info.id;
  return NotificationService
    .setViewAll({user_id})
    .then((val)=>{
      return res.status(HTTP_STATUS_CODE.OK).json({data: "Đã cập nhật thông báo thành công."});
    })
    .catch((err)=>{
      console.log(err);
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Có lỗi xảy ra vui lòng thử lại"
      );
    })
}

NotificationController.countUnreadNotification = (req, res) => {
  const role = req.auth_info.role;
  const user_id = req.auth_info.id;
  let where_condition = {};
  switch (role) {
    case USER_ROLE.ADMIN:
      where_condition = { create_user: user_id };
      break;

    // default is customer or helper
    default:
      where_condition = { user_id: user_id };
      break;
  }
  return NotificationService.countUnread(where_condition)
    .then((val)=>{
      return res.status(HTTP_STATUS_CODE.OK).json({
        num_unread_notification: val,
      })
    })
    .catch((err)=>{
      console.log(err);
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Có lỗi xảy ra vui lòng thử lại"
      );
    })
}

export default NotificationController;
