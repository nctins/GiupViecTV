import { ID_PREFIX } from "../constants/db_constants";
import USER_ROLE from "../constants/user_role";
import db from "../models";
import IDGenerator from "../utils/IDGenerator";

const BoxChatModel = db.box_chat;
const BoxChatService = {};

BoxChatService.getCustomerBoxChats = (customer_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let boxchats = await BoxChatModel.findAll({
        where: { customer_id: customer_id },
      });
      if (!boxchats || boxchats.length == 0) {
        resolve([]);
      }
      const result = boxchats.map(async (ele) => {
        const boxchat = ele.get({ plain: true });
        const messages = await ele.getMessages({
          order: [["create_date", "DESC"]],
        });
        let last_msg = messages[0];
        if (!last_msg) {
          last_msg = {
            content: "",
            date_time: "",
            is_view: true,
            from_user_id: "",
          }
        }
        const helper = await ele.getHelper();

        let num_unread_message = messages.filter((msg)=>{
          return !msg.is_view && msg.from_user_id == helper.helper_id
        }).length;

        return {
          sender: helper.name,
          sender_id: helper.helper_id,
          avatar_url: helper.avatar_url, 
          box_chat_id: boxchat.box_chat_id,
          last_msg: last_msg.content,
          date_time: last_msg.date_time,
          is_view: last_msg.is_view,
          from_user_id: last_msg.from_user_id,
          num_unread_message: num_unread_message,
        };
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

BoxChatService.getHelperBoxChats = (helper_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let boxchats = await BoxChatModel.findAll({
        where: { helper_id: helper_id },
      });
      if (!boxchats || boxchats.length == 0) {
        resolve([]);
      }
      const result = boxchats.map(async (boxchat) => {
        const messages = await boxchat.getMessages({
          order: [["create_date", "DESC"]],
        });
        let last_msg = messages[0];
        if (!last_msg) {
          last_msg = {
            content: "",
            date_time: "",
            is_view: true,
            from_user_id: "",
          }
        }
        const customer = await boxchat.getCustomer();

        let num_unread_message = messages.filter((msg)=>{
          return !msg.is_view && msg.from_user_id == customer.customer_id
        }).length;

        return {
          sender: customer.name,
          sender_id: customer.customer_id,
          avatar_url: customer.avatar_url, 
          box_chat_id: boxchat.box_chat_id,
          last_msg: last_msg.content,
          date_time: last_msg.date_time,
          is_view: last_msg.is_view,
          from_user_id: last_msg.from_user_id,
          num_unread_message: num_unread_message,
        };
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

BoxChatService.getBoxChatId = ({customer_id, helper_id, user_role}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const box_chat = await BoxChatModel.findOne({where: {customer_id, helper_id}});
      if (!box_chat) {
        // create box-chat if haven't
        const box_chat_id = IDGenerator(ID_PREFIX.BOX_CHAT);
        await BoxChatModel.create({customer_id, helper_id, box_chat_id});
        resolve({box_chat_id: box_chat_id, num_unread_message: 0});
      }
      // count unread message 
      let num_unread_message = 0;
      let message_condition = {};

      if (user_role == USER_ROLE.CUSTOMER) {
        // count message from helper if user is customer
        message_condition = {
          from_user_id: helper_id,
          is_view: false,
        }
      }
      if (user_role == USER_ROLE.HELPER) {
        // count message from customer if user is helper
        message_condition = {
          from_user_id: customer_id,
          is_view: false,
        }
      }
      const messages = await box_chat.getMessages(message_condition);
      num_unread_message = messages.length;
      resolve({box_chat_id: box_chat.box_chat_id, num_unread_message: num_unread_message});
    } catch (error) {
      reject(error);
    }
  });
}

export default BoxChatService;
