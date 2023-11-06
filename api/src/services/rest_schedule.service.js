import bcrypt from "bcrypt";
import db from "../models/index";
const { Op } = require("sequelize");

const RestScheduleModel = db.rest_schedule;
const RestScheduleService = {};

RestScheduleService.getAll = (helper_id) => {
  return new Promise(async (resolve, reject) => {
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    try {
      const rest_schedule = await RestScheduleModel
        .findAll({ where: { 
          helper_id: helper_id, 
          date: {
            [Op.gte]: currentDate,
          } 
        }});
      if (!rest_schedule) {
        resolve([]);
        return;
      }
      resolve(rest_schedule);
    } catch (error) {
      reject(error);
    }
  })
}

RestScheduleService.updateOrInsert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const day_schedule = await RestScheduleModel.findOne({where:{helper_id: values.helper_id, date: values.date}});
      if (day_schedule) {
        const row_affect = await day_schedule.update(values);
        resolve(row_affect);
        return;
      }
      const row_affect = await RestScheduleModel.create(values);
      resolve(row_affect);
    } catch (error) {
      reject(error);
    }
  })
}

RestScheduleService.remove = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await RestScheduleModel
        .destroy({where:{helper_id: values.helper_id, date: values.date }});
      
      if (!result) {
        resolve(false);
        return;
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}


export default RestScheduleService;
