import db from "../models/index";
const { Op } = require("sequelize");

const feedbackModel = db.feedbacks;
const FeedbackService = {};

FeedbackService.create = (feedback) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await feedbackModel.create(feedback);
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

FeedbackService.getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let feedbacks = await feedbackModel.findAll({
        order:[
          ['create_date','DESC'],
        ]
      });
      if (feedbacks) {
        resolve(feedbacks);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

FeedbackService.getOne = (feedback_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let feedback = await feedbackModel.findOne({
        where: { feedback_id: feedback_id },
      });
      if (feedback) {
        resolve(feedback);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

export default FeedbackService;
