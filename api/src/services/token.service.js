import { Op } from "sequelize";
import db from "../models/index";

const TokensModel = db.tokens;

const TokenService = {};
TokenService.setToken = async (data) => {
  return new Promise(async (resolve, reject)=>{
    try {
      const token = await TokensModel.findOne({ where: { user_id: data.user_id } });
      if (token) {
        await token.update({
          refresh_token: data.refresh_token,
          expo_notifi_token: data.expo_notifi_token,
        });
      } else {
        await TokensModel.create({
          user_id: data.user_id,
          refresh_token: data.refresh_token,
          expo_notifi_token: data.expo_notifi_token,
        })
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

TokenService.getNotificationTokens = async (user_ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokens = await TokensModel.findAll({
        where: {user_id: {
          [Op.in]: user_ids
        }} 
      });
      if (!tokens || tokens.length === 0) {
        resolve([]);
        return;
      }
      const notification_tokens = tokens.map(token=>token.expo_notifi_token)
      resolve(notification_tokens);
    } catch (error) {
      reject(error);
    }
  })
} 

TokenService.verifyRefreshToken = async (user_id, refresh_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await TokensModel.findOne({ where: { user_id: user_id } });
      if (!token) {
        resolve(false);
      } else {
        resolve(token.refresh_token == refresh_token);
      }
    } catch (error) {
      reject(error);
    }
  });
};

TokenService.setOtp = async (data) => {
  return new Promise(async (resolve, reject)=>{
    try {
      const token = await TokensModel.findOne({ where: { user_id: data.user_id } });
      if (token) {
        await token.update({otp: data.otp});
      } else {
        await TokensModel.create({
          user_id: data.user_id,
          otp: data.otp,
        })
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

TokenService.verify = async (where_condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await TokensModel.findOne({ where: where_condition});
      if (!token) {
        resolve(false);
      } 
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export default TokenService;
