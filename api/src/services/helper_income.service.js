import db from "../models/index";
import Password from "../utils/Password";
import IDGenerator from "../utils/IDGenerator";
const { Op } = require("sequelize");

const HelperIncomeModel = db.helper_income;
const HelperIncomeService = {};

HelperIncomeService.createIncomeOfHelper = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await HelperIncomeModel.create(data);
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperIncomeService.getAllHistoryOfHelper = (helper_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await HelperIncomeModel.findAll({
        where: { helper_id: helper_id },
        order: [["start_date","DESC"]],
      });
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperIncomeService.getHistoryWithCurrentDate = (helper_id, current_date) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await HelperIncomeModel.findOne({
            where: { 
                helper_id: helper_id,
                start_date: {
                    [Op.lte] : current_date
                },
                end_date: {
                    [Op.gte] : current_date
                },
            },
        });
        if (result) {
          resolve(result);
        }
        resolve(false);
      } catch (error) {
        reject(false);
      }
    });
  };

export default HelperIncomeService;
