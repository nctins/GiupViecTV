import { Result } from "express-validator";
import HTTP_STATUS_CODE from "../constants/http_code";
import SOCKET_ACT from "../constants/socket_action";
import USER_ROLE from "../constants/user_role";
import BoxChatService from "../services/box_chat.service";
import MessagesService from "../services/message.service";

const BoxChatController = {};

/**
 * get messages of box chat
 */
BoxChatController.getMessages = async (req, res) => {
  const box_chat_id = req.params.box_chat_id;
  const user_id = req.auth_info.id;
  const messages = await MessagesService.getMessages(box_chat_id, user_id);
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: messages,
  });
};

/**
 * get list box_chat_id of user
 */
BoxChatController.getBoxChats = async (req, res) => {
  const auth_info = req.auth_info;
  const body = req.body;

  const role = auth_info.role;
  const user_id = auth_info.id;

  let box_chats = [];
  if (USER_ROLE.CUSTOMER == role) {
    box_chats = await BoxChatService.getCustomerBoxChats(user_id);
  } else {
    box_chats = await BoxChatService.getHelperBoxChats(user_id);
  }

  if (box_chats.length == 0) {
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: [],
    });
  }
  const data = await Promise.all(box_chats);
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: data,
  });
};

/**
 * create message to box chat and emit to client
 */
BoxChatController.postMessage = async (req, res) => {
  const auth_info = req.auth_info;
  const body = req.body;

  const user_id = auth_info.id;
  const to_user_id = body.to_user_id;
  const box_chat_id = req.params.box_chat_id;
  const message = body.message;
  const current_date = Date();

  const message_obj = {
    box_chat_id: box_chat_id,
    from_user_id: user_id,
    date_time: current_date,
    content: message,
    is_view: false,
    create_user: user_id,
    create_date: current_date,
    update_user: user_id,
    update_date: current_date,
  };

  await MessagesService.insertMessage(message_obj);
  const socket_payload = {
    box_chat_id,
    msg: {
      msg: message,
      date_time: current_date,
      is_view: false,
      from_user_id: user_id,
      to_user_id: to_user_id,
    }
  };
  _socketio.emit(SOCKET_ACT.NEW_MESSAGE, socket_payload);
  _socketio.emit(SOCKET_ACT.NEW_MESSAGE_ON_LIST_ITEM, socket_payload);
  _socketio.emit(SOCKET_ACT.NEW_MESSAGE_ON_MESSAGE_DETAIL, socket_payload);

  return res.status(HTTP_STATUS_CODE.OK).json({
    isSuccess: true,
    msg: "Send message success!",
  });
};

BoxChatController.getBoxChatId = async (req, res) => {
  const role = req.auth_info.role;
  let search_data = {};
  if (role == USER_ROLE.CUSTOMER) {
    search_data = {
      user_role: role,
      customer_id: req.auth_info.id,
      helper_id: req.query.helper_id,
    };
  } else {
    // role == helper
    search_data = {
      user_role: role,
      customer_id: req.query.customer_id,
      helper_id: req.auth_info.id,
    };
  };

  return BoxChatService.getBoxChatId(search_data)
    .then(({box_chat_id, num_unread_message}) => {
      res.status(HTTP_STATUS_CODE.OK).json({ box_chat_id, num_unread_message });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ msg: "có lỗi xảy ra" });
    });
};

BoxChatController.setViewAll = async (req, res) => {
  const user_id = req.auth_info.id;
  const box_chat_id = req.params.box_chat_id;
  return MessagesService.setViewAll(box_chat_id, user_id)
    .then((val)=>{
      return res.status(HTTP_STATUS_CODE.OK).json({success: val});
    })
    .catch((err)=>{
      console.log(err);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: "có lỗi xảy ra" });
    })
}

BoxChatController.countUnreadMessage = async (req, res) => {
  const user_id = req.auth_info.id;
  const role = req.auth_info.role;
  return MessagesService.countUnread(user_id, role)
    .then((val)=>{
      return res.status(HTTP_STATUS_CODE.OK).json({total_unread_message: val});
    })
    .catch((err)=>{
      console.log(err);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: "có lỗi xảy ra" });
    })
}

export default BoxChatController;
