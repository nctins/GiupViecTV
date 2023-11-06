import { Op } from "sequelize";
import USER_ROLE from "../constants/user_role";
import db from "../models";

const MessagesModel = db.messages;
const BoxChatModel = db.box_chat;
const MessagesService = {};

MessagesService.insertMessage = (message_obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      await MessagesModel.create(message_obj);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

MessagesService.getMessages = (box_chat_id, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let messages = await MessagesModel.findAll({
        order: [["date_time", "asc"]],
        where: {
          box_chat_id: box_chat_id,
        },
      });
      if (!messages || messages.length == 0) {
        resolve([]);
      }
      const result = messages.map((message) => {
        return {
          msg: message.content,
          date_time: message.date_time,
          is_view: message.is_view,
          from_user_id: message.from_user_id
        };
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

MessagesService.setViewAll = (box_chat_id, user_id) => {
  return new Promise(async(resolve, reject)=>{
    try {
      const where_condition = {box_chat_id: box_chat_id, from_user_id: {[Op.ne]: user_id}};
      const message = await MessagesModel.update({is_view: true},{where: where_condition});
      if (!message) {
        resolve(false);
        return;
      }
      resolve(true)
    } catch (error) {
      reject(error);
    }
  }) 
}

MessagesService.countUnread = (user_id, role) => {
  return new Promise(async(resolve, reject)=>{
    try {
      const boxchat_condition = role === USER_ROLE.CUSTOMER ? {customer_id: user_id} : {helper_id: user_id};
      // get all message to user id
      const counter = await BoxChatModel.findAndCountAll({
        include:[{
          model: MessagesModel, 
          as: "messages", 
          where:{
            is_view: false, 
            from_user_id: {
              [Op.ne]: user_id, // get message is not from user_id
            } 
          }
        }], 
        where: boxchat_condition, // get all box chat include user_id
      })
      resolve(counter.count);
    } catch (error) {
      reject(error);
    }
  })
}

export default MessagesService;
